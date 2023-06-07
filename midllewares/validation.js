const { celebrate, Joi } = require('celebrate');

module.exports.updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(100),
    email: Joi.string().required().email(),
  }).unknown(true),
});

module.exports.userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

module.exports.routesWithAuthValidation = celebrate({
  headers: Joi.object().keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});

module.exports.signUpValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(100).required(),
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  }),
});

module.exports.signInValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().min(8).required(),
  }),
});

module.exports.changePasswordValidation = celebrate({
  body: Joi.object().keys({
    password: Joi.string().min(8).required(true),
  }),
});
