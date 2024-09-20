

import { ParticipantCollection } from '../db/models/participants.js';


export const getAllParticipants = async () => {
    const participants = await ParticipantCollection.find();
    return participants;
};

export const getParticipantById = async (participantId) => {
    const participant = await ParticipantCollection.findOne({ _id: participantId });
    return participant;
};

export const createParticipants = async (payload) => {
    const participants = await ParticipantCollection.create(payload);
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
