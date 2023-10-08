// Imports
import { Order } from '@prisma/client';
import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { PaginationConstants } from '../../../constants/pagination';
import { ENUM_USER_ROLES } from '../../../enums/user';
import catchAsync from '../../../shared/catchAsync';
import pick from '../../../shared/pick';
import sendResponse from '../../../shared/sendResponse';
import { OrderConstants } from './order.constant';
import { OrderService } from './order.service';

// Function that works when create order POST API hits
const createOrder = catchAsync(async (req: Request, res: Response) => {
  // Getting authenticated user from request
  const user = (req as any).user;

  // Ordered books data
  const { orderedBooks } = req.body;

  const result = await OrderService.createOrder(user.id, orderedBooks);

  // Sending API Response
  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Order created successfully.',
    data: result,
  });
});

// Function to GET All Orders
const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  // Getting authenticated user from request
  const user = (req as any).user;

  // Making a filter options object
  const filters = pick(req.query, OrderConstants.filterableFields);

  // Checking if user is customer or not
  if (user.role === ENUM_USER_ROLES.CUSTOMER) {
    // Adding a filter so that customer get to see his/her orders only
    filters.userId = user.id;
  }

  // Making a pagination options object
  const paginationOptions = pick(req.query, PaginationConstants.fields);

  // Getting all orders based on request
  const result = await OrderService.getAllOrders(filters, paginationOptions);

  // Sending API Response
  sendResponse<Order[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Orders retrieved successfully',
    meta: user.role === ENUM_USER_ROLES.ADMIN ? result?.meta : null,
    data: result?.data,
  });
});

// Function to GET Single Order
const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  // Getting authenticated user from request
  const user = (req as any).user;

  // Getting order id from params
  const orderId = req.params.id;

  let result = null;

  // Checking whether user is CUSTOMER OR ADMIN, for customer will show if the order belongs to them
  if (user.role === ENUM_USER_ROLES.CUSTOMER) {
    result = await OrderService.getSingleOrder(orderId, user.id);
  } else {
    result = await OrderService.getSingleOrder(orderId);
  }

  // Sending API Response
  sendResponse<Order>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Single Order retrieved successfully.',
    data: result,
  });
});

export const OrderController = {
  createOrder,
  getAllOrders,
  getSingleOrder,
};
