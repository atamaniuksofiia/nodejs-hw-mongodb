import Contact from '../models/contact.js';

// export const getAllContacts = async () => {
//   try {
//     const contacts = await Contact.find();
//     if (contacts.length === 0) {
//       console.log('No contacts found in the database.');
//     } else {
//       console.log('Contacts retrieved from DB:', contacts);
//     }
//     return contacts;
//   } catch (error) {
//     console.error('Error fetching contacts from DB:', error.message);
//     throw new Error('Error fetching contacts: ' + error.message);
//   }
// };

export const getAllContacts = async () => {
  try {
    const contacts = await Contact.find(); // Використовуємо Mongoose для пошуку контактів
    if (contacts.length === 0) {
      console.log('No contacts found in the database.'); // Лог, якщо немає контактів
    } else {
      console.log('Contacts retrieved from DB:', contacts); // Лог для перевірки отриманих контактів
    }

    // Якщо потрібно перетворюємо _id в рядок для кращої сумісності
    const contactsFormatted = contacts.map((contact) => ({
      ...contact.toObject(),
      _id: contact._id.toString(), // Перетворюємо _id на рядок
    }));

    return contactsFormatted;
  } catch (error) {
    console.error('Error fetching contacts from DB:', error.message); // Лог помилки
    throw new Error('Error fetching contacts: ' + error.message); // Кидаємо нову помилку з повідомленням
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
