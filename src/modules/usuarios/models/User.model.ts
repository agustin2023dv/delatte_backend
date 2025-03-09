import mongoose, { Schema, Types } from "mongoose";
import { IUser } from "@delatte/shared/interfaces";

const UserSchema: Schema = new Schema({
  nombre: { type: String },
  apellido: { type: String },
  email: { type: String, unique: true },
  password: { type: String },
  isVerified: { type: Boolean, default: false },
  emailToken: { type: String },
  dob: { type: Date },
  phone: { type: String },
  isActive: { type: Boolean, default: true },
  addresses: { type: [{ type: String }], default: [] },
  favoriteRestaurants: { type: [{ type: Types.ObjectId, ref: "Restaurant" }], default: [] }, 
  reviews: { type: [{ type: Types.ObjectId, ref: "Review" }], default: [] },
  profileImage: { type: String, default: "Imagen de perfil" },
  role: { type: String, enum: ["customer", "manager", "superadmin"], default: "customer" },
});


UserSchema.index({ email: 1 }, { unique: true });
UserSchema.index({ role: 1 });
UserSchema.index({ favoriteRestaurants: 1 });

const User = mongoose.model<IUser>("User", UserSchema, "usuarios");
export default User;
