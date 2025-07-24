import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import contactsRouter from './routers/contacts.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';

export const setupServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // ✅ Middleware
  app.use(cors());
  app.use(pino());
  app.use(express.json());

  // ✅ Routes
  app.use('/contacts', contactsRouter);

  // ✅ 404 handler
  app.use(notFoundHandler);

  // ✅ Error handler
  app.use(errorHandler);

  // ✅ Запуск сервера
  try {
    await initMongoConnection();
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};
