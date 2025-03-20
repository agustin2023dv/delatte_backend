import { inject, injectable } from "inversify";
import { IReservationRegisterService } from "../interfaces/IReservationRegisterService";
import { RESERVATIONS_BASE_TYPES } from "../types/reservationBase.types";
import { IReservation } from "@delatte/shared/interfaces";
import { Types } from "mongoose";
import { IReservationBaseRepository } from "../interfaces/IReservationBaseRepository";

@injectable()
export class ReservationRegistrationService implements IReservationRegisterService {
    constructor(
        @inject(RESERVATIONS_BASE_TYPES.IReservationBaseRepository)
        private reservationRepo: IReservationBaseRepository
    ) {}

    private toObjectId(id: string): Types.ObjectId {
        return new Types.ObjectId(id);
    }

    async createCustomerReservation(
        userId: string,
        restauranteId: string,
        fecha: Date,
        horario: string,
        numAdultos: number,
        numNinos: number,
        pedidosEspeciales?: string
    ): Promise<IReservation> {
        const restaurant = await this.reservationRepo.restaurantExists(restauranteId);
        if (!restaurant) throw new Error("Restaurante no encontrado");

        return await this.reservationRepo.createReservation({
            usuario: this.toObjectId(userId),
            restaurante: this.toObjectId(restauranteId),
            fecha,
            horario,
            numAdultos,
            numNinos,
            pedidosEspeciales,
            estado: "Confirmada",
        });
    }

    async createManagerReservation(
        managerId: string,
        clienteId: string,
        restauranteId: string,
        fecha: Date,
        horario: string,
        numAdultos: number,
        numNinos: number,
        pedidosEspeciales?: string
    ): Promise<IReservation> {
        const restaurant = await this.reservationRepo.restaurantExists(restauranteId);
        if (!restaurant) throw new Error("Restaurante no encontrado");

        // Validación de permisos
        const isManager = restaurant.management.managerPrincipal?.toString() === managerId;
        const isCoManager = restaurant.management.coManagers?.some((coManager: any) => coManager.toString() === managerId);
        if (!isManager && !isCoManager) {
            throw new Error("No puedes crear reservas en un restaurante que no administras");
        }

        return await this.reservationRepo.createReservation({
            usuario: this.toObjectId(clienteId),
            restaurante: this.toObjectId(restauranteId),
            fecha,
            horario,
            numAdultos,
            numNinos,
            pedidosEspeciales,
            estado: "Confirmada",
        });
    }

    async createSuperadminReservation(
        clienteId: string,
        restauranteId: string,
        fecha: Date,
        horario: string,
        numAdultos: number,
        numNinos: number,
        pedidosEspeciales?: string
    ): Promise<IReservation> {
        return await this.reservationRepo.createReservation({
            usuario: this.toObjectId(clienteId),
            restaurante: this.toObjectId(restauranteId),
            fecha,
            horario,
            numAdultos,
            numNinos,
            pedidosEspeciales,
            estado: "Confirmada",
        });
    }
}
