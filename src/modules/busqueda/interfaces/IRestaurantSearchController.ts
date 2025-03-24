import { ISearchRestaurantsByNameDTO } from "@delatte/shared/dtos";
import { Request, Response } from "express";

export interface IRestaurantSearchController {
  searchRestaurantByName(params: ISearchRestaurantsByNameDTO): Promise<any>;
}
