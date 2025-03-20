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
exports.RestaurantBaseService = void 0;
const inversify_1 = require("inversify");
const restaurantBase_types_1 = require("../types/restaurantBase.types");
const geolocation_service_1 = require("../../integrations/services/geolocation.service");
let RestaurantBaseService = class RestaurantBaseService {
    restaurantRepo;
    constructor(restaurantRepo) {
        this.restaurantRepo = restaurantRepo;
    }
    async getAllRestaurants() {
        return await this.restaurantRepo.getAll();
    }
    async getRestaurantById(restaurantId) {
        return await this.restaurantRepo.findById(restaurantId);
    }
    async getRestaurantsByManagerId(managerId) {
        return await this.restaurantRepo.findByManagerId(managerId);
    }
    async updateRestaurant(id, newRestaurantData) {
        return await this.restaurantRepo.update(id, newRestaurantData);
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
            return await this.restaurantRepo.create(restaurantData);
        }
        catch (error) {
            console.error("Error al registrar restaurante:", error);
            throw error;
        }
    }
};
exports.RestaurantBaseService = RestaurantBaseService;
exports.RestaurantBaseService = RestaurantBaseService = __decorate([
    (0, inversify_1.injectable)(),
    __param(0, (0, inversify_1.inject)(restaurantBase_types_1.RESTAURANT_BASE_TYPES.IRestaurantRepository)),
    __metadata("design:paramtypes", [Object])
], RestaurantBaseService);
