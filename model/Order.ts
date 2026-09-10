import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
  userId: mongoose.Types.ObjectId;
  productId: mongoose.Types.ObjectId;

  price: number;

  bedSize?: string;
  materials?: string;
  color?: string;
  fabric?: string;
  fabricColor?: string;
  mattress?: string;
  drawers?: number;

  extras: string[];
  description?: string;

  userAddress: string;
  phone: string;

  image: string[];

  status: "pending" | "confirmed" | "processing" | "completed" | "cancelled";

  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema = new Schema<IOrder>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },

    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    bedSize: String,
    materials: String,
    color: String,
    fabric: String,
    fabricColor: String,
    mattress: String,

    drawers: {
      type: Number,
      default: 0,
      min: 0,
    },

    extras: {
      type: [String],
      default: [],
    },

    description: String,

    userAddress: {
      type: String,
      required: true,
    },

    phone: {
      type: String,
      required: true,
    },

    image: {
      type: [String],
      default: [],
    },

    status: {
      type: String,
      enum: ["pending", "confirmed", "processing", "completed", "cancelled"],
      default: "pending",
    },
  },
  {
    timestamps: true,
  },
);

const Order =
  mongoose.models.Order || mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
