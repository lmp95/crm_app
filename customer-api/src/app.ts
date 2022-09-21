import express from 'express';
import routes from './Routes';
import mongoose from 'mongoose';
import cors from 'cors';
import swaggerUI from 'swagger-ui-express';
require('dotenv').config();
const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME } = process.env;

const app = express();
const port = 3600;

const mongoDB = `mongodb+srv://atlasLMP95:AtlasLMP1995@cluster0.zatanqj.mongodb.net/crm_app?retryWrites=true&w=majority`;
// const mongoDB = `mongodb://localhost:27017/crm_app`;
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
app.use('/document', swaggerUI.serve, swaggerUI.setup(document));

app.listen(port, () => {
  console.log(`Application is running on port ${port}.`);
});
