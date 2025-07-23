import express from 'express';
import {
  getContacts,
  getContactByIdController,
} from '../controllers/contactsController.js';

const router = express.Router();

router.get('/', getContacts); // GET /contacts
router.get('/:contactId', getContactByIdController); // GET /contacts/123

console.log('📦 contacts route loaded');

export default router;
