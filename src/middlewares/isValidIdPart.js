
import { isValidObjectId } from 'mongoose';
import { HttpError } from 'http-errors';

export const isValidIdPart = (req, res, next) => {
    const { participantId } = req.params;
    if (!isValidObjectId(participantId)) {
        throw HttpError(404, 'Not found');
    }

    next();
};
