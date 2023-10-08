"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookRoutes = void 0;
// Imports
const express_1 = __importDefault(require("express"));
const user_1 = require("../../../enums/user");
const authGuard_1 = __importDefault(require("../../middlewares/authGuard"));
const book_controller_1 = require("./book.controller");
// Express router
const router = express_1.default.Router();
// API Endpoints
router.get('/:id', (0, authGuard_1.default)(user_1.ENUM_USER_ROLES.ADMIN), book_controller_1.BookController.getSingleBook);
router.get('/', (0, authGuard_1.default)(user_1.ENUM_USER_ROLES.ADMIN), book_controller_1.BookController.getAllBooks);
router.post('/create-book', (0, authGuard_1.default)(user_1.ENUM_USER_ROLES.ADMIN), book_controller_1.BookController.createBook);
router.patch('/:id', (0, authGuard_1.default)(user_1.ENUM_USER_ROLES.ADMIN), book_controller_1.BookController.updateSingleBook);
router.delete('/:id', (0, authGuard_1.default)(user_1.ENUM_USER_ROLES.ADMIN), book_controller_1.BookController.deleteSingleBook);
exports.BookRoutes = router;
