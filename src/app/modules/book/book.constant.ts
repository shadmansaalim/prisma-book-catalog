// Searchable fields to GET books
const searchableFields: string[] = [];

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

const relationalFields: string[] = ['categoryId'];

const relationalFieldsMapper: { [key: string]: string } = {
  categoryId: 'category',
};

export const BookConstants = {
  searchableFields,
  filterableFields,
  fieldsToInclude,
  relationalFields,
  relationalFieldsMapper,
};
