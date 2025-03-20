<<<<<<< Updated upstream
import mongoose, { Schema, Model } from 'mongoose';
import { IRestaurant } from '@delatte/shared/interfaces';

const RestaurantSchema: Schema = new Schema({
  nombre: { type: String, required: true },
  direccion: { type: String, required: true },
  pais: { type: String, required: true },
  localidad: { type: String, required: true },
  codigoPostal: { type: String }, 
  telefono: { type: String },
  emailContacto: { type: String },
  logo: { type: String },
  descripcion: { type: String },
  galeriaFotos: [{ type: String }],
  calificacion: { type: Number },
  totalReservas: { type: Number, default: 0 }, 
  totalReviews: { type: Number, default: 0 }, 
  promociones: [
    {
      titulo: String,
      descripcion: String,
      fechaInicio: Date,
      fechaFin: Date,
      descuento: Number,
    },
  ],
  estaTemporalmenteCerrado: { type: Boolean, default: false }, 
  horarios: [
    {
      dia: { type: String, enum: ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"] },
      horaApertura: { type: String },
      horaCierre: { type: String },
    },
  ],
  capacidadMesas: [
    {
      cantidad: { type: Number },
      personasPorMesa: { type: Number },
    },
  ],
  menus: [{ type: Schema.Types.ObjectId, ref: 'Menu' }],
  managerPrincipal: { type: Schema.Types.ObjectId, ref: 'User' },
  coManagers: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  estaAbierto: { type: Boolean },
  ultimaActualizacion: { type: Date },
  ubicacion: {
    type: {
      type: String,
      enum: ["Point"],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
=======
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
>>>>>>> Stashed changes
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
