"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryRoutes = void 0;
// Imports
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const authGuard_1 = __importDefault(require("../../middlewares/authGuard"));
const category_controller_1 = require("./category.controller");
// Express router
const router = express_1.default.Router();
// API Endpoints
router.get('/:id', (0, authGuard_1.default)(user_1.ENUM_USER_ROLES.ADMIN), category_controller_1.CategoryController.getSingleCategory);
router.get('/', (0, authGuard_1.default)(user_1.ENUM_USER_ROLES.ADMIN), category_controller_1.CategoryController.getAllCategories);
router.post('/create-category', (0, authGuard_1.default)(user_1.ENUM_USER_ROLES.ADMIN), category_controller_1.CategoryController.createCategory);
router.patch('/:id', (0, authGuard_1.default)(user_1.ENUM_USER_ROLES.ADMIN), category_controller_1.CategoryController.updateSingleCategory);
router.delete('/:id', (0, authGuard_1.default)(user_1.ENUM_USER_ROLES.ADMIN), category_controller_1.CategoryController.deleteSingleCategory);
exports.CategoryRoutes = router;
