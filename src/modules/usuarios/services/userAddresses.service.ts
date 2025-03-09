import { UserAddressRepository } from "../repositories/userAddress.repository";

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
