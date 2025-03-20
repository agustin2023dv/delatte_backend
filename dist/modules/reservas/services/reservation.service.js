"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelReservationService = exports.updateReservationService = exports.getReservationsByIdService = exports.getReservationsByRestaurantService = exports.getReservationsByUserService = exports.getAllReservationsService = exports.getReservationByIdService = exports.createSuperadminReservationService = exports.createManagerReservationService = exports.createCustomerReservationService = void 0;
const reservation_repository_1 = require("../repositories/reservation.repository");
const mongoose_1 = require("mongoose");
const toObjectId = (id) => new mongoose_1.Types.ObjectId(id);
/**
 * Crea una reserva como cliente (customer)
 */
const createCustomerReservationService = async (userId, restauranteId, fecha, horario, numAdultos, numNinos, pedidosEspeciales) => {
    if (!(await reservation_repository_1.ReservationRepository.restaurantExists(restauranteId))) {
        throw new Error("Restaurante no encontrado");
    }
    return await reservation_repository_1.ReservationRepository.createReservation({
        usuario: toObjectId(userId),
        restaurante: toObjectId(restauranteId),
        fecha,
        horario,
        numAdultos,
        numNinos,
        pedidosEspeciales,
        estado: "Confirmada",
    });
};
exports.createCustomerReservationService = createCustomerReservationService;
/**
 * Crea una reserva como manager (para clientes)
 */
const createManagerReservationService = async (managerId, clienteId, restauranteId, fecha, horario, numAdultos, numNinos, pedidosEspeciales) => {
    const restaurant = await reservation_repository_1.ReservationRepository.restaurantExists(restauranteId);
    if (!restaurant) {
        throw new Error("Restaurante no encontrado");
    }
    const isManager = restaurant.managerPrincipal.toString() === managerId;
    const isCoManager = restaurant.coManagers.some((coManager) => coManager.toString() === managerId);
    if (!isManager && !isCoManager) {
        throw new Error("No puedes crear reservas en un restaurante que no administras");
    }
    return await reservation_repository_1.ReservationRepository.createReservation({
        usuario: toObjectId(clienteId),
        restaurante: toObjectId(restauranteId),
        fecha,
        horario,
        numAdultos,
        numNinos,
        pedidosEspeciales,
        estado: "Confirmada",
    });
};
exports.createManagerReservationService = createManagerReservationService;
/**
 * Crea una reserva como superadmin (puede forzar reservas)
 */
const createSuperadminReservationService = async (clienteId, restauranteId, fecha, horario, numAdultos, numNinos, pedidosEspeciales) => {
    return await reservation_repository_1.ReservationRepository.createReservation({
        usuario: toObjectId(clienteId),
        restaurante: toObjectId(restauranteId),
        fecha,
        horario,
        numAdultos,
        numNinos,
        pedidosEspeciales,
        estado: "Confirmada",
    });
};
exports.createSuperadminReservationService = createSuperadminReservationService;
// 📌 Obtener una reserva por ID
const getReservationByIdService = async (id) => {
    return await reservation_repository_1.ReservationRepository.getReservationById(id);
};
exports.getReservationByIdService = getReservationByIdService;
// 📌 Obtener todas las reservas (solo superadmins)
const getAllReservationsService = async () => {
    return await reservation_repository_1.ReservationRepository.getAllReservations();
};
exports.getAllReservationsService = getAllReservationsService;
// 📌 Obtener reservas de un usuario
const getReservationsByUserService = async (userId) => {
    return await reservation_repository_1.ReservationRepository.getReservationsByUser(userId);
};
exports.getReservationsByUserService = getReservationsByUserService;
// 📌 Obtener reservas de un restaurante
const getReservationsByRestaurantService = async (restaurantId) => {
    return await reservation_repository_1.ReservationRepository.getReservationsByRestaurant(restaurantId);
};
exports.getReservationsByRestaurantService = getReservationsByRestaurantService;
// 📌 Obtener reservas según el rol del usuario
const getReservationsByIdService = async (userId, role) => {
    return await reservation_repository_1.ReservationRepository.getReservationsByRole(userId, role);
};
exports.getReservationsByIdService = getReservationsByIdService;
// 📌 Actualizar una reserva
const updateReservationService = async (reservationId, updatedData) => {
    return await reservation_repository_1.ReservationRepository.updateReservation(reservationId, updatedData);
};
exports.updateReservationService = updateReservationService;
// 📌 Cancelar una reserva
const cancelReservationService = async (reservationId) => {
    return await reservation_repository_1.ReservationRepository.cancelReservation(reservationId);
};
exports.cancelReservationService = cancelReservationService;
