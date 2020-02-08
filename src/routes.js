import { Router } from 'express';

import UserController from './app/controllers/UserController';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({
    ok: true,
    message: `The server ir running on port ${process.env.APP_PORT}`,
  });
});

routes.get('/users', UserController.index);
routes.post('/users', UserController.store);

export default routes;
