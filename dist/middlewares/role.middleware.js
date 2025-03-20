"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleMiddleware = void 0;
const roleMiddleware = (roles) => {
    return async (req, res, next) => {
        try {
            if (!req.user) {
                console.error("Acceso denegado: Usuario no autenticado");
                res.status(403).json({ message: "Usuario no autenticado" });
                return;
            }
            if (!roles.includes(req.user.role)) {
                console.error(`Acceso denegado: Rol ${req.user.role} no tiene permisos para esta ruta`);
                res.status(403).json({ message: `Rol ${req.user.role} no autorizado` });
                return;
            }
            console.log(`Acceso permitido: Usuario ${req.user.id} con rol ${req.user.role}`);
            next();
        }
        catch (error) {
            console.error("Error en roleMiddleware:", error);
            res.status(500).json({ message: "Error en la autorización", error });
        }
    };
};
exports.roleMiddleware = roleMiddleware;
