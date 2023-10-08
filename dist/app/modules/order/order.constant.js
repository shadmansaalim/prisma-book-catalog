"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderConstants = void 0;
// Searchable fields to GET orders
const searchableFields = [];
// Searching and Filtering  Fields
const filterableFields = ['searchTerm', 'id', 'status', 'userId'];
// Fields to populate in order data
const fieldsToInclude = ['user'];
const relationalFields = ['userId'];
const relationalFieldsMapper = {
    userId: 'user',
};
exports.OrderConstants = {
    searchableFields,
    filterableFields,
    fieldsToInclude,
    relationalFields,
    relationalFieldsMapper,
};
