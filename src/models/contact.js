import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
  name: String,
  phoneNumber: String,
  email: String,
  isFavourite: Boolean,
  contactType: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
});
const Contact = mongoose.model('Contact', contactSchema);

export default Contact;
