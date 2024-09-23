
import { EventsCollection } from '../db/models/events.js';

import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';


export const getAllEvents = async ({
    page = 1,
    perPage = 10,
    sortOrder = SORT_ORDER.ASC,
    sortBy = '_id',
}) => {

    const limit = perPage;
    const skip = (page - 1) * perPage;

    const eventsQuery = EventsCollection.find();

    const [eventsCount, events] = await Promise.all([
        EventsCollection
            .countDocuments(eventsQuery.getFilter())
            .merge(eventsQuery),


        eventsQuery
            .skip(skip)
            .limit(limit)
            .sort({ [sortBy]: sortOrder })
            .exec(),
    ]);

    const paginationData = calculatePaginationData(eventsCount, perPage, page);

    return {
        data: events,
        ...paginationData,
    };
};

export const getEventById = async (eventId) => {
    const event = await EventsCollection.findOne({ _id: eventId });
    return event;
};

export const createEvent = async (payload) => {
    const event = await EventsCollection.create(payload);
    return event;
};

export const patchEvent = async (eventId, payload, options = {}) => {
    const rawResult = await EventsCollection.findOneAndUpdate(
        { _id: eventId },
        payload,
        {
            new: true,
            includeResultMetadata: true,
            ...options,
        });

    if (!rawResult || !rawResult.value) return null;

    return {
        event: rawResult.value,
        isNew: Boolean(rawResult?.lastErrorObject?.upserted),
    };
};

export const deleteEvent = async (eventId) => {
    const event = await EventsCollection.findOneAndDelete({ _id: eventId });
    return event;
};
