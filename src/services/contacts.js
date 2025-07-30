import Contact from '../models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

// Функція отримання всіх контактів з пагінацією, сортуванням і фільтрацією
export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = SORT_ORDER.ASC,
  type,
  isFavourite,
}) => {
  const skip = (page - 1) * perPage;

  const filter = {};
  if (type) filter.contactType = type;
  if (isFavourite !== undefined) filter.isFavourite = isFavourite;

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

// Отримання контакту за ID
export const getContactById = (contactId) => Contact.findById(contactId);

// Створення нового контакту
export const createContact = (contactData) => new Contact(contactData).save();

// Оновлення контакту
export const patchContact = (contactId, updateData) =>
  Contact.findByIdAndUpdate(contactId, updateData, { new: true });

// Видалення контакту
export const deleteContact = (contactId) =>
  Contact.findByIdAndDelete(contactId);
