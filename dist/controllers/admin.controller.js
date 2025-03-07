"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserController = exports.deleteUserController = exports.suspendUserController = exports.getUserDetailsController = exports.getUsersController = exports.loginAdminController = void 0;
const admin_service_1 = require("../services/admin.service");
const loginAdminController = async (req, res) => {
    try {
        const { email, password } = req.body;
        const { token, user } = await (0, admin_service_1.loginAdminService)(email, password);
        res.status(200).json({ token, user });
    }
    catch (error) {
        res.status(400).json({ message: error instanceof Error ?
                error.message : "Error al iniciar sesión" });
    }
};
exports.loginAdminController = loginAdminController;
const getUsersController = async (req, res) => {
    try {
        const role = req.query.role;
        const users = await (0, admin_service_1.getUsersService)(role);
        res.status(200).json(users);
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener usuarios", error: error instanceof Error ? error.message : "Error desconocido" });
    }
};
exports.getUsersController = getUsersController;
const getUserDetailsController = async (req, res) => {
    try {
        const user = await (0, admin_service_1.getUserDetailsService)(req.params.id);
        if (!user) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        res.status(200).json(user);
        return;
    }
    catch (error) {
        res.status(500).json({ message: "Error al obtener perfil", error });
        return;
    }
};
exports.getUserDetailsController = getUserDetailsController;
const suspendUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await (0, admin_service_1.suspendUserService)(id);
        res.status(200).json({ message: "Usuario suspendido con éxito", user: updatedUser });
    }
    catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : "Error al suspender usuario" });
    }
};
exports.suspendUserController = suspendUserController;
const deleteUserController = async (req, res) => {
    try {
        const { id } = req.params;
        await (0, admin_service_1.deleteUserService)(id);
        res.status(200).json({ message: "Usuario eliminado con éxito" });
    }
    catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : "Error al eliminar usuario" });
    }
};
exports.deleteUserController = deleteUserController;
const updateUserController = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedUser = await (0, admin_service_1.updateUserService)(id, req.body);
        if (!updatedUser) {
            res.status(404).json({ message: "Usuario no encontrado" });
            return;
        }
        res.status(200).json({ message: "Usuario actualizado con éxito", user: updatedUser });
    }
    catch (error) {
        res.status(400).json({ message: error instanceof Error ? error.message : "Error al actualizar usuario" });
    }
};
exports.updateUserController = updateUserController;
