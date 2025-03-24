/**
 * DTO para eliminar un ítem de un menú.
 */
export interface IRemoveMenuItemDTO {
    /**
     * ID del menú.
     */
    menuId: string;
  
    /**
     * ID del ítem a eliminar.
     */
    itemId: string;
  }
  