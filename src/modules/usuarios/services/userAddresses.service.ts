import { inject, injectable } from "inversify";
import { UserAddressRepository } from "../repositories/userAddress.repository";
import { USER_ADDRESSES_TYPES } from "../types/userAddresses.types";

<<<<<<< Updated upstream
// 📌 Obtener todas las direcciones de un usuario
export const getUserAddressesService = async (userId: string) => {
  return await UserAddressRepository.getUserAddresses(userId);
};

// 📌 Agregar una dirección a un usuario
export const addAddressService = async (userId: string, newAddress: string) => {
  return await UserAddressRepository.addUserAddress(userId, newAddress);
};

// 📌 Eliminar una dirección de un usuario
export const removeAddressService = async (userId: string, address: string) => {
  return await UserAddressRepository.removeUserAddress(userId, address);
};
=======

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
>>>>>>> Stashed changes
