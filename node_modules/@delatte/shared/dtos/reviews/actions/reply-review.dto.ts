/**
 * DTO para responder a una review (usado por el manager del restaurante o superadmin).
 */
export interface IReplyReviewDTO {
    /**
     * ID del usuario que responde (manager o admin).
     */
    usuarioId: string;
  
    /**
     * Mensaje de respuesta (máximo 500 caracteres).
     */
    mensaje: string;
  }
  