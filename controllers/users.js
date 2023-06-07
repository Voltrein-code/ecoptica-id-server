const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/user');

const NotFoundError = require('../errors/not-found-error');
const BadRequestError = require('../errors/bad-request-error');
const ConflictError = require('../errors/conflict-error');

require('dotenv').config();

const { NODE_ENV } = process.env;
const { JWT_SECRET } = NODE_ENV === 'production' ? process.env : require('../constants/config');

module.exports.getUsers = (req, res, next) => {
  User.find([])
    .then((users) => {
      res.status(200).send(users);
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  User.findById(req.params.userId)
    .orFail(() => new NotFoundError('Пользователь по указанному id не найден'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Переданн некорректный id для поиска пользователя'));
        return;
      }
      next(err);
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => new NotFoundError('Пользователь по указанному id не найден'))
    .then((user) => {
      res.status(200).send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный id для поиска пользователя'));
        return;
      }
      next(err);
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name,
    surname,
    patronymic,
    organization,
    position,
    department,
    email,
    password,
  } = req.body;

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, surname, patronymic, organization, position, department, email, password: hash,
      })
        .then((user) => {
          res.status(200).send(Object.assign(user, { password: undefined }));
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Переданы некорректные данные для создания пользователя'));
            return;
          }
          if (err.code === 11000) {
            next(new ConflictError('Пользователь с таким email уже зарегестрирован'));
            return;
          }
          next(err);
        });
    });
};

module.exports.updateUser = (req, res, next) => {
  const {
    name,
    surname,
    patronymic,
    organization,
    position,
    department,
    email,
  } = req.body;
  const options = { runValidators: true, new: true };

  User.findByIdAndUpdate(req.user._id, {
    name,
    surname,
    patronymic,
    organization,
    position,
    department,
    email,
  }, options)
    .orFail(() => new NotFoundError('Пользователь с указанный id не найден'))
    .then((updatedUser) => {
      res.status(200).send(updatedUser);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError('Передан некорректный id для обновления данных пользователя'));
        return;
      }
      if (err.name === 'ValidationError') {
        next(new BadRequestError('Переданы некорректные данные для обновления данных пользователя'));
        return;
      }
      next(err);
    });
};

module.exports.changePassword = (req, res, next) => {
  const { password } = req.body;
  const options = { runValidators: true, new: true };

  bcrypt.hash(password, 10)
    .then((hash) => {
      User.findByIdAndUpdate(req.user._id, {
        password: hash,
      }, options)
        .orFail(() => new NotFoundError('Пользователь с указанными id не найден'))
        .then(() => {
          res.status(200).send({
            message: 'Пароль успешно изменен',
          });
        })
        .catch((err) => {
          if (err.name === 'CastError') {
            next(new BadRequestError('Передан некорректный id для обновления пароля пользователя'));
            return;
          }
          if (err.name === 'ValidationError') {
            next(new BadRequestError('Переданы некорректные данные для обновления пароля пользователя'));
            return;
          }
          next(err);
        });
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      res.status(200).send({
        token: jwt.sign({ _id: user._id }, JWT_SECRET, { expiresIn: '7d' }),
      });
    })
    .catch(next);
};
