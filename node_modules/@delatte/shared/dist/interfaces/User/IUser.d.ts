import { Types } from "mongoose";
import { IUserBase } from "./IUserBase";
import { IUserSecurity } from "./IUserSecurity";
import { IUserFavorites } from "./IUserFavorites";
import { IUserReviews } from "./IUserReviews";
import { IUserProfile } from "./IUserProfile";
import { IUserRole } from "./IUserRole";
export interface IUser extends Omit<Document, "_id"> {
    _id: Types.ObjectId | string;
    profile: IUserBase & IUserProfile;
    security: IUserSecurity;
    favorites?: IUserFavorites;
    reviews?: IUserReviews;
    role: IUserRole["role"];
}
//# sourceMappingURL=IUser.d.ts.map