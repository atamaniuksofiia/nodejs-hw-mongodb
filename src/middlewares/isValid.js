import { isValidObjectId } from 'mongoose';
import createHttpError from 'http-errors';

export const isValidId = (req, res, next) => {
  console.log('📌 Middleware isValidId triggered!');
  console.log('🔍 Received contactId:', req.params.contactId);
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    console.log('❌ Invalid contactId detected!');
    throw createHttpError(400, 'Bad Request');
  }

  next();
};
