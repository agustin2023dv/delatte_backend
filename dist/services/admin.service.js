import User from "../models/User.model";
import mongoose from "mongoose";
import { comparePasswordService } from "./auth.service";
import jwt from 'jsonwebtoken';
export const getUsersService = async (role) => {
    const query = role ? { role } : {};
    return await User.find(query).select("-password").sort({ apellido: 1 });
    ;
};
// Suspender usuario (validación de ID y manejo de `isActive`)
export const suspendUserService = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("ID de usuario no válido");
    }
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("Usuario no encontrado");
    }
    if (!user.isActive) {
        throw new Error("El usuario ya está suspendido");
    }
    return await User.findByIdAndUpdate(userId, { isActive: false }, { new: true });
};
// Eliminar usuario (validación de ID y evitar eliminar superadmins)
export const deleteUserService = async (userId) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("ID de usuario no válido");
    }
    const user = await User.findById(userId);
    if (!user) {
        throw new Error("Usuario no encontrado");
    }
    if (user.role === "superadmin") {
        throw new Error("No se puede eliminar un superadmin");
    }
    return await User.findByIdAndDelete(userId);
};
export const getUserDetailsService = async (userId) => {
    return await User.findById(userId)
        .populate("favoriteRestaurants", "nombre") // Solo el nombre del restaurante favorito
        .populate({
        path: "reservations",
        select: "-_id", // Trae todo excepto `_id`
        populate: { path: "restaurante", select: "nombre direccion telefono emailContacto" }, // Muestra datos clave del restaurante
    })
        .populate({
        path: "reviews",
        select: "-_id -ultimaActualizacion", // Excluye `ultimaActualizacion`
        populate: { path: "restaurante", select: "nombre" }, // Muestra solo el nombre del restaurante en la review
    });
};
// Actualizar usuario (validación de ID)
export const updateUserService = async (userId, updateData) => {
    if (!mongoose.Types.ObjectId.isValid(userId)) {
        throw new Error("ID de usuario no válido");
    }
    // Evitar que `emailToken` sea modificado
    const { emailToken, ...filteredUpdateData } = updateData;
    return await User.findByIdAndUpdate(userId, filteredUpdateData, { new: true }).select("-emailToken");
};
//* Servicio para login de CUSTOMER
export const loginAdminService = async (email, password) => {
    const user = await User.findOne({ email });
    // Verificar si el usuario existe
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    // Verificar si el rol es 'superadmin'
    if (user.role !== 'superadmin') {
        throw new Error('El usuario no tiene permisos para iniciar sesión como cliente');
    }
    // Verificar la contraseña
    const isMatch = await comparePasswordService(password, user.password);
    if (!isMatch) {
        throw new Error('Contraseña incorrecta');
    }
    // Generar token JWT si la autenticación es correcta
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '48h' });
    return { token, user };
};
