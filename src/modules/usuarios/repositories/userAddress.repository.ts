import { injectable } from "inversify";
import User from "../../../modules/usuarios/models/User.model";

@injectable()
export class UserAddressRepository {
  async getUserAddresses(userId: string) {
    const user = await User.findById(userId).select("addresses");
    if (!user) throw new Error("Usuario no encontrado");
    return user.addresses;
  }

  async addUserAddress(userId: string, newAddress: string) {
    const user = await User.findById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    if (!user.addresses) user.addresses = [];
    user.addresses.push(newAddress);
    await user.save();
    return user.addresses;
  }

  async removeUserAddress(userId: string, address: string) {
    const user = await User.findById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    if (!user.addresses) user.addresses = [];
    user.addresses = user.addresses.filter((addr) => addr !== address);
    await user.save();
    return user.addresses;
  }
}
