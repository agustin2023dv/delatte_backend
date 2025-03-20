"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const RestaurantCapacitySchema = new mongoose_1.Schema({
    capacidadMesas: [
        {
            cantidad: { type: Number, required: true },
            personasPorMesa: { type: Number, required: true },
        },
    ],
});
exports.default = RestaurantCapacitySchema;
