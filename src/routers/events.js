
import { Router } from 'express';

const router = Router();

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';

import { createEventSchema, updateEventSchema } from '../validation/events.js';
import { getEventsController, getEventByIdController, createEventController, patchEventController, deleteEventController } from '../controllers/events.js';


router.get('/', ctrlWrapper(getEventsController),
);

router.get('/:eventId', isValidId, ctrlWrapper(getEventByIdController),
);

router.post('/', validateBody(createEventSchema), ctrlWrapper(createEventController));


router.patch('/:eventId', validateBody(updateEventSchema), isValidId, ctrlWrapper(patchEventController));

router.delete('/:eventId', isValidId, ctrlWrapper(deleteEventController));


export default router;
