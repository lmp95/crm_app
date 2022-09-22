import express from 'express';
import routes from './Routes';
import mongoose from 'mongoose';
import cors from 'cors';
require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const app = express();
const port = 3600;

const mongoDB = `mongodb://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}?authSource=admin`;
mongoose
  .connect(mongoDB)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Failed to connect MongoDB', error);
  });

app.use(express.json());

app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use('/v1', routes);

app.listen(port, () => {
  console.log(`Application is running on port ${port}.`);
});
