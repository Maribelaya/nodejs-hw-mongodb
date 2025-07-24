import createError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  patchContact,
  deleteContact,
} from '../services/contacts.js';

// GET /contacts
export async function getContacts(req, res, next) {
  try {
    const contacts = await getAllContacts();
    res.json({ status: 200, data: contacts });
  } catch (error) {
    next(error);
  }
}

// GET /contacts/:contactId
export async function getContactByIdController(req, res, next) {
  try {
    const { contactId } = req.params;
    const contact = await getContactById(contactId);

    if (!contact) {
      throw createError(404, 'Contact not found');
    }

    res.json({ status: 200, data: contact });
  } catch (error) {
    next(error);
  }
}

// POST /contacts
export async function createContactController(req, res, next) {
  try {
    const { name, phoneNumber, email, isFavourite, contactType } = req.body;

    if (!name || !phoneNumber || !contactType) {
      throw createError(
        400,
        'Missing required fields: name, phoneNumber, and contactType',
      );
    }

    const newContact = await createContact({
      name,
      phoneNumber,
      email,
      isFavourite,
      contactType,
    });

    res.status(201).json({
      status: 201,
      message: 'Successfully created a contact!',
      data: newContact,
    });
  } catch (error) {
    next(error);
  }
}

// PATCH /contacts/:contactId
export async function patchContactController(req, res, next) {
  try {
    const { contactId } = req.params;
    const updateData = req.body;

    const updatedContact = await patchContact(contactId, updateData);

    if (!updatedContact) {
      throw createError(404, 'Contact not found');
    }

    res.status(200).json({
      status: 200,
      message: 'Successfully patched a contact!',
      data: updatedContact,
    });
  } catch (error) {
    next(error);
  }
}

// DELETE /contacts/:contactId
export async function deleteContactController(req, res, next) {
  try {
    const { contactId } = req.params;
    const deleted = await deleteContact(contactId);

    if (!deleted) {
      throw createError(404, 'Contact not found');
    }

    res.status(204).send(); // No Content
  } catch (error) {
    next(error);
  }
}
