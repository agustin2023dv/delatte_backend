/**
 * DTO para actualizar un ítem existente dentro de un menú.
 */
export interface IUpdateMenuItemDTO {
    /**
     * ID del menú que contiene el ítem.
     */
    menuId: string;
  
    /**
     * ID del ítem a actualizar.
     */
    itemId: string;
  
    /**
     * Nuevos datos del ítem.
     */
    item: {
      nombre: string;
      descripcion: string;
      precio: number;
    };
  }
  