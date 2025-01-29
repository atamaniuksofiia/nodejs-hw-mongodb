import mongoose from 'mongoose';
import { getEnv } from '../utils/getEnv.js';
import { ENV_VARS } from '../constants/env.js';

export const initMongoDBConnection = async () => {
  try {
    console.log('🔍 Checking MongoDB environment variables...');
    const user = getEnv(ENV_VARS.MONGODB_USER);
    const password = getEnv(ENV_VARS.MONGODB_PASSWORD);
    const domain = getEnv(ENV_VARS.MONGODB_DOMAIN);
    const db = getEnv(ENV_VARS.MONGODB_DATABASE);

    const connectionURI = `mongodb+srv://${user}:${password}@${domain}/${db}?retryWrites=true&w=majority&appName=chat-app-cluster`;

    await mongoose.connect(connectionURI);

    console.log('Connection to MongoDB successfully established!');
  } catch (err) {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  }
};
