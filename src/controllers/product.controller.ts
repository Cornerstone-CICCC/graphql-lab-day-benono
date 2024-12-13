import { Product } from "../models/product.model";
import { IProduct } from "../types/product";

// getProducts
const getProducts = async () => {
  return await Product.find();
};

// getProductById
const getProductById = async (id: string) => {
  return await Product.findById(id);
};

// createProduct
const createProduct = async (data: Omit<IProduct, "id">) => {
  return await Product.create(data);
};

// updateProduct
const updateProduct = async (id: string, data: Partial<IProduct>) => {
  return await Product.findByIdAndUpdate(id, data, { new: true });
};

// deleteProduct
const deleteProduct = async (id: string) => {
  return await Product.findByIdAndDelete(id);
};

export default {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
