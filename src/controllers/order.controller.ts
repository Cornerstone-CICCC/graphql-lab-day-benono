import { Order } from "../models/order.model";
import { IOrder } from "../types/order";
import { Customer } from "../models/customer.model";
import { Product } from "../models/product.model";
import { populate } from "dotenv";

// getOrders
const getOrders = async () => {
  return await Order.find().populate("customerId").populate("productId");
};

// createOrder
const createOrder = async (data: Omit<IOrder, "id">) => {
  //return await Order.create(data);
  const { customerId, productId } = data;
  const customer = await Customer.findById(customerId);
  const product = await Product.findById(productId);
  if (!customer || !product) {
    throw new Error("Customer or product not found");
  }
  const order = await Order.create(data);
  return (await order.populate("customerId")).populate("productId");
};

// updateOrder
const updateOrder = async (id: string, data: Partial<IOrder>) => {
  return await Order.findByIdAndUpdate(id, data, { new: true })
    .populate("customerId")
    .populate("productId");
};

// deleteOrder
const deleteOrder = async (id: string) => {
  return await Order.findByIdAndDelete(id);
};

export default {
  getOrders,
  createOrder,
  updateOrder,
  deleteOrder,
};
