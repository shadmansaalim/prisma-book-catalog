// Imports
import { Order } from '@prisma/client';
import { JsonArray } from '@prisma/client/runtime/library';
import { IGenericResponse } from '../../../interfaces/common';
import { IPaginationOptions } from '../../../interfaces/pagination';
import getAllDocuments from '../../../shared/getAllDocuments';
import prisma from '../../../shared/prisma';
import { IUserFilters } from '../user/user.interface';
import { OrderConstants } from './order.constant';

// Create Order Function
const createOrder = async (
  authUserId: string,
  payload: JsonArray
): Promise<Order> => {
  return await prisma.order.create({
    data: {
      userId: authUserId,
      orderedBooks: payload,
    },
    include: {
      user: true,
    },
  });
};

// GET All Orders
const getAllOrders = async (
  filters: IUserFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<Order[]>> => {
  // Getting all orders
  const { page, limit, total, result } = await getAllDocuments<Order>(
    filters,
    paginationOptions,
    OrderConstants.searchableFields,
    prisma.order,
    OrderConstants.fieldsToInclude,
    OrderConstants.relationalFields,
    OrderConstants.relationalFieldsMapper
  );

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

export const OrderService = {
  createOrder,
  getAllOrders,
};
