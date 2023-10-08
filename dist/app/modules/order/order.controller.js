"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const user_1 = require("../../../enums/user");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const order_constant_1 = require("./order.constant");
const order_service_1 = require("./order.service");
// Function that works when create order POST API hits
const createOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Getting authenticated user from request
    const user = req.user;
    // Ordered books data
    const { orderedBooks } = req.body;
    const result = yield order_service_1.OrderService.createOrder(user.id, orderedBooks);
    // Sending API Response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Order created successfully.',
        data: result,
    });
}));
// Function to GET All Orders
const getAllOrders = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Getting authenticated user from request
    const user = req.user;
    // Making a filter options object
    const filters = (0, pick_1.default)(req.query, order_constant_1.OrderConstants.filterableFields);
    // Checking if user is customer or not
    if (user.role === user_1.ENUM_USER_ROLES.CUSTOMER) {
        // Adding a filter so that customer get to see his/her orders only
        filters.userId = user.id;
    }
    // Making a pagination options object
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.PaginationConstants.fields);
    // Getting all orders based on request
    const result = yield order_service_1.OrderService.getAllOrders(filters, paginationOptions);
    // Sending API Response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Orders retrieved successfully',
        meta: user.role === user_1.ENUM_USER_ROLES.ADMIN ? result === null || result === void 0 ? void 0 : result.meta : null,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
// Function to GET Single Order
const getSingleOrder = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Getting authenticated user from request
    const user = req.user;
    // Getting order id from params
    const orderId = req.params.id;
    let result = null;
    // Checking whether user is CUSTOMER OR ADMIN, for customer will show if the order belongs to them
    if (user.role === user_1.ENUM_USER_ROLES.CUSTOMER) {
        result = yield order_service_1.OrderService.getSingleOrder(orderId, user.id);
    }
    else {
        result = yield order_service_1.OrderService.getSingleOrder(orderId);
    }
    // Sending API Response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single Order retrieved successfully.',
        data: result,
    });
}));
exports.OrderController = {
    createOrder,
    getAllOrders,
    getSingleOrder,
};
