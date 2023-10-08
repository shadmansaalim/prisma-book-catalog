"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderRoutes = void 0;
// Imports
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const authGuard_1 = __importDefault(require("../../middlewares/authGuard"));
const order_controller_1 = require("./order.controller");
// Express router
const router = express_1.default.Router();
// API Endpoints
router.get('/:id', (0, authGuard_1.default)(user_1.ENUM_USER_ROLES.CUSTOMER, user_1.ENUM_USER_ROLES.ADMIN), order_controller_1.OrderController.getSingleOrder);
router.get('/', (0, authGuard_1.default)(user_1.ENUM_USER_ROLES.CUSTOMER, user_1.ENUM_USER_ROLES.ADMIN), order_controller_1.OrderController.getAllOrders);
router.post('/create-order', (0, authGuard_1.default)(user_1.ENUM_USER_ROLES.CUSTOMER), order_controller_1.OrderController.createOrder);
exports.OrderRoutes = router;
