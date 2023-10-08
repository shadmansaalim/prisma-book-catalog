// Imports
import express from 'express';
import { ENUM_USER_ROLES } from '../../../enums/user';
import authGuard from '../../middlewares/authGuard';
import { UserController } from './user.controller';

// Express router
const router = express.Router();

// API Endpoints
router.get(
  '/:id',
  authGuard(ENUM_USER_ROLES.ADMIN),
  UserController.getSingleUser
);

router.get('/', authGuard(ENUM_USER_ROLES.ADMIN), UserController.getAllUsers);

router.patch(
  '/:id',
  authGuard(ENUM_USER_ROLES.ADMIN),
  UserController.updateSingleUser
);

router.delete(
  '/:id',
  authGuard(ENUM_USER_ROLES.ADMIN),
  UserController.deleteSingleUser
);

export const UserRoutes = router;
