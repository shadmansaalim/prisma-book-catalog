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
exports.UserService = void 0;
const getAllDocuments_1 = __importDefault(require("../../../shared/getAllDocuments"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const user_constant_1 = require("./user.constant");
// GET All Users Function
const getAllUsers = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Getting all rooms
    const { page, limit, total, result } = yield (0, getAllDocuments_1.default)(filters, paginationOptions, user_constant_1.UserConstants.searchableFields, prisma_1.default.user);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// GET Single User Function
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.findUnique({
        where: { id },
    });
});
// Update Single User Function
const updateSingleUser = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.user.update({
        where: {
            id,
        },
        data: payload,
    });
});
// DELETE Single User
const deleteSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    // Deleting user
    return yield prisma_1.default.user.delete({
        where: { id },
    });
});
exports.UserService = {
    getAllUsers,
    getSingleUser,
    updateSingleUser,
    deleteSingleUser,
};
