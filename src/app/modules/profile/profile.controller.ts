// Imports
import { User } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ProfileService } from './profile.service';

// Function to GET User profile
const getProfile = catchAsync(async (req: Request, res: Response) => {
  // Getting authenticated user from request
  const user = (req as any).user;

  const result = await ProfileService.getProfile(user.id);

  // Sending API Response
  sendResponse<User>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Profile retrieved successfully.',
    data: result,
  });
});

export const ProfileController = {
  getProfile,
};
