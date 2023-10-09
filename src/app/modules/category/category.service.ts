// Imports
import { Category } from '@prisma/client';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import getAllDocuments from '../../../shared/getAllDocuments';
import prisma from '../../../shared/prisma';
import { CategoryConstants } from './category.constant';
import { ICategoryFilters } from './category.interface';

// Create Category Function
const createCategory = async (data: Category): Promise<Category> => {
  return await prisma.category.create({
    data,
  });
};

// GET All Categories Function
const getAllCategories = async (
  filters: ICategoryFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Category[]>> => {
  // Getting all categories
  const { page, limit, total, totalPage, result } =
    await getAllDocuments<Category>(
      filters,
      paginationOptions,
      CategoryConstants.searchableFields,
      prisma.category
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

// GET Single Category Function
const getSingleCategory = async (id: string): Promise<Category | null> => {
  return await prisma.category.findUnique({
    where: { id },
  });
};

// Update Single Category Function
const updateSingleCategory = async (
  id: string,
  payload: Partial<Category>
): Promise<Category | null> => {
  return await prisma.category.update({
    where: {
      id,
    },
    data: payload,
  });
};

// DELETE Single Category
const deleteSingleCategory = async (id: string): Promise<Category | null> => {
  // Deleting Category
  return await prisma.category.delete({
    where: { id },
  });
};

export const CategoryService = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateSingleCategory,
  deleteSingleCategory,
};
