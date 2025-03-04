import express from 'express';
import { addAddressController, getUserAddressesController, removeAddressController } 
from '../controllers/address.controller';
import { authMiddleware } from '../middlewares/auth.middleware';


const router = express.Router();

//**RUTAS PARA EL MANEJO DE ADDRESSES**//

router.get("/", authMiddleware, getUserAddressesController);
router.post("/", authMiddleware, addAddressController);
router.delete("/", authMiddleware, removeAddressController);

export default router;  