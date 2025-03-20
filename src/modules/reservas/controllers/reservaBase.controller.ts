import { BaseHttpController, controller, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { Request, Response } from "express";
import { inject } from "inversify";
import { RESERVATIONS_BASE_TYPES } from "../types/reservationBase.types";
import { authMiddleware } from "../../../middlewares/auth.middleware";
import { roleMiddleware } from "../../../middlewares/role.middleware";
import { checkDisponibilidadMiddleware, validateReservationData } from "../../../middlewares/reservation.middleware";
import { IReservationBaseService } from "../interfaces/IReservationBaseService";
import { IReservationRegisterService } from "../interfaces/IReservationRegisterService";
import { AuthRequest } from "../../../../types";

@controller("/api/v1/reservations")
export class ReservationBaseController extends BaseHttpController {
    constructor(
        @inject(RESERVATIONS_BASE_TYPES.IReservationBaseService)
        private reservationBaseService: IReservationBaseService,

        @inject(RESERVATIONS_BASE_TYPES.IReservationRegisterService)
        private reservationRegisterService: IReservationRegisterService,
    ) {
        super();
    }

    // 📌 Crear una nueva reserva
    @httpPost("/", authMiddleware, validateReservationData, checkDisponibilidadMiddleware)
    async createReservation(req: AuthRequest, res: Response): Promise<void> {
        try {
            const userId = req.user.id;
            const { restauranteId, fecha, horario, numAdultos, numNinos, pedidosEspeciales, clienteId } = req.body;
            const userRole = req.user.role;

            if (!restauranteId || !fecha || !horario || numAdultos < 1) {
                res.status(400).json({ message: "Datos insuficientes para crear la reserva" });
                return;
            }

            let reserva;
            if (userRole === "customer") {
                if (clienteId && clienteId !== userId) {
                    res.status(403).json({ message: "No puedes reservar en nombre de otro usuario" });
                    return;
                }
                reserva = await this.reservationRegisterService.createCustomerReservation(userId, restauranteId, fecha, horario, numAdultos, numNinos, pedidosEspeciales);
            } else if (userRole === "manager") {
                reserva = await this.reservationRegisterService.createManagerReservation(userId, clienteId, restauranteId, fecha, horario, numAdultos, numNinos, pedidosEspeciales);
            } else if (userRole === "superadmin") {
                reserva = await this.reservationRegisterService.createSuperadminReservation(clienteId, restauranteId, fecha, horario, numAdultos, numNinos, pedidosEspeciales);
            } else {
                res.status(403).json({ message: "No tienes permisos para crear una reserva" });
                return;
            }

            res.status(201).json(reserva);
        } catch (error) {
            console.error("Error al crear reserva:", error);
            res.status(500).json({ message: "Error interno al crear la reserva", error });
        }
    }

    // 📌 Obtener reservas del usuario autenticado
    @httpGet("/", authMiddleware, roleMiddleware(["customer", "manager"]))
    async getUserReservations(req: AuthRequest, res: Response): Promise<void> {
        try {
            const result = await this.reservationBaseService.getReservationsById(req.user.id, req.user.role);
            res.status(200).json(result.length ? result : { message: "No hay reservas disponibles." });
        } catch (error) {
            res.status(500).json({ message: "Error interno del servidor", error });
        }
    }

    // 📌 Obtener reservas de un restaurante
    @httpGet("/restaurant/:id", authMiddleware, roleMiddleware(["superadmin", "manager"]))
    async getReservationsByRestaurant(req: Request, res: Response): Promise<void> {
        try {
            const { id: restaurantId } = req.params;
            const reservations = await this.reservationBaseService.getReservationsByRestaurant(restaurantId);
            res.status(200).json(reservations);
        } catch (error) {
            res.status(500).json({ message: "Error obteniendo reservas del restaurante", error });
        }
    }

    // 📌 Obtener reservas de un usuario
    @httpGet("/user/:id", authMiddleware, roleMiddleware(["superadmin"]))
    async getReservationsByUser(req: Request, res: Response): Promise<void> {
        try {
            const { id: userId } = req.params;
            const reservations = await this.reservationBaseService.getReservationsByUser(userId);
            res.status(200).json(reservations);
        } catch (error) {
            res.status(500).json({ message: "Error obteniendo reservas del usuario", error });
        }
    }

    // 📌 Obtener detalles de una reserva por ID
    @httpGet("/:id", authMiddleware)
    async getReservationById(req: Request, res: Response): Promise<void> {
        try {
            const { id: reservationId } = req.params;
            const reservation = await this.reservationBaseService.getReservationById(reservationId);

            if (!reservation) {
                res.status(404).json({ message: "Reserva no encontrada" });
                return;
            }

            res.status(200).json(reservation);
        } catch (error) {
            res.status(500).json({ message: "Error obteniendo la reserva", error });
        }
    }

    // 📌 Cancelar una reserva
    @httpPut("/:id/cancel", authMiddleware)
    async cancelReservation(req: AuthRequest, res: Response): Promise<void> {
        try {
            const reservation = await this.reservationBaseService.cancelReservation(req.params.id);
            res.status(200).json({ message: "Reserva cancelada con éxito.", reservation });
        } catch (error) {
            res.status(500).json({ message: "Error cancelando la reserva", error });
        }
    }

    // 📌 Modificar una reserva
    @httpPut("/:id", authMiddleware, validateReservationData)
    async updateReservation(req: AuthRequest, res: Response): Promise<void> {
        try {
            const updatedReservation = await this.reservationBaseService.updateReservation(req.params.id, req.body);
            res.status(200).json({ message: "Reserva actualizada con éxito.", updatedReservation });
        } catch (error) {
            res.status(500).json({ message: "Error actualizando la reserva", error });
        }
    }

    // 📌 Obtener todas las reservas (solo superadmins)
    @httpGet("/all", authMiddleware, roleMiddleware(["superadmin"]))
    async getAllReservations(req: Request, res: Response): Promise<void> {
        try {
            const reservations = await this.reservationBaseService.getAllReservations();
            res.status(200).json(reservations);
        } catch (error) {
            res.status(500).json({ message: "Error obteniendo todas las reservas", error });
        }
    }
}
