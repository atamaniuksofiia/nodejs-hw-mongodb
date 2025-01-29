import { getAllContacts, getContactById } from '../services/contacts.js';

// Контролер для роута GET /contacts
export const getContacts = async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Контролер для роута GET /contacts/:contactId
export const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactById(contactId);
    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  } catch (error) {
    res.status(404).json({
      message: `Contact not found - ${error}`,
    });
  }
};
