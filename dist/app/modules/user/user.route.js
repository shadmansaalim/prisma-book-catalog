"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
// Imports
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const authGuard_1 = __importDefault(require("../../middlewares/authGuard"));
const user_controller_1 = require("./user.controller");
// Express router
const router = express_1.default.Router();
// API Endpoints
router.get('/:id', (0, authGuard_1.default)(user_1.ENUM_USER_ROLES.ADMIN), user_controller_1.UserController.getSingleUser);
router.get('/', (0, authGuard_1.default)(user_1.ENUM_USER_ROLES.ADMIN), user_controller_1.UserController.getAllUsers);
router.patch('/:id', (0, authGuard_1.default)(user_1.ENUM_USER_ROLES.ADMIN), user_controller_1.UserController.updateSingleUser);
router.delete('/:id', (0, authGuard_1.default)(user_1.ENUM_USER_ROLES.ADMIN), user_controller_1.UserController.deleteSingleUser);
exports.UserRoutes = router;
