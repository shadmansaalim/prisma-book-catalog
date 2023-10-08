"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const express_1 = __importDefault(require("express"));
const auth_route_1 = require("../modules/auth/auth.route");
const book_route_1 = require("../modules/book/book.route");
const category_route_1 = require("../modules/category/category.route");
const order_route_1 = require("../modules/order/order.route");
const profile_route_1 = require("../modules/profile/profile.route");
const user_route_1 = require("../modules/user/user.route");
// Express router
const router = express_1.default.Router();
// App Module Routes
const moduleRoutes = [
    { path: '/auth', route: auth_route_1.AuthRoutes },
    { path: '/users', route: user_route_1.UserRoutes },
    { path: '/categories', route: category_route_1.CategoryRoutes },
    { path: '/books', route: book_route_1.BookRoutes },
    { path: '/orders', route: order_route_1.OrderRoutes },
    { path: '/profile', route: profile_route_1.ProfileRoutes },
];
// Application Routes
moduleRoutes.forEach((moduleRoute) => {
    router.use(moduleRoute === null || moduleRoute === void 0 ? void 0 : moduleRoute.path, moduleRoute === null || moduleRoute === void 0 ? void 0 : moduleRoute.route);
});
exports.default = router;
