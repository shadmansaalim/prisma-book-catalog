// Imports
import { Book } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PaginationConstants } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { BookConstants } from './book.constant';
import { BookService } from './book.service';

// Function that works when create book POST API hits
const createBook = catchAsync(async (req: Request, res: Response) => {
  const result = await BookService.createBook(req.body);

  // Sending API Response
  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book created successfully.',
    data: result,
  });
});

// Function to GET All Books
const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  // Making a filter options object
  const filters = pick(req.query, BookConstants.filterableFields);

  // Making a pagination options object
  const paginationOptions = pick(req.query, PaginationConstants.fields);

  // Getting all books based on request
  const result = await BookService.getAllBooks(filters, paginationOptions);

  // Sending API Response
  sendResponse<Book[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Books retrieved successfully',
    meta: result?.meta,
    data: result?.data,
  });
});

// Function to GET Single Book
const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  // Getting book id from params
  const id = req.params.id;
  const result = await BookService.getSingleBook(id);

  // Sending API Response
  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Book retrieved successfully.',
    data: result,
  });
});

// Function to update book
const updateSingleBook = catchAsync(async (req: Request, res: Response) => {
  // Getting book id from params
  const id = req.params.id;
  // Getting updated data
  const updatedData = req.body;

  const result = await BookService.updateSingleBook(id, updatedData);

  // Sending API Response
  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book updated successfully',
    data: result,
  });
});

// Function to delete book
const deleteSingleBook = catchAsync(async (req: Request, res: Response) => {
  // Getting book id from params
  const id = req.params.id;

  const result = await BookService.deleteSingleBook(id);

  // Sending API Response
  sendResponse<Book>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Book deleted successfully.',
    data: result,
  });
});

export const BookController = {
  createBook,
  getAllBooks,
  getSingleBook,
  updateSingleBook,
  deleteSingleBook,
};
