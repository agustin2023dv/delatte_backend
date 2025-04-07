/**
 * Servicio `GoogleApiService`
 *
 * Encapsula la lógica de integración con la API de Google OAuth 2.0
 * para obtener el perfil del usuario autenticado mediante access token.
 *
 * ✔️ Verifica la validez del access token
 * ✔️ Obtiene los datos del perfil (email, nombre, foto)
 * ✔️ Estandariza la respuesta para uso interno
 *
 * Este servicio es consumido por `UserLoginService` para login/signup con Google.
 */

// 🔧 Decorador de Inversify para inyección de dependencias
import { injectable } from "inversify";

// 🌐 Cliente HTTP para llamadas externas
import fetch from "node-fetch";

// 📦 Tipo con la estructura esperada de la respuesta de Google
type GoogleUserResponse = {
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
};

/**
 * Servicio que gestiona la verificación de access tokens de Google
 * y extrae los datos del perfil del usuario autenticado.
 */
@injectable()
export class GoogleApiService {
  /**
   * Verifica el access token con Google y devuelve los datos del usuario.
   *
   * @param accessToken Token de Google recibido desde frontend
   * @returns Datos del perfil del usuario (nombre, email, foto, etc.)
   * @throws Si el token es inválido o la respuesta es incompleta
   */
  async verifyAccessToken(accessToken: string): Promise<GoogleUserResponse> {
    // 📡 Solicita los datos del usuario autenticado a la API de Google
    const response = await fetch("https://www.googleapis.com/oauth2/v3/userinfo", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    // 🚫 Valida que la respuesta sea exitosa
    if (!response.ok) {
      throw new Error("Token de Google inválido o expirado");
    }

    // ✅ Parsea la respuesta y asegura que tenga los campos requeridos
    const user = (await response.json()) as GoogleUserResponse;

    if (!user.email || !user.given_name || !user.family_name) {
      throw new Error("No se pudo obtener la información del usuario desde Google");
    }

    return user;
  }
}
