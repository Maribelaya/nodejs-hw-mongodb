import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import contactsRouter from './routes/contacts.js';
import { initMongoConnection } from './db/initMongoConnection.js';

export const setupServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware
  app.use(cors());
  app.use(pino());
  app.use(express.json());

  // Routes
  app.use('/contacts', contactsRouter);

  // 404 handler
  app.use(/(.'*')/, (req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  // Error handler
  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

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
