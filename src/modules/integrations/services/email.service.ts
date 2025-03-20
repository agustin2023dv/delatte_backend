import { injectable } from "inversify";
import { EmailOptions } from "@delatte/shared/interfaces";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

@injectable()
export class EmailService {
  private transporter = nodemailer.createTransport({
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
      } else {
        console.log("El transporter de Nodemailer está listo para enviar correos", success);
      }
    });
  }

  async sendEmail(options: EmailOptions) {
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
    } catch (error) {
      console.error("Error al enviar correo:", error);
      throw error;
    }
  }

  async sendVerificationEmail(nombre: string, email: string, emailToken: string) {
    const verificationLink = `http://localhost:8081/api/users/verify-email?token=${emailToken}`;

    try {
      await this.sendEmail({
        to: email,
        subject: "Verifica tu email",
        text: `Hola ${nombre},\n\nPor favor verifica tu cuenta haciendo clic en el siguiente enlace: ${verificationLink}`,
        html: `<h1>Hola ${nombre}!</h1><p>Por favor verifica tu cuenta haciendo clic en el siguiente enlace:</p><a href="${verificationLink}">Verificar Email</a>`,
      });
    } catch (error) {
      console.error("Error al enviar el correo de verificación:", error);
      throw new Error("Error al enviar el correo de verificación");
    }
  }
}
