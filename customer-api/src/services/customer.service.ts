import { ObjectId } from 'mongoose';
import { CustomerInterface } from '../interfaces/customer.interface';
import { Customer } from '../models';

/**
 * Get customer list
 * @returns {Promise<CustomerInterface[]>}
 */
const getCustomers = async (): Promise<CustomerInterface[]> => {
  return await Customer.find();
};

/**
 * Create station
 * @param {CustomerInterface} data
 * @returns {Promise<CustomerInterface>}
 */
const createCustomer = async (
  data: CustomerInterface
): Promise<CustomerInterface> => {
  console.log(data);
  data = { ...data, createdDate: new Date(), updatedDate: new Date() };
  return Customer.create(data);
};

/**
 * Get station by id
 * @param {ObjectId} stationId
 * @returns {Promise<StationInterface>}
 */
const getCustomerById = async (customerId: string) => {
  return await Customer.findById(customerId);
};

// /**
//  * Update station by Id
//  * @param {StationInterface} data
//  * @returns {Promise<StationInterface>}
//  */
// const updateStation = async (
//   stationId: string,
//   data: StationInterface
// ): Promise<StationInterface> => {
//   const station = await getStationById(stationId);
//   if (station) {
//     const updatedStation = await Station.findOneAndUpdate(
//       { _id: station.id },
//       data
//     );
//     return updatedStation;
//   }
// };

/**
 * Delete station by id
 * @param {ObjectId} stationId
 * @returns {Promise<User>}
 */
const deleteCustomerById = async (customerId: string) => {
  const customer = await getCustomerById(customerId);
  if (!customer) {
    console.log('delete fail');
  }
  await customer.remove();
  return customer;
};

export const CustomerService = {
  getCustomers,
  createCustomer,
  deleteCustomerById,
  getCustomerById,
};
