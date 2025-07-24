import Contact from '../models/contact.js';

export async function getAllContacts() {
  return await Contact.find();
}

export async function getContactById(contactId) {
  return await Contact.findById(contactId);
}

export async function createContact(contactData) {
  const contact = new Contact(contactData);
  return await contact.save();
}

export async function patchContact(contactId, updateData) {
  return await Contact.findByIdAndUpdate(contactId, updateData, { new: true });
}

export async function deleteContact(contactId) {
  return await Contact.findByIdAndDelete(contactId);
}
