import  { Schema, Document, models, model } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;

  role: "admin" | "user";

  image?: string;

  isVerified: boolean;
  emailToken?: string;

  phone?: string;

  addresses: {
    title: string;
    province: string;
    city: string;
    address: string;
    postalCode: string;
    receiver: string;
    phone: string;
    isDefault: boolean;
  }[];

  isActive: boolean;

  createdAt: Date;
  updatedAt: Date;
}

const AddressSchema = new Schema(
  {
    title: {
      type: String,
      default: "خانه",
    },
    province: String,
    city: String,
    address: String,
    postalCode: String,
    receiver: String,
    phone: String,
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { _id: false },
);

const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },

    image: {
      type: String,
      default: "",
    },

    isVerified: {
      type: Boolean,
      default: false,
    },

    emailToken: {
      type: String,
      default: null,
    },

    phone: {
      type: String,
      default: "",
    },

    addresses: {
      type: [AddressSchema],
      default: [],
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  },
);

const User = models.User || model<IUser>("User", UserSchema);

export default User;
