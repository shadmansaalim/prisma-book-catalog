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
exports.AuthService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../../config"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const prisma_1 = __importDefault(require("../../../shared/prisma"));
// Function to sign up an user (CREATE AN ACCOUNT)
const signUpUser = (userData) => __awaiter(void 0, void 0, void 0, function* () {
    // Finding if the user already exists in our system
    const existingUser = yield prisma_1.default.user.findFirst({
        where: {
            email: userData.email,
        },
    });
    // Throwing an error if user exists
    if (existingUser) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'An user already exists in our system with provided email.');
    }
    // Hashing the user password before inserting to DB
    const hashedPassword = yield bcrypt_1.default.hash(userData === null || userData === void 0 ? void 0 : userData.password, Number(config_1.default.bcrypt_salt_rounds));
    // Setting user's password as hashed pasword
    userData.password = hashedPassword;
    return yield prisma_1.default.user.create({
        data: userData,
    });
});
// Function to sign in an user (LOGIN)
const signInUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // Finding whether user is in our system or not
    const userExists = yield prisma_1.default.user.findFirst({
        where: {
            email: payload === null || payload === void 0 ? void 0 : payload.email,
        },
    });
    // Throwing error if user does not exists
    if (!userExists) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'There is no account in our system with requested email.');
    }
    // Comparing Password
    const isPasswordMatched = yield bcrypt_1.default.compare(payload === null || payload === void 0 ? void 0 : payload.password, userExists === null || userExists === void 0 ? void 0 : userExists.password);
    // Throwing error if password does not matches
    if (!isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Incorrect Password.');
    }
    // Creating token for the user
    const token = jwtHelpers_1.JwtHelpers.createToken({ id: userExists === null || userExists === void 0 ? void 0 : userExists.id, role: userExists === null || userExists === void 0 ? void 0 : userExists.role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return { token };
});
exports.AuthService = {
    signUpUser,
    signInUser,
};
