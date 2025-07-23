import mongoose from 'mongoose';

export const initMongoConnection = async () => {
  const { MONGODB_USER, MONGODB_PASSWORD, MONGODB_URL, MONGODB_DB } =
    process.env;
  // if (!MONGODB_USER || !MONGODB_PASSWORD || !MONGODB_URL || !MONGODB_DB) {
  //   throw new Error('❌ Missing MongoDB credentials in environment variables');
  // }

  const mongoUri = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@${MONGODB_URL}/${MONGODB_DB}?retryWrites=true&w=majority`;

  console.log('🔗 Connecting to MongoDB URI:', mongoUri);
  // console.log('ENV:', {
  //   MONGODB_USER,
  //   MONGODB_PASSWORD,
  //   MONGODB_URL,
  //   MONGODB_DB,
  // });

  try {
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // таймаут 5 сек
    });
    console.log('✅ Mongo connection successfully established!');
  } catch (err) {
    console.error('❌ Mongo connection error:', err.message);
    process.exit(1);
  }
};
