// // src/routes/contacts.js
// import express from 'express';
// import { Contact } from '../models/contact.js';
// import { getContactByIdController } from '../controllers/contactsController.js';
// const router = express.Router();

// router.get('/', async (req, res) => {
//   const contacts = await Contact.find();
//   res.json(contacts);
// });

// router.post('/', async (req, res) => {
//   const newContact = await Contact.create(req.body);
//   res.status(201).json(newContact);
// });

// // Твій існуючий GET /contacts
// router.get('/' /* твій контролер або логіка */);

// // Новий маршрут GET /contacts/:contactId
// router.get('/:contactId', getContactByIdController);

// export default router;

import express from 'express';
import {
  getContacts,
  getContactByIdController,
} from '../controllers/contactsController.js';

const router = express.Router();

router.get('/', getContacts);
router.get('/:contactId', getContactByIdController);

console.log('📦 contacts route loaded');

export default router;
