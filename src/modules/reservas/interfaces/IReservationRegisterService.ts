import { IReservation } from "@delatte/shared/interfaces/Reservation/IReservation";


export interface IReservationRegisterService {
    createCustomerReservation(
        userId: string,
        restauranteId: string,
        fecha: Date,
        horario: string,
        numAdultos: number,
        numNinos: number,
        pedidosEspeciales?: string
    ): Promise<IReservation>;

    createManagerReservation(
        managerId: string,
        clienteId: string,
        restauranteId: string,
        fecha: Date,
        horario: string,
        numAdultos: number,
        numNinos: number,
        pedidosEspeciales?: string
    ): Promise<IReservation>;

    createSuperadminReservation(
        clienteId: string,
        restauranteId: string,
        fecha: Date,
        horario: string,
        numAdultos: number,
        numNinos: number,
        pedidosEspeciales?: string
    ): Promise<IReservation>;
}
