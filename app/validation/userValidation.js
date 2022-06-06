const Joi = require("joi");

exports.AddUser = Joi.object()
    .keys({
        name: Joi.string()
            .min(3)
            .max(40)
            .required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),

    });

exports.LoginUser = Joi.object()
    .keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    });