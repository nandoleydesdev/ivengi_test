import Joi from 'joi';

const create = Joi.object({
    firstName: Joi.string()
        .min(2)
        .max(30)
        .required(),

    lastName: Joi.string()
        .min(2)
        .max(30)
        .required(),

    dateOfBirth: Joi.date().required(),
    dateOfDeath: Joi.date().optional()
});

export default { create };
