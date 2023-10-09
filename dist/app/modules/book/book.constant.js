"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookConstants = void 0;
// Searchable fields to GET books
const searchableFields = ['title', 'author', 'genre'];
// Searching and Filtering  Fields
const filterableFields = [
    'searchTerm',
    'id',
    'title',
    'author',
    'genre',
    'publicationDate',
    'categoryId',
    'minPrice',
    'maxPrice',
];
// Fields to populate in book data
const fieldsToInclude = ['category'];
exports.BookConstants = {
    searchableFields,
    filterableFields,
    fieldsToInclude,
};
