"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRoutes = void 0;
// Imports
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("./auth.controller");
// Express router
const router = express_1.default.Router();
// API Endpoints
router.post('/signup', auth_controller_1.AuthController.signUpUser);
router.post('/signin', auth_controller_1.AuthController.signInUser);
exports.AuthRoutes = router;
