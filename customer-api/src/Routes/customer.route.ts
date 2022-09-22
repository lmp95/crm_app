import express from 'express';
import { customerController } from '../controllers';

const router = express.Router();

router
  .route('/')
  .get(customerController.getCustomerList)
  .post(customerController.createCustomer);

router
  .route("/:customerId")
  .delete(customerController.deleteCustomer);

module.exports = router;
