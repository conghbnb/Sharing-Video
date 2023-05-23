import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

mongoose.connect(process.env.MONGO as string);

mongoose.connection.on('connected', () => {
  console.log('Mongo has connected succesfully');
});

mongoose.connection.on('reconnected', () => {
  console.log('Mongo has reconnected');
});

mongoose.connection.on('error', (error) => {
  console.log('Mongo connection has an error', error);
  mongoose.disconnect();
});

mongoose.connection.on('disconnected', () => {
  console.log('Mongo connection is disconnected');
});
