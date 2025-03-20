import { Schema } from 'mongoose';
import { DiasSemana } from '@delatte/shared/interfaces';

const RestaurantTradingHoursSchema = new Schema({
  horarios: [
    {
      dia: { type: String, enum: Object.values(DiasSemana), required: true },
      horaApertura: { type: String, required: true },
      horaCierre: { type: String, required: true },
    },
  ],
});

export default RestaurantTradingHoursSchema;
