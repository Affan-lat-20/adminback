const Joi = require('@hapi/joi');

//Register Validation


const registerValidation = () =>{
const schema = Joi.object({ name: Joi.string() .min(6) .required(),
    name: Joi.string().min(6).required(),
    email: Joi.string().min(6).required(),
    password: Joi.string().min(6).required()
});

// return  schema.validate(req.body);
return schema.validate(data,schema);
}


module.exports.registerValidation = registerValidation;