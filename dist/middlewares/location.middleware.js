// Middleware para validar los parámetros de ubicación
export const validateLocationParams = (req, res, next) => {
    try {
        const { lat, lng, radius } = req.query;
        if (!lat || !lng || !radius) {
            res.status(400).json({ message: "Latitud, longitud y radio son requeridos" });
            return;
        }
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);
        const searchRadius = parseFloat(radius);
        if (isNaN(latitude) || isNaN(longitude) || isNaN(searchRadius) || searchRadius <= 0) {
            res.status(400).json({
                message: "Latitud, longitud y radio deben ser números válidos y el radio debe ser mayor a 0",
            });
            return;
        }
        next();
    }
    catch (error) {
        console.error("Error en validateLocationParams:", error);
        res.status(500).json({ message: "Error interno del servidor", error });
    }
};
