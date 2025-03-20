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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EmailService = void 0;
const inversify_1 = require("inversify");
const nodemailer_1 = __importDefault(require("nodemailer"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let EmailService = class EmailService {
    transporter = nodemailer_1.default.createTransport({
        host: process.env.SMTP_HOST || "smtp.gmail.com",
        port: parseInt(process.env.SMTP_PORT || "587"),
        secure: false,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASSWORD,
        },
    });
    constructor() {
        this.transporter.verify((error, success) => {
            if (error) {
                console.error("Error al configurar el transporter de Nodemailer:", error);
            }
            else {
                console.log("El transporter de Nodemailer está listo para enviar correos", success);
            }
        });
    }
    async sendEmail(options) {
        const mailOptions = {
            from: options.from || `"Soporte" <${process.env.SMTP_USER}>`,
            to: options.to,
            subject: options.subject,
            text: options.text,
            html: options.html,
        };
        try {
            const info = await this.transporter.sendMail(mailOptions);
            console.log("Correo enviado: %s", info.messageId);
            return info;
        }
        catch (error) {
            console.error("Error al enviar correo:", error);
            throw error;
        }
    }
    async sendVerificationEmail(nombre, email, emailToken) {
        const verificationLink = `http://localhost:8081/api/users/verify-email?token=${emailToken}`;
        try {
            await this.sendEmail({
                to: email,
                subject: "Verifica tu email",
                text: `Hola ${nombre},\n\nPor favor verifica tu cuenta haciendo clic en el siguiente enlace: ${verificationLink}`,
                html: `<h1>Hola ${nombre}!</h1><p>Por favor verifica tu cuenta haciendo clic en el siguiente enlace:</p><a href="${verificationLink}">Verificar Email</a>`,
            });
        }
        catch (error) {
            console.error("Error al enviar el correo de verificación:", error);
            throw new Error("Error al enviar el correo de verificación");
        }
    }
};
exports.EmailService = EmailService;
exports.EmailService = EmailService = __decorate([
    (0, inversify_1.injectable)(),
    __metadata("design:paramtypes", [])
], EmailService);
