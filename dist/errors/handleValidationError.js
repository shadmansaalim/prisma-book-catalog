"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Prisma Validation Error handling function
const handleValidationError = (error) => {
    const errors = [
        {
            path: '',
            message: error.message,
        },
    ];
    const statusCode = 400;
    return {
        statusCode,
        message: 'Validation Error',
        errorMessages: errors,
    };
};
exports.default = handleValidationError;
