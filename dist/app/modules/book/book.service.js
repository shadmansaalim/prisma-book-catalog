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
exports.BookService = void 0;
const getAllDocuments_1 = __importDefault(require("../../../shared/getAllDocuments"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const book_constant_1 = require("./book.constant");
// Create Book Function
const createBook = (data) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.book.create({
        data,
        include: {
            category: true,
        },
    });
});
// GET All Books Function
const getAllBooks = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Converting strings to float
    if (filters === null || filters === void 0 ? void 0 : filters.minPrice) {
        filters.minPrice = parseFloat(filters.minPrice);
    }
    if (filters === null || filters === void 0 ? void 0 : filters.maxPrice) {
        filters.maxPrice = parseFloat(filters.maxPrice);
    }
    // Getting all books
    const { page, limit, total, totalPage, result } = yield (0, getAllDocuments_1.default)(filters, paginationOptions, book_constant_1.BookConstants.searchableFields, prisma_1.default.book, book_constant_1.BookConstants.fieldsToInclude);
    return {
        meta: {
            page,
            limit,
            total,
            totalPage,
        },
        data: result,
    };
});
// GET Single Book Function
const getSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.book.findUnique({
        where: { id },
        include: {
            category: true,
        },
    });
});
// Update Single Book Function
const updateSingleBook = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.book.update({
        where: {
            id,
        },
        data: payload,
        include: {
            category: true,
        },
    });
});
// DELETE Single Book
const deleteSingleBook = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Deleting Book
    return yield prisma_1.default.book.delete({
        where: { id },
        include: {
            category: true,
        },
    });
});
exports.BookService = {
    createBook,
    getAllBooks,
    getSingleBook,
    updateSingleBook,
    deleteSingleBook,
};
