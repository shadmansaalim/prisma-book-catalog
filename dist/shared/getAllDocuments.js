"use strict";
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-unused-vars */
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
// Imports
const paginationHelper_1 = require("../helpers/paginationHelper");
const getAllDocuments = (filters, paginationOptions, searchableFields, model, fieldsToInclude, relationalFields, relationalFieldsMapper) => __awaiter(void 0, void 0, void 0, function* () {
    // Destructuring ~ Searching and Filtering
    const { searchTerm } = filters, filterData = __rest(filters, ["searchTerm"]);
    // Storing all searching and filtering condition in this array
    const searchFilterConditions = [];
    // Checking if SEARCH is requested in GET API - adding find conditions
    if (searchTerm) {
        searchFilterConditions.push({
            OR: searchableFields.map(field => ({
                [field]: {
                    contains: searchTerm,
                    mode: 'insensitive',
                },
            })),
        });
    }
    // Checking if FILTER is requested in GET API - adding find conditions
    if (Object.keys(filterData).length) {
        searchFilterConditions.push({
            AND: Object.keys(filterData).map(key => {
                if (relationalFields === null || relationalFields === void 0 ? void 0 : relationalFields.includes(key)) {
                    return {
                        [relationalFieldsMapper[key]]: {
                            id: filterData[key],
                        },
                    };
                }
                else {
                    return {
                        [key]: {
                            equals: filterData[key],
                        },
                    };
                }
            }),
        });
    }
    // Destructuring ~ Pagination and Sorting
    const { page, limit, skip, sortBy, sortOrder } = paginationHelper_1.PaginationHelpers.calculatePagination(paginationOptions);
    // Default Sorting Condition
    const sortingCondition = {};
    // Adding sort condition if requested
    if (sortBy && sortOrder) {
        sortingCondition[sortBy] = sortOrder;
    }
    // Condition for finding documents
    const whereConditions = searchFilterConditions.length
        ? { AND: searchFilterConditions }
        : {};
    // Base Query object that stores the query
    const baseQuery = {
        where: whereConditions,
        skip,
        take: limit,
        orderBy: sortingCondition,
    };
    // Checking if fields needs to be populated
    if (fieldsToInclude && fieldsToInclude.length) {
        // Object that stores the fields that needs to be included
        const include = {};
        // Adding fields in the include object that needs to be added
        fieldsToInclude.forEach(field => {
            include[field] = true;
        });
        // Adding the include property to the base query
        baseQuery.include = include;
    }
    // Documents
    const result = yield model.findMany(baseQuery);
    // Total Documents in Database matching the condition
    const total = yield model.count({ where: whereConditions });
    return {
        page,
        limit,
        total,
        result,
    };
});
exports.default = getAllDocuments;
