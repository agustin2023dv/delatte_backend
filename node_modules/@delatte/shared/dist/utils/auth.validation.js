"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateRestaurantPostCode = exports.validateRestaurantAddress = exports.validateRestaurantName = exports.validateConfirmPassword = exports.validatePassword = exports.validateEmail = exports.validateApellido = exports.validateNombre = void 0;
// Validar que el nombre solo contenga letras y espacios
const validateNombre = (nombre) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!nombre)
        return "El nombre es requerido";
    if (!nameRegex.test(nombre))
        return "El nombre solo puede contener letras y espacios";
    if (nombre.length < 2)
        return "El nombre debe tener al menos 2 caracteres";
    return null;
};
exports.validateNombre = validateNombre;
//****/
// Validar que el apellido solo contenga letras y espacios
const validateApellido = (apellido) => {
    const nameRegex = /^[a-zA-Z\s]+$/;
    if (!apellido)
        return "El apellido es requerido";
    if (!nameRegex.test(apellido))
        return "El apellido solo puede contener letras y espacios";
    if (apellido.length < 2)
        return "El apellido debe tener al menos 2 caracteres";
    return null;
};
exports.validateApellido = validateApellido;
// Validar el formato del correo electrónico
const validateEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!email)
        return "El correo es requerido";
    if (!emailRegex.test(email))
        return "El correo no es válido";
    return null;
};
exports.validateEmail = validateEmail;
// Validar la contraseña
const validatePassword = (password) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{7,}$/;
    if (!password)
        return "La contraseña es requerida";
    if (!passwordRegex.test(password))
        return "La contraseña debe tener al menos 7 caracteres, incluyendo una mayúscula, una minúscula, un número y un símbolo";
    return null;
};
exports.validatePassword = validatePassword;
// Validar la confirmación de la contraseña
const validateConfirmPassword = (password, cPassword) => {
    if (!cPassword)
        return "Confirma la contraseña";
    if (password !== cPassword)
        return "Las contraseñas no coinciden";
    return null;
};
exports.validateConfirmPassword = validateConfirmPassword;
// Validar nombre del restaurante
const validateRestaurantName = (restaurantName) => {
    const nameRegex = /^[a-zA-Z0-9\s]+$/; // Permitir letras, números y espacios
    if (!restaurantName)
        return "El nombre del restaurante es requerido";
    if (!nameRegex.test(restaurantName))
        return "El nombre del restaurante solo puede contener letras, números y espacios";
    if (restaurantName.length < 3)
        return "El nombre del restaurante debe tener al menos 3 caracteres";
    return null;
};
exports.validateRestaurantName = validateRestaurantName;
// Validar direccion del restaurante
const validateRestaurantAddress = (address) => {
    if (!address)
        return "La dirección del restaurante es requerida";
    if (address.length < 7)
        return "La dirección del restaurante debe tener al menos 7 caracteres";
    return null;
};
exports.validateRestaurantAddress = validateRestaurantAddress;
// Validar codigo postal del restaurante
const validateRestaurantPostCode = (address) => {
    if (!address)
        return "El codigo postal del restaurante es requerido";
    if (address.length != 5)
        return "La dirección del restaurante debe tener 5 caracteres";
    return null;
};
exports.validateRestaurantPostCode = validateRestaurantPostCode;
