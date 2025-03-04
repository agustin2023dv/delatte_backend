"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCloudinarySignature = void 0;
const getCloudinarySignature = (type) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`http://localhost:8081/api/cloudinary/generate-signature/${type}`);
        if (!response.ok)
            throw new Error("No se pudo obtener la firma");
        return yield response.json();
    }
    catch (error) {
        console.error("Error al obtener la firma de Cloudinary:", error);
        return null;
    }
});
exports.getCloudinarySignature = getCloudinarySignature;
