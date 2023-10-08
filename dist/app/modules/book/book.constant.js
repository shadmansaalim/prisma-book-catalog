"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookConstants = void 0;
// Searchable fields to GET books
const searchableFields = [];
// Searching and Filtering  Fields
const filterableFields = [
    'searchTerm',
    'id',
    'title',
    'author',
    'genre',
    'publicationDate',
    'categoryId',
];
// Fields to populate in book data
const fieldsToInclude = ['category'];
const relationalFields = ['categoryId'];
const relationalFieldsMapper = {
    categoryId: 'category',
};
exports.BookConstants = {
    searchableFields,
    filterableFields,
    fieldsToInclude,
    relationalFields,
    relationalFieldsMapper,
};
