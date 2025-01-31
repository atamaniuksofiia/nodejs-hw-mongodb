import Contact from '../models/contact.js';

export const getAllContacts = async () => {
  try {
    const contacts = await Contact.find();
    if (contacts.length === 0) {
      console.log('No contacts found in the database.');
    } else {
      console.log('Contacts retrieved from DB:', contacts);
    }

    const contactsFormatted = contacts.map((contact) => ({
      ...contact.toObject(),
      _id: contact._id.toString(),
    }));

    return contactsFormatted;
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
