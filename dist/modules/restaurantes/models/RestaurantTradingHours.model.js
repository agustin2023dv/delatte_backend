"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const interfaces_1 = require("@delatte/shared/interfaces");
const RestaurantTradingHoursSchema = new mongoose_1.Schema({
    horarios: [
        {
            dia: { type: String, enum: Object.values(interfaces_1.DiasSemana), required: true },
            horaApertura: { type: String, required: true },
            horaCierre: { type: String, required: true },
        },
    ],
});
exports.default = RestaurantTradingHoursSchema;
