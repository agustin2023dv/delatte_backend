import mongoose, { Schema, Types } from "mongoose";
import { IUser } from "@delatte/shared/interfaces";

const SecuritySchema = new Schema({
  password: { type: String, required: true },
  isVerified: { type: Boolean, default: false },
  emailToken: { type: String, default: null },
  isActive: { type: Boolean, default: true },
}, { _id: false });

const ProfileSchema = new Schema({
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  dob: { type: Date },
  phone: { type: String },
  profileImage: { type: String, default: "Imagen de perfil" },
  addresses: { type: [String], default: [] },
}, { _id: false });

const FavoritesSchema = new Schema({
  favoriteRestaurants: { type: [{ type: Types.ObjectId, ref: "Restaurant" }], default: [] },
}, { _id: false });

const ReviewsSchema = new Schema({
  reviews: { type: [{ type: Types.ObjectId, ref: "Review" }], default: [] },
}, { _id: false });


// 📌 Esquema principal de usuario
const UserSchema: Schema = new Schema({
  profile: { type: ProfileSchema, required: true },
  security: { type: SecuritySchema, required: true },
  favorites: { type: FavoritesSchema },
  reviews: { type: ReviewsSchema },
  role: { type: String, enum: ["customer", "manager", "superadmin"], default: "customer" },
}); 



UserSchema.index({ "profile.nombre": 1, "profile.apellido": 1 });
UserSchema.index({ "security.isVerified": 1 });
UserSchema.index({ "favorites.favoriteRestaurants": 1 });
UserSchema.index({ "reviews.reviews": 1 });
UserSchema.index({ "role": 1 });
UserSchema.index({ "security.isActive": 1, "role": 1 });




const User = mongoose.model<IUser & Document>("User", UserSchema, "usuarios");
export default User;
