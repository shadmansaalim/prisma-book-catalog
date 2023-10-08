"use strict";
/* eslint-disable no-console */
/* eslint-disable no-unused-expressions */
/* eslint-disable no-unused-vars */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const config_1 = __importDefault(require("../../config"));
const handleClientError_1 = __importDefault(require("../../errors/handleClientError"));
const handleValidationError_1 = __importDefault(require("../../errors/handleValidationError"));
const handleZodError_1 = __importDefault(require("../../errors/handleZodError"));
// Initializing defaults
let statusCode = http_status_1.default.INTERNAL_SERVER_ERROR;
let message = 'Something went wrong!';
let errorMessages = [];
// Handling different type of errors
// eslint-disable-next-line  @typescript-eslint/no-explicit-any
const errorLists = {
    PrismaClientValidationError: function (error) {
        const formattedError = (0, handleValidationError_1.default)(error);
        // Destructuring
        ({ statusCode, message, errorMessages } = formattedError);
    },
    ZodError: function (error) {
        const formattedError = (0, handleZodError_1.default)(error);
        // Destructuring
        ({ statusCode, message, errorMessages } = formattedError);
    },
    ApiError: function (error) {
        statusCode = error === null || error === void 0 ? void 0 : error.statusCode;
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message) ? [{ path: '', message: message }] : [];
    },
    PrismaClientKnownRequestError: function (error) {
        const formattedError = (0, handleClientError_1.default)(error);
        // Destructuring
        ({ statusCode, message, errorMessages } = formattedError);
    },
};
// Global Error Handler Function to create a specified format for different type of errors
const globalErrorHandler = (error, req, res, next) => {
    // Consoling on development or else logging the errors
    config_1.default.env === 'development'
        ? console.log('Global Error Handler : ', error)
        : console.error('globalErrorHandler ~ ', error);
    // Checked whether error type is in our Error Handler Object otherwise handled as generic error
    if (Object.hasOwnProperty.call(errorLists, error.constructor.name)) {
        // Calling the function from the object to handle the error after evaluating type
        errorLists[error.constructor.name](error);
    }
    else {
        message = error === null || error === void 0 ? void 0 : error.message;
        errorMessages = (error === null || error === void 0 ? void 0 : error.message) ? [{ path: '', message: message }] : [];
    }
    res.status(statusCode).json({
        success: false,
        message: message,
        errorMessages: errorMessages,
        stack: config_1.default.env !== 'production' ? error === null || error === void 0 ? void 0 : error.stack : null,
    });
};
exports.default = globalErrorHandler;
