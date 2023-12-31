// Imports
import express from 'express';
import { AuthRoutes } from '../modules/auth/auth.route';
import { BookRoutes } from '../modules/book/book.route';
import { CategoryRoutes } from '../modules/category/category.route';
import { OrderRoutes } from '../modules/order/order.route';
import { ProfileRoutes } from '../modules/profile/profile.route';
import { UserRoutes } from '../modules/user/user.route';
import { IModuleRoute } from './route.interface';

// Express router
const router = express.Router();

// App Module Routes
const moduleRoutes = [
  { path: '/auth', route: AuthRoutes },
  { path: '/users', route: UserRoutes },
  { path: '/categories', route: CategoryRoutes },
  { path: '/books', route: BookRoutes },
  { path: '/orders', route: OrderRoutes },
  { path: '/profile', route: ProfileRoutes },
];

// Application Routes
moduleRoutes.forEach((moduleRoute: IModuleRoute) => {
  router.use(moduleRoute?.path, moduleRoute?.route);
});

export default router;
