import { IUser } from "../../interfaces";

export interface ILoginResponseDTO {
    token: string;
    user: IUser;
  }