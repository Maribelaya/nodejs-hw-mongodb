import Contact from '../models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

// Функція отримання всіх контактів з пагінацією і сортуванням
export const getAllContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = 'name',
  sortOrder = SORT_ORDER.ASC,
}) => {
  const skip = (page - 1) * perPage;

  // Загальна кількість контактів
  const totalItems = await Contact.countDocuments();

  // Запит контактів з пагінацією і сортуванням
  const data = await Contact.find()
    .collation({ locale: 'en', strength: 1 })
    .skip(skip)
    .limit(perPage)
    .sort({ [sortBy]: sortOrder })
    .exec();

  // Розрахунок пагінації
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

// Оновилення контакту
export const patchContact = (contactId, updateData) =>
  Contact.findByIdAndUpdate(contactId, updateData, { new: true });

// Видалиння контакту
export const deleteContact = (contactId) =>
  Contact.findByIdAndDelete(contactId);
