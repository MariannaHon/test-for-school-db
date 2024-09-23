
import { Router } from 'express';

const router = Router();

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidIdPart } from '../middlewares/isValidIdPart.js';

import { registerParticipantSchema, updateParticipantSchema } from '../validation/participants.js';
import { getParticipantsController, getParticipantsByIdController, createParticipantsController, patchParticipantsController, deleteParticipantsController } from '../controllers/participants.js';


router.get('/', ctrlWrapper(getParticipantsController),
);

router.get('/:participantId', isValidIdPart, ctrlWrapper(getParticipantsByIdController),
);

router.post('/:eventId', validateBody(registerParticipantSchema), ctrlWrapper(createParticipantsController));


router.patch('/:participantId', validateBody(updateParticipantSchema), isValidIdPart, ctrlWrapper(patchParticipantsController));

router.delete('/:participantId', isValidIdPart, ctrlWrapper(deleteParticipantsController));


export default router;
