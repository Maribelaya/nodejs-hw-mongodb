// const express = require('express');
// const mongoose = require('mongoose');
// require('dotenv').config();

// // const contactsRouter = require('./routes/contacts');
// import contactsRouter from './routes/contacts.js';

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(express.json());

// // Роут
// app.use('/contacts', contactsRouter);

// // Глобальний обробник помилок
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     status: 500,
//     message: 'Something went wrong',
//     error: err.message,
//   });
// });

// // Підключення до MongoDB
// mongoose
//   .connect(process.env.MONGODB_URI)
//   .then(() => {
//     console.log('Connected to MongoDB');
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch((error) => {
//     console.error('Mongo connection error:', error.message);
//     process.exit(1);
//   });

// index.js
import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import contactsRouter from './routes/contacts.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/contacts', contactsRouter);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    error: err.message,
  });
});

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('Mongo connection error:', error.message);
    process.exit(1);
  });
