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
exports.CategoryController = void 0;
const http_status_1 = __importDefault(require("http-status"));
const pagination_1 = require("../../../constants/pagination");
const catchAsync_1 = __importDefault(require("../../../shared/catchAsync"));
const pick_1 = __importDefault(require("../../../shared/pick"));
const sendResponse_1 = __importDefault(require("../../../shared/sendResponse"));
const category_constant_1 = require("./category.constant");
const category_service_1 = require("./category.service");
// Function that works when create category POST API hits
const createCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield category_service_1.CategoryService.createCategory(req.body);
    // Sending API Response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Category created successfully.',
        data: result,
    });
}));
// Function to GET All Categories
const getAllCategories = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Making a filter options object
    const filters = (0, pick_1.default)(req.query, category_constant_1.CategoryConstants.filterableFields);
    // Making a pagination options object
    const paginationOptions = (0, pick_1.default)(req.query, pagination_1.PaginationConstants.fields);
    // Getting all categories based on request
    const result = yield category_service_1.CategoryService.getAllCategories(filters, paginationOptions);
    // Sending API Response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Categories retrieved successfully',
        meta: result === null || result === void 0 ? void 0 : result.meta,
        data: result === null || result === void 0 ? void 0 : result.data,
    });
}));
// Function to GET Single category
const getSingleCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Getting category id from params
    const id = req.params.id;
    const result = yield category_service_1.CategoryService.getSingleCategory(id);
    // Sending API Response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Single Category retrieved successfully.',
        data: result,
    });
}));
// Function to update category
const updateSingleCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Getting category id from params
    const id = req.params.id;
    // Getting updated data
    const updatedData = req.body;
    const result = yield category_service_1.CategoryService.updateSingleCategory(id, updatedData);
    // Sending API Response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Category updated successfully',
        data: result,
    });
}));
// Function to delete category
const deleteSingleCategory = (0, catchAsync_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Getting category id from params
    const id = req.params.id;
    const result = yield category_service_1.CategoryService.deleteSingleCategory(id);
    // Sending API Response
    (0, sendResponse_1.default)(res, {
        statusCode: http_status_1.default.OK,
        success: true,
        message: 'Category deleted successfully.',
        data: result,
    });
}));
exports.CategoryController = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateSingleCategory,
    deleteSingleCategory,
};
