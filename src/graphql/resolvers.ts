import productController from "../controllers/product.controller";
import customerController from "../controllers/customer.controller";
import orderController from "../controllers/order.controller";
import { IProduct } from "../types/product";
import { ICustomer } from "../types/customer";
import { IOrder } from "../types/order";
import mongoose from "mongoose";
// Finish the resolvers
export const resolvers = {
  Query: {
    products: async () => await productController.getProducts(),
    customers: async () => await customerController.getCustomers(),
    orders: async () => await orderController.getOrders(),
    getProductById: async (_: unknown, { id }: { id: string }) =>
      await productController.getProductById(id),
    getCustomerById: async (_: unknown, { id }: { id: string }) =>
      await customerController.getCustomerById(id),
  },
  Product: {
    customers: async (parent: { id: string }) => {
      const orders = await orderController.getOrders();
      const filteredOrders = orders.filter((order) =>
        order.productId.equals(new mongoose.Types.ObjectId(parent.id))
      );
      const set = new Set(filteredOrders.map((order) => order.customerId));
      return Array.from(set);
    },
  },
  Customer: {
    products: async (parent: { id: string }) => {
      const orders = await orderController.getOrders();
      const filteredOrders = orders.filter((order) =>
        order.customerId.equals(new mongoose.Types.ObjectId(parent.id))
      );
      const set = new Set(filteredOrders.map((order) => order.productId));
      return Array.from(set);
    },
  },
  Order: {
    product: async (parent: any) => {
      return parent.productId;
    },
    customer: async (parent: any) => {
      return parent.customerId;
    },
  },
  Mutation: {
    addProduct: async (
      _: unknown,
      { productName, productPrice }: Omit<IProduct, "id">
    ) => await productController.createProduct({ productName, productPrice }),
    editProduct: async (
      _: unknown,
      { id, productName, productPrice }: IProduct
    ) =>
      await productController.updateProduct(id, { productName, productPrice }),
    removeProduct: async (_: unknown, { id }: { id: string }) =>
      await productController.deleteProduct(id),

    addCustomer: async (
      _: unknown,
      { firstName, lastName, email }: Omit<ICustomer, "id">
    ) =>
      await customerController.createCustomer({ firstName, lastName, email }),
    editCustomer: async (
      _: unknown,
      { id, firstName, lastName, email }: ICustomer
    ) =>
      await customerController.updateCustomer(id, {
        firstName,
        lastName,
        email,
      }),
    removeCustomer: async (_: unknown, { id }: { id: string }) =>
      await customerController.deleteCustomer(id),

    addOrder: async (
      _: unknown,
      { productId, customerId }: Omit<IOrder, "id">
    ) => await orderController.createOrder({ productId, customerId }),
    editOrder: async (_: unknown, { id, productId, customerId }: IOrder) =>
      await orderController.updateOrder(id, { productId, customerId }),
    removeOrder: async (_: unknown, { id }: { id: string }) =>
      await orderController.deleteOrder(id),
  },
};
