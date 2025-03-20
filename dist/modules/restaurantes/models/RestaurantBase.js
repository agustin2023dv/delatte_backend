"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BaseRestaurantModel = void 0;
const mongoose_1 = require("mongoose");
class BaseRestaurantModel {
    static baseSchema = new mongoose_1.Schema({
        identity: {
            nombre: { type: String, required: true },
            descripcion: { type: String },
        },
        contact: {
            telefono: { type: String },
            emailContacto: { type: String },
        },
        location: {
            ubicacion: {
                type: {
                    type: String,
                    enum: ['Point'],
                    required: true,
                },
                coordinates: {
                    type: [Number],
                    required: true,
                },
            },
            pais: { type: String, required: true },
            localidad: { type: String, required: true },
            direccion: { type: String, required: true },
            codigoPostal: { type: String },
        },
        metadata: {
            ultimaActualizacion: { type: Date, default: Date.now },
        },
        status: {
            estaAbierto: { type: Boolean, default: false },
            estaTemporalmenteCerrado: { type: Boolean, default: false },
        },
        stats: {
            totalReservas: { type: Number, default: 0 },
            calificacion: { type: Number, default: 0 },
            totalReviews: { type: Number, default: 0 },
        },
    }, { timestamps: true });
}
exports.BaseRestaurantModel = BaseRestaurantModel;
