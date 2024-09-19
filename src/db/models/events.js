import { model, Schema } from 'mongoose';

const eventsSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const EventsCollection = model('events', eventsSchema);
