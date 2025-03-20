import { ContainerModule } from "inversify";
import { USER_MANAGEMENT_TYPES } from "../types/userManagement.types";
import { UserManagementService } from "../services/userManagement.service";
import { UserManagementRepository } from "../repositories/userManagement.repository";
import { IUserManagementRepository } from "../interfaces/IUserManagementRepository";

export const userManagementModule = new ContainerModule((bind) => {
  bind<IUserManagementRepository>(USER_MANAGEMENT_TYPES.UserManagementRepository).to(UserManagementRepository);
  bind<UserManagementService>(USER_MANAGEMENT_TYPES.UserManagementService).to(UserManagementService);

});
