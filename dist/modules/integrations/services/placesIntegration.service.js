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
exports.PlacesIntegrationService = void 0;
const axios_1 = __importDefault(require("axios"));
const inversify_1 = require("inversify");
let PlacesIntegrationService = class PlacesIntegrationService {
    API_KEY = process.env.GEOCODING_API_KEY;
    BASE_URL = 'https://api.distancematrix.ai/maps/api/place/nearbysearch/json';
    async getPlacesNearby(lat, lng, radius) {
        try {
            if (!this.API_KEY) {
                throw new Error("API Key no configurada en el entorno.");
            }
            const response = await axios_1.default.get(this.BASE_URL, {
                params: {
                    location: `${lat},${lng}`,
                    radius,
                    key: this.API_KEY
                }
            });
            return response.data.results || [];
        }
        catch (error) {
            console.error("Error al obtener lugares cercanos:", error);
            throw new Error("No se pudieron obtener los lugares cercanos.");
        }
    }
};
exports.PlacesIntegrationService = PlacesIntegrationService;
exports.PlacesIntegrationService = PlacesIntegrationService = __decorate([
    (0, inversify_1.injectable)()
], PlacesIntegrationService);
