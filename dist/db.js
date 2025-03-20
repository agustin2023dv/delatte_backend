"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectDB = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv = __importStar(require("dotenv"));
// Configurar dotenv con el path correcto
//dotenv.config({ path: path.resolve(__dirname, '../backend/.env') });}
dotenv.config();
console.log('MONGODB_URI desde .env:', process.env.MONGODB_URI);
const MONGODB_URI = process.env.MONGODB_URI || '';
if (!MONGODB_URI) {
    console.error('No se ha proporcionado la URI de MongoDB en las variables de entorno');
    process.exit(1); // Terminar la ejecución si no se proporciona la URI de MongoDB
}
const connectDB = async () => {
    try {
        await mongoose_1.default.connect(MONGODB_URI); // Intentar conectarse a MongoDB
        console.log('Conectado a MongoDB');
    }
    catch (error) {
        console.error('Error conectándose a MongoDB:', error);
        process.exit(1); // Terminar la ejecución si ocurre un error en la conexión
    }
};
exports.connectDB = connectDB;
