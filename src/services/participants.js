

import { ParticipantCollection } from '../db/models/participants.js';


export const getAllParticipants = async (eventId) => {
    const participants = await ParticipantCollection.find({ eventId });
    return participants;
};

export const getParticipantById = async (participantId) => {
    const participant = await ParticipantCollection.findOne({ _id: participantId });
    return participant;
};

export const createParticipants = async (payload) => {

    const { name, email, dateOfBirth, source, eventId } = payload;

    if (!eventId) {
        throw new Error('Event ID is required to add a participant');
    }

    const participants = await ParticipantCollection.create(name, email, dateOfBirth, source, eventId);
    return participants;
};

export const patchParticipants = async (participantId, payload, options = {}) => {
    const rawResult = await ParticipantCollection.findOneAndUpdate(
        { _id: participantId },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        });

    if (!rawResult || !rawResult.value) return null;

    return {
        participant: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};

export const deleteParticipants = async (participantId) => {
    const participant = await ParticipantCollection.findOneAndDelete({ _id: participantId });
    return participant;
};
