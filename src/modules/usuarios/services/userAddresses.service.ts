import { inject, injectable } from "inversify";
import { UserAddressRepository } from "../repositories/userAddress.repository";
import { USER_ADDRESSES_TYPES } from "../types/userAddresses.types";


@injectable()
export class UserAddressService {
  private userAddressRepository: UserAddressRepository;

  constructor(@inject(USER_ADDRESSES_TYPES.UserAddressRepository) userAddressRepository: UserAddressRepository) {
    this.userAddressRepository = userAddressRepository;
  }

  async getUserAddresses(userId: string) {
    return await this.userAddressRepository.getUserAddresses(userId);
  }

  async addAddress(userId: string, newAddress: string) {
    if (!newAddress) {
      throw new Error("La dirección es requerida.");
    }
    return await this.userAddressRepository.addUserAddress(userId, newAddress);
  }

  async removeAddress(userId: string, address: string) {
    if (!address) {
      throw new Error("La dirección es requerida.");
    }
    return await this.userAddressRepository.removeUserAddress(userId, address);
  }
}
