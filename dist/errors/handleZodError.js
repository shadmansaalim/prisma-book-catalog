"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//Imports
const http_status_1 = __importDefault(require("http-status"));
// ZOD Error handling function
const handleZodError = (error) => {
    const errors = error.issues.map((issue) => {
        return {
            path: issue === null || issue === void 0 ? void 0 : issue.path[issue.path.length - 1],
            message: issue === null || issue === void 0 ? void 0 : issue.message,
        };
    });
    const statusCode = http_status_1.default.BAD_REQUEST;
    return {
        statusCode,
        message: 'ZOD Error',
        errorMessages: errors,
    };
};
exports.default = handleZodError;
