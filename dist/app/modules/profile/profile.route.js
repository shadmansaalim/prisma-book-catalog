"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRoutes = void 0;
// Imports
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const authGuard_1 = __importDefault(require("../../middlewares/authGuard"));
const profile_controller_1 = require("./profile.controller");
// Express router
const router = express_1.default.Router();
// API Endpoints
router.get('/', (0, authGuard_1.default)(user_1.ENUM_USER_ROLES.CUSTOMER, user_1.ENUM_USER_ROLES.ADMIN), profile_controller_1.ProfileController.getProfile);
exports.ProfileRoutes = router;
