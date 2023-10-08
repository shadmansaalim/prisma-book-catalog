// Imports
import express from 'express';
import { ENUM_USER_ROLES } from '../../../enums/user';
import authGuard from '../../middlewares/authGuard';
import { BookController } from './book.controller';

// Express router
const router = express.Router();

// API Endpoints
router.get(
  '/:id',
  authGuard(ENUM_USER_ROLES.ADMIN),
  BookController.getSingleBook
);

router.get('/', authGuard(ENUM_USER_ROLES.ADMIN), BookController.getAllBooks);

router.post(
  '/create-book',
  authGuard(ENUM_USER_ROLES.ADMIN),
  BookController.createBook
);

router.patch(
  '/:id',
  authGuard(ENUM_USER_ROLES.ADMIN),
  BookController.updateSingleBook
);

router.delete(
  '/:id',
  authGuard(ENUM_USER_ROLES.ADMIN),
  BookController.deleteSingleBook
);

export const BookRoutes = router;
