// src/server.js
import express from 'express';
import cors from 'cors';
import pino from 'pino-http';

export const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(cors());
  app.use(pino());

  // Обробка неіснуючих маршрутів
  app.use((req, res) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
