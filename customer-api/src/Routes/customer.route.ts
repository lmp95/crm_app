import express from 'express';
import { customerController } from '../controllers';

const router = express.Router();

router
  .route('/')
  .get(customerController.getCustomerList)
  .post(customerController.createCustomer);

module.exports = router;
