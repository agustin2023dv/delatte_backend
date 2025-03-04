"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateReviewUpdate = exports.validateReview = void 0;
const express_validator_1 = require("express-validator");
const sanitize_html_1 = __importDefault(require("sanitize-html"));
// Middleware de validación para la creación de reviews
exports.validateReview = [
    (0, express_validator_1.body)('calificacion')
        .isInt({ min: 1, max: 5 })
        .withMessage('La calificación debe ser un número entre 1 y 5')
        .toInt(),
    (0, express_validator_1.body)('comentario')
        .isString()
        .trim()
        .escape()
        .customSanitizer((value) => (0, sanitize_html_1.default)(value, { allowedTags: [], allowedAttributes: {} }))
        .isLength({ min: 5 })
        .withMessage('El comentario debe tener al menos 5 caracteres'),
];
// Middleware de validación para la edición de reviews
exports.validateReviewUpdate = [
    (0, express_validator_1.body)('calificacion')
        .optional()
        .isInt({ min: 1, max: 5 })
        .withMessage('La calificación debe ser un número entre 1 y 5')
        .toInt(),
    (0, express_validator_1.body)('comentario')
        .optional()
        .isString()
        .trim()
        .escape()
        .isLength({ min: 5 })
        .withMessage('El comentario debe tener al menos 5 caracteres'),
];
