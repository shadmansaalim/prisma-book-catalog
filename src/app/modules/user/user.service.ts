// Imports
import { User } from '@prisma/client';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import getAllDocuments from '../../../shared/getAllDocuments';
import prisma from '../../../shared/prisma';
import { UserConstants } from './user.constant';
import { IUserFilters } from './user.interface';

// GET All Users Function
const getAllUsers = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<User[]>> => {
  // Getting all rooms
  const { page, limit, total, totalPage, result } = await getAllDocuments<User>(
    filters,
    paginationOptions,
    UserConstants.searchableFields,
    prisma.user
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

// GET Single User Function
const getSingleUser = async (id: string): Promise<User | null> => {
  return await prisma.user.findUnique({
    where: { id },
  });
};

// Update Single User Function
const updateSingleUser = async (
  id: string,
  payload: Partial<User>
): Promise<User | null> => {
  return await prisma.user.update({
    where: {
      id,
    },
    data: payload,
  });
};

// DELETE Single User
const deleteSingleUser = async (id: string): Promise<User | null> => {
  // Deleting user
  return await prisma.user.delete({
    where: { id },
  });
};

export const UserService = {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
