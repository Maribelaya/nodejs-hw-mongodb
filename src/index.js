import 'dotenv/config';
import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';

const bootstrap = async () => {
  await initMongoConnection();
  await setupServer();
};

void bootstrap();
console.log('MONGO_USER:', process.env.MONGODB_USER);
console.log('MONGO_PASSWORD:', process.env.MONGODB_PASSWORD);
console.log('MONGO_URL:', process.env.MONGODB_URL);
console.log('MONGO_DB:', process.env.MONGODB_DB);
