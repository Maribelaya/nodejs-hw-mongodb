import express from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { validateBody } from '../middlewares/validateBody.js';
import { isValidId } from '../middlewares/isValidId.js';
import {
  createContactSchema,
  updateContactSchema,
} from '../validation/contacts.js';

import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import {
  getContacts,
  getContactByIdController,
  createContactController,
  patchContactController,
  deleteContactController,
} from '../controllers/contactsController.js';

const router = express.Router();
router.use(authenticate);

// Отримати всі контакти з пагінацією та сортуванням
router.get('/', ctrlWrapper(getContacts));

// Отримати контакт за ID
router.get('/:contactId', isValidId, ctrlWrapper(getContactByIdController));

// Створити новий контакт (валідація body)
router.post(
  '/',
  validateBody(createContactSchema),
  ctrlWrapper(createContactController),
);

// Оновити контакт (валідація id + body)
router.patch(
  '/:contactId',
  isValidId,
  validateBody(updateContactSchema),
  ctrlWrapper(patchContactController),
);

// Видалити контакт (валідація id)
router.delete('/:contactId', isValidId, ctrlWrapper(deleteContactController));

export default router;
