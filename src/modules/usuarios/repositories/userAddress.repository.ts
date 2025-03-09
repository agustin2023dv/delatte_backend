import User from "../../../modules/usuarios/models/User.model";

export class UserAddressRepository {

  // 📌 Obtener todas las direcciones de un usuario
  static async getUserAddresses(userId: string) {
    const user = await User.findById(userId).select("addresses");
    if (!user) throw new Error("Usuario no encontrado");
    return user.addresses;
  }

  // 📌 Agregar una dirección a un usuario
  static async addUserAddress(userId: string, newAddress: string) {
    const user = await User.findById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    // Inicializar el array si no existe
    if (!user.addresses) user.addresses = [];
    
    user.addresses.push(newAddress);
    await user.save();
    return user.addresses;
  }

  // 📌 Eliminar una dirección de un usuario
  static async removeUserAddress(userId: string, address: string) {
    const user = await User.findById(userId);
    if (!user) throw new Error("Usuario no encontrado");

    // Inicializar el array si no existe
    if (!user.addresses) user.addresses = [];
  
    user.addresses = user.addresses.filter((addr) => addr !== address);
    await user.save();
    return user.addresses;
  }
}
