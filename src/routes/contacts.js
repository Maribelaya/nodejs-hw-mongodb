// src/routes/contacts.js
import express from 'express';
import { Contact } from '../models/contact.js';

const router = express.Router();

router.get('/', async (req, res) => {
  const contacts = await Contact.find();
  res.json(contacts);
});

router.post('/', async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
});

export default router;
