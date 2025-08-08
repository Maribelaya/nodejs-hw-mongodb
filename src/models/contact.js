import { Schema, model } from 'mongoose';

const contactsSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    phoneNumber: {
      type: String,
      required: [true, 'Set phone number for contact'],
    },
    email: {
      type: String,
      required: [true, 'Set email for contact'],
    },
    isFavourite: {
      type: Boolean,
      default: false,
    },
    contactType: {
      type: String,
      enum: ['work', 'home', 'personal'],
      default: 'personal',
    },
    userId: {
      type: String,
    },
  },
  { versionKey: false, timestamps: true },
);

// Створюємо і експортуємо модель
export const Contact = model('Contact', contactsSchema);
