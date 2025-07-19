import express from 'express';
import dotenv from 'dotenv';
import { initMongoConnection } from './db/initMongoConnection.js';
// const contactsRouter = require('./routes/contacts');
import contactsRouter from './routes/contacts.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/contacts', contactsRouter);

app.get('/api/contacts', (req, res) => {
  res.json({ message: 'Contacts route is working!' });
});

const startServer = async () => {
  await initMongoConnection();

  app.listen(PORT, () => {
    console.log(`🚀 Server is running on port ${PORT}`);
  });
};

startServer();
