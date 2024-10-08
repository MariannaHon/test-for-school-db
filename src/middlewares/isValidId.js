
import { isValidObjectId } from 'mongoose';
import { HttpError } from 'http-errors';

export const isValidId = (req, res, next) => {
    const { eventId } = req.params;
    if (!isValidObjectId(eventId)) {
        throw HttpError(404, 'Not found');
    }

    next();
};
