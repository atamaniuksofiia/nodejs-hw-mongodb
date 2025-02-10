import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getContacts,
  getContactByIdController,
  updateContactController,
  createContactController,
  deleteContactController,
} from '../controllers/contacts.js';
import { validateBody } from '../middlewares/validateBody.js';
import { createContactsSchema } from '../validation/contacts.js';
import { isValidId } from '../middlewares/isValid.js';

const router = express.Router();

router.get('/', ctrlWrapper(getContacts));
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));
router.patch('/:contactId', isValidId, ctrlWrapper(updateContactController));
router.post(
  '/',
  validateBody(createContactsSchema),
  ctrlWrapper(createContactController),
);
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));
export default router;
