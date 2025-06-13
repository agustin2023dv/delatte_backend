import { IMenuResponseDTO, ICreateMenuDTO, IUpdateMenuDTO } from "@delatte/shared/dtos";

export interface IMenuBaseService {
  getMenusByRestaurant(restaurantId: string): Promise<IMenuResponseDTO[]>;
  createMenu(menuData: ICreateMenuDTO): Promise<IMenuResponseDTO>;
  updateMenu(menuId: string, updatedData: IUpdateMenuDTO): Promise<IMenuResponseDTO>;
  deleteMenu(menuId: string): Promise<IMenuResponseDTO>;
  getMenuById(menuId: string): Promise<IMenuResponseDTO>;

}
