import mongoose, { Schema } from "mongoose";
const MenuItemSchema = new Schema({
    nombre: { type: String, required: true },
    descripcion: { type: String, required: true },
    precio: { type: Number, required: true },
});
const MenuSchema = new Schema({
    tipo: { type: String, enum: ["Comida", "Bebidas", "Postres"], required: true },
    items: [MenuItemSchema],
    restaurante: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant", required: true },
});
const Menu = mongoose.model("Menu", MenuSchema);
export default Menu;
