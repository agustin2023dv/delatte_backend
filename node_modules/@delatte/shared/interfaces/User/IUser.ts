import { Types } from "mongoose";

import { IUserSecurity } from "./IUserSecurity";
import { IUserProfile } from "./IUserProfile";

import { IUserFavorites } from "./IUserFavorites";
import { IUserReviews } from "./IUserReviews";
import { IUserRole } from "./IUserRole";
import { IUserBase } from "./IUserBase";

export interface IUser extends  Omit<Document, "_id">, 
  IUserBase, 
  IUserSecurity,    
  IUserProfile, 
  IUserRole, 
  IUserFavorites, 
  IUserReviews {

  _id: Types.ObjectId | string;
}
