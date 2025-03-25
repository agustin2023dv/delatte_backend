import {
    IAddMenuItemDTO,
    IRemoveMenuItemDTO,
    IUpdateMenuItemDTO,
    IMenuResponseDTO,
  } from "@delatte/shared/dtos";
  
  export interface IMenuItemService {
    addMenuItem(data: IAddMenuItemDTO): Promise<IMenuResponseDTO>;
    removeMenuItem(data: IRemoveMenuItemDTO): Promise<IMenuResponseDTO>;
    updateMenuItem(data: IUpdateMenuItemDTO): Promise<IMenuResponseDTO>;
  }
  