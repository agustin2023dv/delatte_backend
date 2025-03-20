import { Schema } from 'mongoose';

const RestaurantCapacitySchema = new Schema({
  capacidadMesas: [
    {
      cantidad: { type: Number, required: true },
      personasPorMesa: { type: Number, required: true },
    },
  ],
});

export default RestaurantCapacitySchema;
