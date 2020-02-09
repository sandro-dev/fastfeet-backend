import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';
import checkAdminMiddleware from './app/middlewares/checkAdmin';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import RecipientController from './app/controllers/RecipientController';

const upload = multer(multerConfig);

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({
    ok: true,
    message: `The server ir running on port ${process.env.APP_PORT}`,
  });
});

routes.post('/sessions', SessionController.store);
routes.get('/users', UserController.index);

routes.use(authMiddleware);

routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);
routes.post('/files', upload.single('file'), FileController.store);

routes.use(checkAdminMiddleware);

routes.delete('/users/:id', UserController.delete);

routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

export default routes;
