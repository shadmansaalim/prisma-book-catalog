// Imports
import { Category } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PaginationConstants } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { CategoryConstants } from './category.constant';
import { CategoryService } from './category.service';

// Function that works when create category POST API hits
const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.createCategory(req.body);

  // Sending API Response
  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category created successfully.',
    data: result,
  });
});

// Function to GET All Categories
const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  // Making a filter options object
  const filters = pick(req.query, CategoryConstants.filterableFields);

  // Making a pagination options object
  const paginationOptions = pick(req.query, PaginationConstants.fields);

  // Getting all categories based on request
  const result = await CategoryService.getAllCategories(
    filters,
    paginationOptions
  );

  // Sending API Response
  sendResponse<Category[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Categories retrieved successfully',
    meta: result?.meta,
    data: result?.data,
  });
});

// Function to GET Single category
const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
  // Getting category id from params
  const id = req.params.id;
  const result = await CategoryService.getSingleCategory(id);

  // Sending API Response
  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Category retrieved successfully.',
    data: result,
  });
});

// Function to update category
const updateSingleCategory = catchAsync(async (req: Request, res: Response) => {
  // Getting category id from params
  const id = req.params.id;
  // Getting updated data
  const updatedData = req.body;

  const result = await CategoryService.updateSingleCategory(id, updatedData);

  // Sending API Response
  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully',
    data: result,
  });
});

// Function to delete category
const deleteSingleCategory = catchAsync(async (req: Request, res: Response) => {
  // Getting category id from params
  const id = req.params.id;

  const result = await CategoryService.deleteSingleCategory(id);

  // Sending API Response
  sendResponse<Category>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successfully.',
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateSingleCategory,
  deleteSingleCategory,
};
