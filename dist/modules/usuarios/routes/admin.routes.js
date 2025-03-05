"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const admin_controller_1 = require("../controllers/admin.controller");
const auth_middleware_1 = require("../../../middlewares/auth.middleware");
const role_middleware_1 = require("../../../middlewares/role.middleware");
const rateLimiter_middlware_1 = require("../../../middlewares/rateLimiter.middlware");
const router = express_1.default.Router();
router.post('/login-admin', rateLimiter_middlware_1.loginRateLimiter, admin_controller_1.loginAdminController);
router.get("/", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["superadmin"]), admin_controller_1.getUsersController);
router.patch("/:id/suspend", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["superadmin"]), admin_controller_1.suspendUserController);
router.delete("/:id", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["superadmin"]), admin_controller_1.deleteUserController);
router.get("/:id", auth_middleware_1.authMiddleware, admin_controller_1.getUserDetailsController);
router.put("/:id/update", auth_middleware_1.authMiddleware, (0, role_middleware_1.roleMiddleware)(["superadmin"]), admin_controller_1.updateUserController);
exports.default = router;
