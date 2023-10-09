// Imports
import express from 'express';
import { ENUM_USER_ROLES } from '../../../enums/user';
import authGuard from '../../middlewares/authGuard';
import { CategoryController } from './category.controller';

// Express router
const router = express.Router();

// API Endpoints
router.get(
  '/:id',
  authGuard(ENUM_USER_ROLES.CUSTOMER, ENUM_USER_ROLES.ADMIN),
  CategoryController.getSingleCategory
);

router.get(
  '/',
  authGuard(ENUM_USER_ROLES.CUSTOMER, ENUM_USER_ROLES.ADMIN),
  CategoryController.getAllCategories
);

router.post(
  '/create-category',
  authGuard(ENUM_USER_ROLES.ADMIN),
  CategoryController.createCategory
);

router.patch(
  '/:id',
  authGuard(ENUM_USER_ROLES.ADMIN),
  CategoryController.updateSingleCategory
);

router.delete(
  '/:id',
  authGuard(ENUM_USER_ROLES.ADMIN),
  CategoryController.deleteSingleCategory
);

export const CategoryRoutes = router;
