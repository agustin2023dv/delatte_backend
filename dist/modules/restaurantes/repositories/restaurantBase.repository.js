"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.RestaurantBaseRepository = void 0;
const inversify_1 = require("inversify");
const Restaurant_model_1 = __importDefault(require("../models/Restaurant.model"));
let RestaurantBaseRepository = class RestaurantBaseRepository {
    async getAll() {
        return await Restaurant_model_1.default.find().lean();
    }
    async findById(id) {
        const restaurant = await Restaurant_model_1.default.findById(id);
        if (!restaurant)
            throw new Error("Restaurante no encontrado");
        return restaurant;
    }
    async findByManagerId(managerId) {
        return await Restaurant_model_1.default.find({ managerPrincipal: managerId });
    }
    async create(restaurantData) {
        const newRestaurant = new Restaurant_model_1.default(restaurantData);
        return await newRestaurant.save();
    }
    async update(id, newRestaurantData) {
        const updatedRestaurant = await Restaurant_model_1.default.findByIdAndUpdate(id, newRestaurantData, { new: true });
        if (!updatedRestaurant)
            throw new Error("No se pudo actualizar el restaurante, no existe");
        return updatedRestaurant;
    }
};
exports.RestaurantBaseRepository = RestaurantBaseRepository;
exports.RestaurantBaseRepository = RestaurantBaseRepository = __decorate([
    (0, inversify_1.injectable)()
], RestaurantBaseRepository);
