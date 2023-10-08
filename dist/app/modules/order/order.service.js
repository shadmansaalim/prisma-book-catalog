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
exports.OrderService = void 0;
const getAllDocuments_1 = __importDefault(require("../../../shared/getAllDocuments"));
const prisma_1 = __importDefault(require("../../../shared/prisma"));
const order_constant_1 = require("./order.constant");
// Create Order Function
const createOrder = (authUserId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    return yield prisma_1.default.order.create({
        data: {
            userId: authUserId,
            orderedBooks: payload,
        },
        include: {
            user: true,
        },
    });
});
// GET All Orders
const getAllOrders = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    // Getting all orders
    const { page, limit, total, result } = yield (0, getAllDocuments_1.default)(filters, paginationOptions, order_constant_1.OrderConstants.searchableFields, prisma_1.default.order, order_constant_1.OrderConstants.fieldsToInclude, order_constant_1.OrderConstants.relationalFields, order_constant_1.OrderConstants.relationalFieldsMapper);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
// GET Single Order Function
const getSingleOrder = (orderId, userId) => __awaiter(void 0, void 0, void 0, function* () {
    // Searching conditions
    const whereConditions = userId ? { id: orderId, userId } : { id: orderId };
    return yield prisma_1.default.order.findUnique({
        where: whereConditions,
    });
});
exports.OrderService = {
    createOrder,
    getAllOrders,
    getSingleOrder,
};
