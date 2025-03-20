import { IUser } from "@delatte/shared/interfaces/User/IUser";


export interface IUserRegisterService {
  registerUser(nombre: string, apellido: string, email: string, password: string): Promise<IUser>;
  registerManager(managerData: { nombre: string; apellido: string; email: string; password: string }): Promise<IUser>;
}
