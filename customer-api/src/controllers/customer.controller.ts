import { customerService } from '../services';
import { Request, Response } from 'express';

const getCustomerList = async (req: Request, res: Response) => {
  const result = await customerService.getCustomers();
  res.send(result);
};

const createCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.createCustomer(req.body);
    res.send(customer);
  } catch (error) {
    res.status(400).send({ message: 'Fail to create customer' });
  }
};

export const CustomerController = {
  getCustomerList,
  createCustomer,
};
