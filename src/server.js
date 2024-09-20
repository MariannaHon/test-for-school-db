import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import router from './routers/index.js';
import cookieParser from 'cookie-parser';

import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

import { env } from './utils/env.js';

const PORT = Number(env('PORT', '3024'));


export const setupServer = () => {
    const app = express();

    app.use(express.json({
        type: ['application/json', 'application/vnd.api+json',],
        limit: '100kb',
    }));

    app.use(cors());

    app.use(
        pino({
            transport: {
                target: 'pino-pretty',
            },
        }),
    );

    app.use(cookieParser());

    app.get('/', (req, res) => {
        res.json({
            message: 'Hello world!',
        });
    });

    app.use(router);

    app.use('*', notFoundHandler);

    app.use(errorHandler);

    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};
