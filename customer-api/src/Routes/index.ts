import express from 'express';
const customerRoute = require('./customer.route');
const userRoute = require('./user.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/user',
    route: userRoute,
  },
  {
    path: '/customer',
    route: customerRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
