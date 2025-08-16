import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import swaggerUI from 'swagger-ui-express';
import fs from 'fs';
import yaml from 'js-yaml';
import path from 'path';

import contactsRouter from './routers/contacts.js';
import authRouter from './routers/auth.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { errorHandler } from './middlewares/errorHandler.js';
import { notFoundHandler } from './middlewares/notFoundHandler.js';
import { swaggerDocs } from './middlewares/swaggerDocs.js';

export const setupServer = async () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  // Middleware
  app.use(cors());
  app.use(pino());
  app.use(express.json());
  app.use(cookieParser());

  // Swagger UI
  const swaggerFilePath = path.join(process.cwd(), 'docs', 'openapi.yaml');
  const swaggerDocument = yaml.load(fs.readFileSync(swaggerFilePath, 'utf8'));
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));
  app.use('/api-docs', swaggerDocs());

  // Routes
  app.use('/contacts', contactsRouter);
  app.use('/auth', authRouter);

  app.get('/', (req, res) => {
    res.send('API is running. Use /contacts or /auth');
  });

  // 404 handler
  app.use(notFoundHandler);

  // Error handler
  app.use(errorHandler);

  try {
    await initMongoConnection();
    app.listen(PORT, () => {
      console.log(`✅ Server is running on port ${PORT}`);
      console.log(
        `📄 Swagger docs available at http://localhost:${PORT}/api-docs`,
      );
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error.message);
    process.exit(1);
  }
};
