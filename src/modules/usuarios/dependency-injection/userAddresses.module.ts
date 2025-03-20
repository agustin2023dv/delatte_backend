import { ContainerModule } from "inversify";
import { USER_ADDRESSES_TYPES } from "../types/userAddresses.types";
import { UserAddressRepository } from "../repositories/userAddress.repository";
import { UserAddressService } from "../services/userAddresses.service";


export const userAddressesModule = new ContainerModule((bind) => {
  bind(USER_ADDRESSES_TYPES.UserAddressRepository).to(UserAddressRepository);
  bind(USER_ADDRESSES_TYPES.UserAddressService).to(UserAddressService)
});

