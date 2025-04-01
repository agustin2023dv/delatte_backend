
import { ICustomerRegistrationDTO, IManagerRegistrationDTO } from "@delatte/shared/dtos";
import { IUser } from "@delatte/shared/interfaces/User/IUser";

export interface IUserRegisterService {
  registerUser(userData: ICustomerRegistrationDTO): Promise<IUser>;
  registerManager(managerData: IManagerRegistrationDTO): Promise<IUser>;
}
