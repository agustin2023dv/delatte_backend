import { IRestaurant } from '@delatte/shared/interfaces/Restaurant/IRestaurant';
import mongoose, { Schema, Model, Types } from 'mongoose';
import { BaseRestaurantModel } from './RestaurantBase';
import RestaurantCapacitySchema from './RestaurantCapacity.model';
import RestaurantTradingHoursSchema from './RestaurantTradingHours.model';

const RestaurantSchema: Schema = new Schema({
  ...BaseRestaurantModel.baseSchema.obj,
  capacity: RestaurantCapacitySchema.obj,
  tradingHours: RestaurantTradingHoursSchema.obj,
  menus: [{ type: Types.ObjectId, ref: 'Menu', required: true }],
  management: {
    managerPrincipal: { type: Types.ObjectId, ref: 'User', required: true },
    coManagers: [{ type: Types.ObjectId, ref: 'User', default: [] }],
  },
  media: {
    logo: { type: String },
    galeriaFotos: { type: [String], default: [] },
  },
  tags: [{ type: String, default: [] }],
});

const Restaurant: Model<IRestaurant> = mongoose.model<IRestaurant>(
  'Restaurant',
  RestaurantSchema,
  'restaurantes'
);

export default Restaurant;
