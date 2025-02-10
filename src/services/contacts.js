import { SORT_ORDER } from '../constants/order.js';
import Contact from '../models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortOrder = SORT_ORDER.ASC,
  sortBy = '_id',
}) => {
  try {
    const limit = perPage;
    const skip = (page - 1) * perPage;

    const contactsQuery = Contact.find();
    const contactsCount = await Contact.find()
      .merge(contactsQuery)
      .countDocuments();
    const contacts = await contactsQuery
      .skip(skip)
      .limit(limit)
      .sort({ [sortBy]: sortOrder })
      .exec();

    const paginationData = calculatePaginationData(
      contactsCount,
      perPage,
      page,
    );

    return {
      data: contacts,
      ...paginationData,
    };
  } catch (error) {
    console.error('Error fetching contacts from DB:', error.message);
    throw new Error('Error fetching contacts: ' + error.message);
  }
};

export const getContactById = async (contactId) => {
  try {
    const contact = await Contact.findById(contactId);
    if (!contact) {
      throw new Error('Contact not found');
    }
    return contact;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const createContact = async (contactData) => {
  try {
    const newContact = new Contact(contactData);
    await newContact.save();
    return newContact;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateContactById = async (contactId, updateData) => {
  try {
    const updatedContact = await Contact.findByIdAndUpdate(
      contactId,
      updateData,
      { new: true, runValidators: true },
    );

    if (!updatedContact) {
      throw new Error('Contact not found');
    }

    return updatedContact;
  } catch (error) {
    throw new Error(error.message);
  }
};
export const deleteContactById = async (contactId) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(contactId);

    if (!deletedContact) {
      throw new Error('Contact not found');
    }

    return deletedContact;
  } catch (error) {
    throw new Error(error.message);
  }
};
