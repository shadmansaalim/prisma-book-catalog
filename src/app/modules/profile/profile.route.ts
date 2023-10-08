// Imports
import express from 'express';
import { ENUM_USER_ROLES } from '../../../enums/user';
import authGuard from '../../middlewares/authGuard';
import { ProfileController } from './profile.controller';

// Express router
const router = express.Router();

// API Endpoints
router.get(
  '/',
  authGuard(ENUM_USER_ROLES.CUSTOMER, ENUM_USER_ROLES.ADMIN),
  ProfileController.getProfile
);

export const ProfileRoutes = router;
