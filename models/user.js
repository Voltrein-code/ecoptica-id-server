const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const isEmail = require('validator/lib/isEmail');
const UnauthorizesError = require('../errors/unauthorized-error');

const userShema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlenght: 100,
    required: true,
  },
  surname: {
    type: String,
    required: true,
    minlength: 2,
    maxlenght: 100,
  },
  patronymic: {
    type: String,
    required: true,
    minlength: 2,
    maxlenght: 100,
  },
  organization: {
    type: String,
    required: true,
    minlength: 2,
    maxlenght: 150,
  },
  position: {
    type: String,
    required: true,
    minlength: 2,
    maxlenght: 150,
  },
  department: {
    type: String,
    required: true,
    minlength: 2,
    maxlenght: 150,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => isEmail(v),
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

function findUserByCredentials(email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizesError('Неправильная почта или пароль');
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizesError('Неправильная почта или пароль');
          }
          return user;
        });
    });
}

userShema.statics.findUserByCredentials = findUserByCredentials;

module.exports = mongoose.model('user', userShema);
