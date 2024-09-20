
import { model, Schema } from 'mongoose';

const participantSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        dateOfBirth: {
            type: String,
            required: true,
        },
        source: {
            type: String,
            enum: ['social media', 'friends', 'found myself'],
            default: 'found myself',
        }
    },
    {
        timestamps: true,
        versionKey: false,
    },
);

export const ParticipantCollection = model('participant', participantSchema);
