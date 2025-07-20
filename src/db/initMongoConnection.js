// import mongoose from 'mongoose';

// export const initMongoConnection = async () => {
//   const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } =
//     process.env;

//   const mongoUri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

//   console.log('🔗 Connecting to MongoDB URI:', mongoUri);

//   try {
//     await mongoose.connect(mongoUri, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000, // таймаут 5 сек
//     });
//     console.log('✅ Mongo connection successfully established!');
//   } catch (err) {
//     console.error('❌ Mongo connection error:', err.message);
//     process.exit(1);
//   }
// };

// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

// export async function initMongoConnection() {
//   const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } =
//     process.env;

//   const mongoURI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

//   console.log('🔗 Connecting to MongoDB URI:', mongoURI);

//   try {
//     await mongoose.connect(mongoURI);
//     console.log('✅ Mongo connection successfully established!');
//   } catch (error) {
//     console.error('❌ Mongo connection error:', error.message);
//     process.exit(1);
//   }
// }

import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export async function initMongoDB() {
  const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } =
    process.env;
  const mongoURI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Mongo connection successfully established!');
  } catch (error) {
    console.error('❌ Mongo connection error:', error.message);
    process.exit(1);
  }
}
