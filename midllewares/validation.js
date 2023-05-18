const { celebrate, Joi } = require('celebrate');

module.exports.updateUserValidation = celebrate({
  body: Joi.object.keys({
    name: Joi.string().required().min(2).max(100),
    email: Joi.string.required().email(),
  }).unknown(true),
});

module.exports.userIdValidation = celebrate({
  params: Joi.object.keys({
    userId: Joi.string().required().hex().length(24),
  }),
});

module.exports.routesWithAuthValidation = celebrate({
  headers: Joi.object.keys({
    authorization: Joi.string().required(),
  }).unknown(true),
});
