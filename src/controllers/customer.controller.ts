import { ICustomer } from "../types/customer";
import { Customer } from "../models/customer.model";

// getCustomers
const getCustomers = async () => {
  return await Customer.find();
};

// getCustomerById
const getCustomerById = async (id: string) => {
  return await Customer.findById(id);
};

// createCustomer
const createCustomer = async (data: Omit<ICustomer, "id">) => {
  return await Customer.create(data);
};

// updateCustomer
const updateCustomer = async (id: string, data: Partial<ICustomer>) => {
  return await Customer.findByIdAndUpdate(id, data, { new: true });
};

// deleteCustomer
const deleteCustomer = async (id: string) => {
  return await Customer.findByIdAndDelete(id);
};

export default {
  getCustomers,
  getCustomerById,
  createCustomer,
  updateCustomer,
  deleteCustomer,
};
