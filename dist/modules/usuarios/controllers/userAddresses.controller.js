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
exports.UserAddressController = void 0;
const inversify_1 = require("inversify");
const inversify_express_utils_1 = require("inversify-express-utils");
const userAddresses_service_1 = require("../services/userAddresses.service");
const userAddresses_types_1 = require("../types/userAddresses.types");
let UserAddressController = class UserAddressController {
    userAddressService;
    constructor(userAddressService) {
        this.userAddressService = userAddressService;
    }
    async getUserAddresses(req, res) {
        try {
            if (!req.userId) {
                res.status(401).json({ message: "Usuario no autenticado" });
                return;
            }
            const addresses = await this.userAddressService.getUserAddresses(req.userId);
            res.json(addresses);
        }
        catch (error) {
            console.error("Error en getUserAddresses:", error);
            res.status(500).json({ message: error.message });
        }
    }
    async addAddress(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({ message: "Usuario no autenticado" });
                return;
            }
            const { address } = req.body;
            const updatedAddresses = await this.userAddressService.addAddress(req.user.id, address);
            res.status(201).json(updatedAddresses);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
    async removeAddress(req, res) {
        try {
            if (!req.user) {
                res.status(401).json({ message: "Usuario no autenticado" });
                return;
            }
            const { address } = req.body;
            const updatedAddresses = await this.userAddressService.removeAddress(req.user.id, address);
            res.status(200).json(updatedAddresses);
        }
        catch (error) {
            res.status(500).json({ message: error.message });
        }
    }
};
exports.UserAddressController = UserAddressController;
__decorate([
    (0, inversify_express_utils_1.httpGet)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserAddressController.prototype, "getUserAddresses", null);
__decorate([
    (0, inversify_express_utils_1.httpPost)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserAddressController.prototype, "addAddress", null);
__decorate([
    (0, inversify_express_utils_1.httpDelete)("/"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], UserAddressController.prototype, "removeAddress", null);
exports.UserAddressController = UserAddressController = __decorate([
    (0, inversify_express_utils_1.controller)("/user/addresses"),
    __param(0, (0, inversify_1.inject)(userAddresses_types_1.USER_ADDRESSES_TYPES.UserAddressService)),
    __metadata("design:paramtypes", [userAddresses_service_1.UserAddressService])
], UserAddressController);
