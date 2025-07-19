// const { Schema, model } = require('mongoose');

// const contactSchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: [true, 'Name is required'],
//     },
//     phoneNumber: {
//       type: String,
//       required: [true, 'Phone number is required'],
//     },
//     email: {
//       type: String,
//     },
//     isFavourite: {
//       type: Boolean,
//       default: false,
//     },
//     contactType: {
//       type: String,
//       enum: ['work', 'home', 'personal'],
//       default: 'personal',
//       required: true,
//     },
//   },
//   { timestamps: true },
// );

// const Contact = model('Contact', contactSchema);

// module.exports = Contact;

// import mongoose from 'mongoose';

// const contactSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: true,
//   },
//   email: String,
//   phone: String,
// });

// export const Contact = mongoose.model('Contact', contactSchema);

import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  { versionKey: false, timestamps: true },
);

export const Contact = mongoose.model('Contact', contactSchema);
