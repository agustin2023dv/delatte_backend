import { IUser } from "@delatte/shared/interfaces";
import { IUserProfileResponseDTO } from "@delatte/shared/dtos";

export class UserProfileTransformer {
  static toResponseDTO(user: IUser): IUserProfileResponseDTO {
    return {
      nombre: user.profile.nombre,
      apellido: user.profile.apellido,
      email: user.profile.email,
      dob: user.profile.dob?.toISOString(),
      phone: user.profile.phone,
      profileImage: user.profile.profileImage,
      addresses: user.profile.addresses,
      favorites: user.favorites?.favoriteRestaurants?.map(id => id.toString()) ?? [],
    };
  }
}
