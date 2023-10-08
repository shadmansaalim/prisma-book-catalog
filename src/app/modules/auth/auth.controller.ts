// Imports
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { AuthService } from './auth.service';

// Function to sign up an user (CREATE AN ACCOUNT)
const signUpUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.signUpUser(req.body);

  // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
  const { password, ...userData } = result;

  // Sending API Response
  sendResponse<Partial<User>>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User created successfully!',
    data: userData,
  });
});

// Function to sign in an user (LOGIN)
const signInUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.signInUser(req.body);

  // Sending API Response
  sendResponse<{ token: string }>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User signin successfully!',
    data: result,
  });
});

export const AuthController = {
  signUpUser,
  signInUser,
};
