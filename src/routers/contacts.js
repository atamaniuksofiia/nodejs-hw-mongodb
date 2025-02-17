import express from 'express';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getContacts,
  getContactByIdController,
  updateContactController,
  createContactController,
  deleteContactController,
} from '../controllers/contacts.js';

const router = express.Router();
console.log('Contacts router is active!');
router.get('/', ctrlWrapper(getContacts));
router.get('/:contactId', ctrlWrapper(getContactByIdController));
router.patch('/:contactId', ctrlWrapper(updateContactController));
router.post('/', ctrlWrapper(createContactController));
router.delete('/:contactId', ctrlWrapper(deleteContactController));
export default router;
