const Joi = require("joi");

exports.AddPost = Joi.object()
    .keys({
        title: Joi.string()
            .min(3)
            .max(40)
            .required(),
        subtitle: Joi.string().min(6).required(),
        description: Joi.string().min(6).required(),        
        token: Joi.string().min(6).required(),        
    });