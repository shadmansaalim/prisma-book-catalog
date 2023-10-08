// Searchable fields to GET orders
const searchableFields: string[] = [];

// Searching and Filtering  Fields
const filterableFields = ['searchTerm', 'id', 'status', 'userId'];

// Fields to populate in order data
const fieldsToInclude = ['user'];

const relationalFields: string[] = ['userId'];

const relationalFieldsMapper: { [key: string]: string } = {
  userId: 'user',
};

export const OrderConstants = {
  searchableFields,
  filterableFields,
  fieldsToInclude,
  relationalFields,
  relationalFieldsMapper,
};
