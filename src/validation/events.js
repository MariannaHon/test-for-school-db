
import Joi from 'joi';

export const createEventSchema = Joi.object({
    title: Joi.string().min(3).max(30).required(),
    description: Joi.string().min(40).max(200).required(),
});

export const updateEventSchema = Joi.object({
    title: Joi.string().min(3).max(30),
    description: Joi.string().min(40).max(200),
});
