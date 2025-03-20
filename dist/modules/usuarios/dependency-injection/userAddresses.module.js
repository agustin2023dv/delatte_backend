"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userAddressesModule = void 0;
const inversify_1 = require("inversify");
const userAddresses_types_1 = require("../types/userAddresses.types");
const userAddress_repository_1 = require("../repositories/userAddress.repository");
const userAddresses_service_1 = require("../services/userAddresses.service");
exports.userAddressesModule = new inversify_1.ContainerModule((bind) => {
    bind(userAddresses_types_1.USER_ADDRESSES_TYPES.UserAddressRepository).to(userAddress_repository_1.UserAddressRepository);
    bind(userAddresses_types_1.USER_ADDRESSES_TYPES.UserAddressService).to(userAddresses_service_1.UserAddressService);
});
