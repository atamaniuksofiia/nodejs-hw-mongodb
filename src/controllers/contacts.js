import createError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  updateContactById,
  createContact,
  deleteContactById,
} from '../services/contacts.js';

export const getContacts = async (req, res, next) => {
  try {
    const contacts = await getAllContacts();
    res.json(contacts);
  } catch (error) {
    next(createError(500, error.message));
  }
};

export const getContactByIdController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      return next(createError(404, 'Contact not found'));
    }

    res.json(contact);
  } catch (error) {
    next(createError(500, error.message));
  }
};
export const createContactController = async (req, res, next) => {
  try {
    const { name, phoneNumber, contactType, email, isFavourite } = req.body;

    if (!name || !phoneNumber || !contactType) {
      return next(
        createError(
          400,
          'Missing required fields: name, phoneNumber, contactType',
        ),
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
  } catch (error) {
    next(createError(500, error.message));
  }
};
export const updateContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;
    const updateData = req.body;

    const updatedContact = await updateContactById(contactId, updateData);

    if (!updatedContact) {
      return next(createError(404, 'Contact not found'));
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(createError(500, error.message));
  }
};
export const deleteContactController = async (req, res, next) => {
  try {
    const { contactId } = req.params;

    const deletedContact = await deleteContactById(contactId);

    if (!deletedContact) {
      return next(createError(404, 'Contact not found'));
    }

    res.status(204).send();
  } catch (error) {
    next(createError(500, error.message));
  }
};
