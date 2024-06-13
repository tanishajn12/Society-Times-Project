const Joi = require('joi');

// joi lets you describe your data using a simple, intuitive, and readable language.
// it is mainly used to validate things on server side

//step 1 : In joi , describe your schema

const eventSchema = Joi.object({
    name: Joi.string().required(),
    img: Joi.string().uri().required(),
    date: Joi.date().required(),
    time: Joi.string().required(),
    society: Joi.string().required(),
    venue: Joi.string().required(),
    type: Joi.string().required(),
    desc: Joi.string().required(),
    registerLink: Joi.string().uri().required()
});

const reviewSchema = Joi.object({
    rating: Joi.number().min(1).max(5).required(),
    comment: Joi.string().required()
});

module.exports = { eventSchema, reviewSchema };
