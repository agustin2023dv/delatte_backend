import { Document, ObjectId, Types } from 'mongoose';
export interface IUser extends Document {
    _id: ObjectId | string;
    nombre: string;
    apellido: string;
    email: string;
    password: string;
    isVerified: boolean;
    emailToken: string | null;
    dob?: Date;
    phone?: string;
    isActive: boolean;
    addresses?: string[];
    profileImage?: string;
    favoriteRestaurants?: Types.ObjectId[];
    reviews?: ObjectId[];
    role: 'customer' | 'manager' | 'superadmin';
}
//# sourceMappingURL=IUser.d.ts.map