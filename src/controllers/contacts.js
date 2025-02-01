import createError from 'http-errors';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getAllContacts,
  getContactById,
  updateContactById,
  createContact,
  deleteContactById,
} from '../services/contacts.js';

export const getContacts = ctrlWrapper(async (req, res) => {
  const contacts = await getAllContacts();
  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
});

export const getContactByIdController = ctrlWrapper(async (req, res) => {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);
  if (!contact) {
    throw createError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
});

export const createContactController = ctrlWrapper(async (req, res, next) => {
  const { name, phoneNumber, contactType, email, isFavourite } = req.body;
  if (!name || !phoneNumber || !contactType) {
    throw createError(
      400,
      'Missing required fields: name, phoneNumber, contactType',
    );
  }
  const newContact = await createContact({
    name,
    phoneNumber,
    contactType,
    email,
    isFavourite,
  });
  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
});

export const updateContactController = ctrlWrapper(async (req, res) => {
  const { contactId } = req.params;
  const updateData = req.body;
  const updatedContact = await updateContactById(contactId, updateData);
  if (!updatedContact) {
    throw createError(404, 'Contact not found');
  }
  res.status(200).json({
    status: 200,
    message: 'Successfully updated a contact!',
    data: updatedContact,
  });
});

export const deleteContactController = ctrlWrapper(async (req, res) => {
  const { contactId } = req.params;
  const deletedContact = await deleteContactById(contactId);
  if (!deletedContact) {
    throw createError(404, 'Contact not found');
  }
  res.status(204).send();
});
