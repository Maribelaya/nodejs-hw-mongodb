import { Contact } from '../models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = SORT_ORDER.ASC,
  type,
  isFavourite,
  userId,
}) => {
  const skip = (page - 1) * perPage;

  const filter = { userId };

  if (type) filter.contactType = type;
  if (isFavourite !== undefined) filter.isFavourite = isFavourite === 'true';

  const totalItems = await Contact.countDocuments(filter);

  const data = await Contact.find(filter)
    .collation({ locale: 'en', strength: 1 })
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const pagination = calculatePaginationData(totalItems, perPage, page);

  return {
    data,
    ...pagination,
  };
};

export const getContactById = async (contactId, userId) => {
  const contact = await Contact.findOne({ _id: contactId, userId });
  return contact;
};

export const createContact = (contactData) => new Contact(contactData).save();

export const patchContact = async (contactId, updateData, userId) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, userId: userId },
    updateData,
    { new: true },
  );

  if (!updatedContact) return null;

  return updatedContact;
};

export const deleteContact = async (contactId, userId) => {
  const contact = await Contact.findOneAndDelete({
    _id: contactId,
    userId,
  });
  return contact;
};
