// import express from 'express';
// import { Contact } from '../models/contact.js';
// const router = express.Router();

// router.get('/', (req, res) => {
//   res.json({ message: 'Contacts list will be here' });
// });

// console.log('📦 contacts route loaded');

// export default router;

// export async function getContactById(contactId) {
//   return await Contact.findById(contactId);
// }
import { Contact } from '../models/contact.js';

export async function getAllContacts() {
  return await Contact.find();
}

export async function getContactById(contactId) {
  return await Contact.findById(contactId);
}
