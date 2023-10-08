"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const client_1 = require("@prisma/client");
// Prisma Instance
const prisma = new client_1.PrismaClient({
    errorFormat: 'minimal',
});
exports.default = prisma;
