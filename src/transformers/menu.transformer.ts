import { IMenuResponseDTO } from "@delatte/shared/dtos";

export class MenuTransformer {
    static toMenuResponseDTO(menu: any): IMenuResponseDTO {
      return {
        _id: menu._id.toString(),
        tipo: menu.tipo,
        items: menu.items,
        restaurante: {
          _id: (menu.restaurante as any)._id.toString(),
          nombre: (menu.restaurante as any).nombre,
          direccion: (menu.restaurante as any).direccion,
        },
      };
    }
  }