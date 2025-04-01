import { injectable } from "inversify";
import User from "../../../modules/usuarios/models/User.model";

@injectable()
export class UserAddressRepository {
  async getUserAddresses(userId: string) {
    const user = await User.findById(userId).select("profile.addresses").lean();
    if (!user || !user.profile) throw new Error("Usuario no encontrado");
    return user.profile.addresses ?? [];
  }

  async addUserAddress(userId: string, newAddress: string) {
    const user = await User.findById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    if (!user.profile.addresses) {
      user.profile.addresses = [];
    }

    user.profile.addresses.push(newAddress);
    await user.save();
    return user.profile.addresses;
  }

  async removeUserAddress(userId: string, address: string) {
    const user = await User.findById(userId);
    if (!user || !user.profile.addresses) throw new Error("Usuario no encontrado o sin direcciones");

    user.profile.addresses = user.profile.addresses.filter((addr) => addr !== address);
    await user.save();
    return user.profile.addresses;
  }
}
