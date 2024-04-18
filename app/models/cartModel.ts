import mongoose, { Schema, Document } from "mongoose";

export interface ICartItem extends Document {
  id: number;
  userEmail: string;
}

const cartItemSchema = new Schema<ICartItem>({
  id: { type: Number, required: true },
  userEmail: { type: String, required: true },
});

const CartItem: mongoose.Model<ICartItem> =
  mongoose.models.CartItem ||
  mongoose.model<ICartItem>("CartItem", cartItemSchema);

export default CartItem;
