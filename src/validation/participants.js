
import Joi from 'joi';

export const registerParticipantSchema = Joi.object({
    name: Joi.string().min(3).max(25).required(),
    email: Joi.string().email().required(),
    dateOfBirth: Joi.string().min(10).max(10).required(),
    // eventId: Joi.string().required(),
});

export const updateParticipantSchema = Joi.object({
    name: Joi.string().min(3).max(25),
    email: Joi.string().email(),
    dateOfBirth: Joi.string().min(10).max(10),
});
