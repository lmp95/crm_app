import { customerService } from '../services';
import { Request, Response } from 'express';

const getCustomerList = async (req: Request, res: Response) => {
  let page = req.query.page;
  let limit = req.query.limit;
  let search = req.query.search;
  let startDate = req.query.startDate
  let endDate = req.query.endDate
  const result = await customerService.getCustomers(page, limit, search, startDate, endDate);
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

const deleteCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await customerService.deleteCustomerById(req.params.customerId);
    res.send(customer);
  } catch (error) {
    res.status(400).send({ message: 'Fail to delete customer' });
  }
};

export const CustomerController = {
  getCustomerList,
  createCustomer,
  deleteCustomer
};
