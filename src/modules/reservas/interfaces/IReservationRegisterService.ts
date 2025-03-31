import { ICreateReservationDTO } from "@delatte/shared/dtos";
import { IReservation } from "@delatte/shared/interfaces";

export interface IReservationRegisterService {
  createCustomerReservation(dto: ICreateReservationDTO): Promise<IReservation>;

  createManagerReservation(
    managerId: string,
    dto: ICreateReservationDTO
  ): Promise<IReservation>;

  createSuperadminReservation(
    dto: ICreateReservationDTO
  ): Promise<IReservation>;
}
