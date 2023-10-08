// Imports
import express from 'express';
import { ENUM_USER_ROLES } from '../../../enums/user';
import authGuard from '../../middlewares/authGuard';
import { OrderController } from './order.controller';

// Express router
const router = express.Router();

// API Endpoints

router.get(
  '/',
  authGuard(ENUM_USER_ROLES.CUSTOMER, ENUM_USER_ROLES.ADMIN),
  OrderController.getAllOrders
);

router.post(
  '/create-order',
  authGuard(ENUM_USER_ROLES.CUSTOMER),
  OrderController.createOrder
);

export const OrderRoutes = router;
