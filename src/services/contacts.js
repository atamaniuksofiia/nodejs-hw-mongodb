import Contact from '../models/contact.js';

export const getAllContacts = async () => {
  const contacts = await Contact.find().limit(100);

  return contacts;
};

export const getContactById = async (contactId) => {
  const contact = await Contact.findById(contactId);

  return contact;
};
export const createContact = async (contactData) => {
  const newContact = await Contact.create(contactData);

  return newContact;
};

export const updateContactById = async (contactId, updateData) => {
  const updatedContact = await Contact.findByIdAndUpdate(
    contactId,
    updateData,
    { new: true, runValidators: true },
  );

  return updatedContact;
};
export const deleteContactById = async (contactId) => {
  const deletedContact = await Contact.findByIdAndDelete(contactId);

  return deletedContact;
};
