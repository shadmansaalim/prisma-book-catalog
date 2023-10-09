// Searchable fields to GET books
const searchableFields: string[] = ['title', 'author', 'genre'];

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

export const BookConstants = {
  searchableFields,
  filterableFields,
  fieldsToInclude,
};
