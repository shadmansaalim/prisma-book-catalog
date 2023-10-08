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
exports.UserController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const user_constant_1 = require("./user.constant");
const user_service_1 = require("./user.service");
// Function to GET All Users
const getAllUsers = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Making a filter options object
    const filters = (0, pick_1.default)(req.query, user_constant_1.UserConstants.filterableFields);
    // Making a pagination options object
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.PaginationConstants.fields);
    // Getting all users based on request
    const result = yield user_service_1.UserService.getAllUsers(filters, paginationOptions);
    // Sending API Response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Users retrieved successfully',
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
// Function to GET Single User
const getSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Getting user id from params
    const id = req.params.id;
    const result = yield user_service_1.UserService.getSingleUser(id);
    // Sending API Response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single User retrieved successfully.',
        data: result,
    });
}));
// Function to update user
const updateSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Getting user id from params
    const id = req.params.id;
    // Getting updated data
    const updatedData = req.body;
    const result = yield user_service_1.UserService.updateSingleUser(id, updatedData);
    // Sending API Response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User updated successfully',
        data: result,
    });
}));
// Function to delete user
const deleteSingleUser = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Getting user id from params
    const id = req.params.id;
    const result = yield user_service_1.UserService.deleteSingleUser(id);
    // Sending API Response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'User deleted successfully.',
        data: result,
    });
}));
exports.UserController = {
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
};
