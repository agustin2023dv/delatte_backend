"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantRegistrationService = void 0;
const inversify_1 = require("inversify");
const restaurantBase_types_1 = require("../types/restaurantBase.types");
const userAccess_types_1 = require("../../usuarios/types/userAccess.types");
const mongoose_1 = require("mongoose");
const geolocation_service_1 = require("../../integrations/services/geolocation.service");
let RestaurantRegistrationService = class RestaurantRegistrationService {
    restaurantRegisterService;
    userRegisterService;
    passwordHasher;
    constructor(restaurantRegisterService, userRegisterService, passwordHasher) {
        this.restaurantRegisterService = restaurantRegisterService;
        this.userRegisterService = userRegisterService;
        this.passwordHasher = passwordHasher;
    }
    async registerRestaurant(restaurantData) {
        try {
            // Verificar si location existe
            if (!restaurantData.location) {
                throw new Error("La ubicación del restaurante no fue proporcionada.");
            }
            const direccionCompleta = `${restaurantData.location.direccion}, Montevideo, ${restaurantData.location.codigoPostal || ""}, Uruguay`;
            const coordenadas = await (0, geolocation_service_1.getCoordinatesFromAddress)(direccionCompleta);
            if (!coordenadas)
                throw new Error("No se encontraron coordenadas para la dirección proporcionada.");
            restaurantData.location.ubicacion = {
                type: "Point",
                coordinates: [coordenadas.longitude, coordenadas.latitude],
            };
            return await this.restaurantRegisterService.registerRestaurant(restaurantData);
        }
        catch (error) {
            console.error("Error al registrar restaurante:", error);
            throw error;
        }
    }
    async registerRestaurantAndManager(restaurantData, managerData) {
        try {
            console.log("Restaurant details: ", restaurantData);
            console.log("Manager details: ", managerData);
            // 🔹 Hashear contraseña del manager
            managerData.password = await this.passwordHasher.hash(managerData.password);
            // 🔹 Ejecutar ambas funciones en paralelo para mejorar rendimiento
            const [savedManager, savedRestaurant] = await Promise.all([
                this.userRegisterService.registerManager(managerData),
                this.registerRestaurant(restaurantData),
            ]);
            // 🔹 Asociar el manager al restaurante
            savedRestaurant.management.managerPrincipal = new mongoose_1.Types.ObjectId(savedManager._id.toString());
            return { savedRestaurant, savedManager };
        }
        catch (error) {
            console.error("Error al registrar el restaurante y manager:", error);
            throw error;
        }
    }
};
exports.RestaurantRegistrationService = RestaurantRegistrationService;
exports.RestaurantRegistrationService = RestaurantRegistrationService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(restaurantBase_types_1.RESTAURANT_BASE_TYPES.IRestaurantService)),
    __param(1, (0, inversify_1.inject)(userAccess_types_1.USER_ACCESS_TYPES.IUserRegisterService)),
    __param(2, (0, inversify_1.inject)(userAccess_types_1.USER_ACCESS_TYPES.PasswordHasher)),
    __metadata("design:paramtypes", [Object, Object, Object])
], RestaurantRegistrationService);
