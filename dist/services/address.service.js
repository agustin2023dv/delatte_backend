import User from "../models/User.model";
//* SERVICIOS PARA EL MANEJO DE DIRECCIONES
export const getUserAddressesService = async (userId) => {
    const user = await User.findById(userId).select("addresses");
    if (!user)
        throw new Error("Usuario no encontrado");
    return user.addresses;
};
export const addAddressService = async (userId, newAddress) => {
    const user = await User.findById(userId);
    if (!user)
        throw new Error("Usuario no encontrado");
    // Inicializar el array si no existe
    if (!user.addresses)
        user.addresses = [];
    user.addresses.push(newAddress);
    await user.save();
    return user.addresses;
};
export const removeAddressService = async (userId, address) => {
    const user = await User.findById(userId);
    if (!user)
        throw new Error("Usuario no encontrado");
    // Inicializar el array si no existe
    if (!user.addresses)
        user.addresses = [];
    user.addresses = user.addresses.filter((addr) => addr !== address);
    await user.save();
    return user.addresses;
};
