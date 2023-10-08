// Imports
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PaginationConstants } from '../../../constants/pagination';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { UserConstants } from './user.constant';
import { UserService } from './user.service';

// Function to GET All Users
const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  // Making a filter options object
  const filters = pick(req.query, UserConstants.filterableFields);

  // Making a pagination options object
  const paginationOptions = pick(req.query, PaginationConstants.fields);

  // Getting all users based on request
  const result = await UserService.getAllUsers(filters, paginationOptions);

  // Sending API Response
  sendResponse<User[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved successfully',
    meta: result?.meta,
    data: result?.data,
  });
});

// Function to GET Single User
const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  // Getting user id from params
  const id = req.params.id;
  const result = await UserService.getSingleUser(id);

  // Sending API Response
  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single User retrieved successfully.',
    data: result,
  });
});

// Function to update user
const updateSingleUser = catchAsync(async (req: Request, res: Response) => {
  // Getting user id from params
  const id = req.params.id;
  // Getting updated data
  const updatedData = req.body;

  const result = await UserService.updateSingleUser(id, updatedData);

  // Sending API Response
  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User updated successfully',
    data: result,
  });
});

// Function to delete user
const deleteSingleUser = catchAsync(async (req: Request, res: Response) => {
  // Getting user id from params
  const id = req.params.id;

  const result = await UserService.deleteSingleUser(id);

  // Sending API Response
  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User deleted successfully.',
    data: result,
  });
});

export const UserController = {
  getAllUsers,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
