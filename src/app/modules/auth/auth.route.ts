// Imports
import express from 'express';
import { AuthController } from './auth.controller';

// Express router
const router = express.Router();

// API Endpoints

router.post('/signup', AuthController.signUpUser);
router.post('/signin', AuthController.signInUser);

export const AuthRoutes = router;
