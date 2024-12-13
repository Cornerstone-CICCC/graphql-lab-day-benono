import mongoose, { Schema } from "mongoose";

const OrderSchema = new Schema({
  customerId: { type: Schema.Types.ObjectId, ref: "Customer", required: true },
  productId: { type: Schema.Types.ObjectId, ref: "Product", required: true },
});

export const Order = mongoose.model("Order", OrderSchema);
