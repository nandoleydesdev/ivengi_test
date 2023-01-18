import Joi from 'joi';

const editions = Joi.object().keys({
    version: Joi.number().required(),
    publicationDate: Joi.date().required
});

const book = Joi.object({
    title: Joi.string()
        .min(2)
        .max(30)
        .required(),

    summary: Joi.string().required(),
    ISBN: Joi.string().required(),
    // editions: Joi.array().items(editions),
    author: Joi.string().required()
});

export default { book };