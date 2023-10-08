"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserConstants = void 0;
// Searchable fields to GET users
const searchableFields = ['name', 'email', 'contactNo', 'id'];
// Searching and Filtering  Fields
const filterableFields = ['searchTerm', 'id', 'email', 'contactNo', 'address'];
exports.UserConstants = {
    searchableFields,
    filterableFields,
};
