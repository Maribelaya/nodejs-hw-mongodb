import { model, Schema } from 'mongoose';

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
      default: 'personal',
      enum: ['work', 'home', 'personal'],
    },
  },
  { versionKey: false, timestamps: true },
);

export default model('Contact', contactsSchema);
