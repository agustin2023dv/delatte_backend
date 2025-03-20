import { ContainerModule, interfaces } from "inversify";
import { MENUS_BASE_TYPES } from "../types/menuBase.types";
import { IMenuBaseRepository } from "../interfaces/IMenuBaseRepository";
import { IMenuBaseService } from "../interfaces/IMenuBaseService";
import { MenuBaseRepository } from "../repositories/menuBase.repository";
import { MenuBaseService } from "../services/menuBase.service";



export const menuBaseModule = new ContainerModule((bind) => {
bind<IMenuBaseRepository>(MENUS_BASE_TYPES.IMenuBaseRepository).to(MenuBaseRepository);
bind<IMenuBaseService>(MENUS_BASE_TYPES.IMenuBaseService).to(MenuBaseService);
})