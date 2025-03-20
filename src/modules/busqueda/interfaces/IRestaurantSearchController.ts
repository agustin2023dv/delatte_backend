import { Request, Response } from "express";

export interface IRestaurantSearchController {
  searchByName(req: Request, res: Response): Promise<void>;
}
