import { ObjectId } from 'mongoose';
import { CustomerInterface } from '../interfaces/customer.interface';
import { Customer } from '../models';

/**
 * Get customer list
 * @returns {Promise<CustomerInterface[]>}
 */
const getCustomers = async (
  page: any,
  limit: any,
  search: any,
  startDate: any,
  endDate: any
): Promise<any> => {
  let result;
  if(startDate && startDate.length > 0 && endDate && endDate.length > 0){
    const dateFilter = { $gte: new Date(startDate), $lte: new Date(new Date(endDate)) }
    result = await Customer.aggregate([
      { $match: { createdDate: dateFilter } }
    ]);
    return ({ content: result, total: result.length });
  }
  if (search && search.length > 0) {
    const regex = new RegExp(search);
    result = await Customer.aggregate([
      { $match: { $or: [{ name: regex }, { phone: regex }, { email: regex }] } }
    ]);
    return ({ content: result, total: result.length });
  }
  result = await Customer.find().skip(limit * (page - 1)).limit(limit).sort('-createdDate');
  let total = await Customer.find().count();
  return ({ content: result, total: total });
};

/**
 * Create station
 * @param {CustomerInterface} data
 * @returns {Promise<CustomerInterface>}
 */
const createCustomer = async (
  data: CustomerInterface
): Promise<CustomerInterface> => {
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
