"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = require("../models/order.model");
const customer_model_1 = require("../models/customer.model");
const product_model_1 = require("../models/product.model");
// getOrders
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.Order.find().populate("customerId").populate("productId");
});
// createOrder
const createOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    //return await Order.create(data);
    const { customerId, productId } = data;
    const customer = yield customer_model_1.Customer.findById(customerId);
    const product = yield product_model_1.Product.findById(productId);
    if (!customer || !product) {
        throw new Error("Customer or product not found");
    }
    const order = yield order_model_1.Order.create(data);
    return (yield order.populate("customerId")).populate("productId");
});
// updateOrder
const updateOrder = (id, data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.Order.findByIdAndUpdate(id, data, { new: true })
        .populate("customerId")
        .populate("productId");
});
// deleteOrder
const deleteOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield order_model_1.Order.findByIdAndDelete(id);
});
exports.default = {
    getOrders,
    createOrder,
    updateOrder,
    deleteOrder,
};
