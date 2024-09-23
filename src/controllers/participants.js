

import { getAllParticipants, getParticipantById, createParticipants, patchParticipants, deleteParticipants } from "../services/participants.js";

import createHttpError from 'http-errors';

export const getParticipantsController = async (req, res) => {

    const { eventId } = req.params;

    const participants = await getAllParticipants(eventId);
    res.json({
        status: 200,
        message: "Successfully found participants!",
        data: participants,
    });
};

export const getParticipantsByIdController = async (req, res, next) => {
    const { participantId } = req.params;
    const participant = await getParticipantById(participantId);

    if (!participant) {
        next(createHttpError(404, 'participant not found'));
        return;
    }

    res.json({
        status: 200,
        message: `Successfully found participant with id ${participantId}!`,
        data: participant,
    });
};

export const createParticipantsController = async (req, res) => {

    const { eventId } = req.params;

    const data = { ...req.body, eventId };
    const participant = await createParticipants(data);

    res.status(201).json({
        status: 201,
        message: "Successfully created a participant!",
        data: participant,
    });
};

export const patchParticipantsController = async (req, res, next) => {
    const { participantId } = req.params;
    const result = await patchParticipants(participantId, req.body);

    if (!result) {
        next(createHttpError(404, 'Participant not found'));
        return;
    }

    res.json({
        status: 200,
        message: "Successfully patched a participant!",
        data: result.participant,
    });
};

export const deleteParticipantsController = async (req, res, next) => {
    const { participantId } = req.params;
    const delParticipant = await deleteParticipants(participantId);

    if (!delParticipant) {
        next(createHttpError(404, 'Participant not found'));
        return;
    }

    res.status(204).send();
};
