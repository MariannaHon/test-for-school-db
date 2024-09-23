
import { getAllEvents, getEventById, createEvent, patchEvent, deleteEvent } from "../services/events.js";

import { parsePaginationParams } from "../utils/parsePaginationParams.js";
import { parseSortParams } from "../utils/parseSortParams.js";

import createHttpError from 'http-errors';

export const getEventsController = async (req, res) => {

    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);

    const events = await getAllEvents({
        page,
        perPage,
        sortBy,
        sortOrder,
    });
    res.json({
        status: 200,
        message: "Successfully found events!",
        data: events,
    });
};

export const getEventByIdController = async (req, res, next) => {
    const { eventId } = req.params;
    const event = await getEventById(eventId);

    if (!event) {
        next(createHttpError(404, 'Event not found'));
        return;
    }

    res.json({
        status: 200,
        message: `Successfully found event with id ${eventId}!`,
        data: event,
    });
};

export const createEventController = async (req, res) => {
    const event = await createEvent(req.body);

    res.status(201).json({
        status: 201,
        message: "Successfully created a event!",
        data: event,
    });
};

export const patchEventController = async (req, res, next) => {
    const { eventId } = req.params;
    const result = await patchEvent(eventId, req.body);

    if (!result) {
        next(createHttpError(404, 'Event not found'));
        return;
    }

    res.json({
        status: 200,
        message: "Successfully patched a event!",
        data: result.event,
    });
};

export const deleteEventController = async (req, res, next) => {
    const { eventId } = req.params;
    const delEvent = await deleteEvent(eventId);

    if (!delEvent) {
        next(createHttpError(404, 'Event not found'));
        return;
    }

    res.status(204).send();
};
