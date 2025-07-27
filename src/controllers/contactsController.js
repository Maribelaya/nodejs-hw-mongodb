import createError from 'http-errors';
import {
  getAllContacts,
  getContactById,
  createContact,
  patchContact,
  deleteContact,
} from '../services/contacts.js';

export async function getContacts(req, res) {
  const contacts = await getAllContacts();
  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contacts,
  });
}

export async function getContactByIdController(req, res) {
  const { contactId } = req.params;
  const contact = await getContactById(contactId);

  if (!contact) {
    //throw createError(404, 'Contact not found');
    res.status(404).send('Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: contact,
  });
}

export async function createContactController(req, res) {
  const { name, phoneNumber, email, isFavourite, contactType } = req.body;

  if (!name || !phoneNumber || !contactType) {
    throw createError(
      400,
      'Missing required fields: name, phoneNumber, and contactType',
    );
  }

  const newContact = await createContact({
    name: name,
    phoneNumber: phoneNumber,
    email: email,
    isFavourite: isFavourite,
    contactType: contactType,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: newContact,
  });
}

export async function patchContactController(req, res) {
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
}

export async function deleteContactController(req, res) {
  const { contactId } = req.params;
  const deleted = await deleteContact(contactId);

  if (!deleted) {
    throw createError(404, 'Contact not found');
  }

  res.status(204).send();
}
