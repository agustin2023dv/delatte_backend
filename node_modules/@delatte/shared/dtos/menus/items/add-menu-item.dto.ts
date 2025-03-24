/**
 * DTO para agregar un ítem al menú.
 */
export interface IAddMenuItemDTO {
    /**
     * ID del menú al que se agregará el ítem.
     */
    menuId: string;
  
    /**
     * Detalles del ítem a agregar.
     */
    item: {
      nombre: string;
      descripcion: string;
      precio: number;
    };
  }
  