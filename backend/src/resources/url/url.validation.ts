import Joi from 'joi';

const create = Joi.object({
    originalUrl: Joi.string().required(),
});
const get = Joi.object({});

export default { create, get };
