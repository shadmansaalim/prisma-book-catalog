// Imports
import { Book } from '@prisma/client';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import getAllDocuments from '../../../shared/getAllDocuments';
import prisma from '../../../shared/prisma';
import { BookConstants } from './book.constant';
import { IBookFilters } from './book.interface';

// Create Book Function
const createBook = async (data: Book): Promise<Book> => {
  return await prisma.book.create({
    data,
    include: {
      category: true,
    },
  });
};

// GET All Books Function
const getAllBooks = async (
  filters: IBookFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  // Converting strings to float
  if (filters?.minPrice) {
    filters.minPrice = parseFloat(filters.minPrice as string);
  }
  if (filters?.maxPrice) {
    filters.maxPrice = parseFloat(filters.maxPrice as string);
  }
  // Getting all books
  const { page, limit, total, totalPage, result } = await getAllDocuments<Book>(
    filters,
    paginationOptions,
    BookConstants.searchableFields,
    prisma.book,
    BookConstants.fieldsToInclude
  );

  return {
    meta: {
      page,
      limit,
      total,
      totalPage,
    },
    data: result,
  };
};

// GET Single Book Function
const getSingleBook = async (id: string): Promise<Book | null> => {
  return await prisma.book.findUnique({
    where: { id },
    include: {
      category: true,
    },
  });
};

// Update Single Book Function
const updateSingleBook = async (
  id: string,
  payload: Partial<Book>
): Promise<Book | null> => {
  return await prisma.book.update({
    where: {
      id,
    },
    data: payload,
    include: {
      category: true,
    },
  });
};

// DELETE Single Book
const deleteSingleBook = async (id: string): Promise<Book | null> => {
  // Deleting Book
  return await prisma.book.delete({
    where: { id },
    include: {
      category: true,
    },
  });
};

export const BookService = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateSingleBook,
  deleteSingleBook,
};
