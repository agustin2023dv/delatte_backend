import { IRestaurant } from '@delatte/shared/interfaces/Restaurant/IRestaurant';
import mongoose, { Schema, Model, Types } from 'mongoose';
import { BaseRestaurantModel } from './RestaurantBase';
import RestaurantCapacitySchema from './RestaurantCapacity.model';
import RestaurantTradingHoursSchema from './RestaurantTradingHours.model';

const RestaurantSchema: Schema = new Schema({
  ...BaseRestaurantModel.baseSchema.obj,
  capacity: RestaurantCapacitySchema.obj,
  tradingHours: RestaurantTradingHoursSchema.obj,

  operationalData: {
    status: {
      estaAbierto: { type: Boolean, required: true, default: false },
      estaTemporalmenteCerrado: { type: Boolean, required: true, default: false },
    },
    stats: {
      reservas: {
        totalReservas: { type: Number, required: true, default: 0 },
      },
      reviews: {
        calificacion: { type: Number, required: true, default: 0 },
        totalReviews: { type: Number, required: true, default: 0 },
      },
    },
  },

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
