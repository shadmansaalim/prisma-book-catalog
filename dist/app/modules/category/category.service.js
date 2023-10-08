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
exports.CategoryService = void 0;
const getAllDocuments_1 = __importDefault(require("../../../shared/getAllDocuments"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const category_constant_1 = require("./category.constant");
// Create Category Function
const createCategory = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.category.create({
        data,
    });
});
// GET All Categories Function
const getAllCategories = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Getting all categories
    const { page, limit, total, result } = yield (0, getAllDocuments_1.default)(filters, paginationOptions, category_constant_1.CategoryConstants.searchableFields, prisma_1.default.category);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// GET Single Category Function
const getSingleCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.category.findUnique({
        where: { id },
    });
});
// Update Single Category Function
const updateSingleCategory = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.category.update({
        where: {
            id,
        },
        data: payload,
    });
});
// DELETE Single Category
const deleteSingleCategory = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Deleting Category
    return yield prisma_1.default.category.delete({
        where: { id },
    });
});
exports.CategoryService = {
    createCategory,
    getAllCategories,
    getSingleCategory,
    updateSingleCategory,
    deleteSingleCategory,
};
