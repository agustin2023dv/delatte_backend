import { ContainerModule, interfaces } from "inversify";
import { USER_PROFILE_TYPES } from "../types/userProfile.types";
import { IUserProfileRepository } from "../interfaces/IUserProfileRepository";
import { UserProfileRepository } from "../repositories/userProfile.repository";
import { UserProfileService } from "../services/userProfile.service";

export const userProfileModule = new ContainerModule((bind: interfaces.Bind) => {
  bind<IUserProfileRepository>(USER_PROFILE_TYPES.UserProfileRepository).to(UserProfileRepository);
  bind<UserProfileService>(USER_PROFILE_TYPES.UserProfileService).to(UserProfileService);

});
