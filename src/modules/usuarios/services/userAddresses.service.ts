import { UserAddressRepository } from "../repositories/userAddress.repository";

export class UserAddressService {
  // 📌 Obtener todas las direcciones de un usuario
  static async getUserAddresses(userId: string) {
    return await UserAddressRepository.getUserAddresses(userId);
  }

  // 📌 Agregar una dirección a un usuario
  static async addAddress(userId: string, newAddress: string) {
    if (!newAddress) {
      throw new Error("La dirección es requerida.");
    }

    return await UserAddressRepository.addUserAddress(userId, newAddress);
  }

  // 📌 Eliminar una dirección de un usuario
  static async removeAddress(userId: string, address: string) {
    if (!address) {
      throw new Error("La dirección es requerida.");
    }

    return await UserAddressRepository.removeUserAddress(userId, address);
  }
}
