import { Router } from 'express';

import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';
import adminMiddleware from './app/middlewares/admin';

import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';
import FileController from './app/controllers/FileController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import DeliveryController from './app/controllers/DeliveryController';
import DeliveryManagerController from './app/controllers/DeliveryManagerController';
import DeliveryProblemController from './app/controllers/DeliveryProblemController';

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

// ################################################################
/**
 * @Authenticated users
 * The next routes will be accessed only by authenticated users
 */
// ################################################################

routes.use(authMiddleware);

routes.post('/users', UserController.store);
routes.put('/users/:id', UserController.update);
routes.post('/files', upload.single('file'), FileController.store);
routes.post('/signatures', upload.single('file'), FileController.store);

// ################################################################

// ################################################################
/**
 * @Administrator users
 * The next routes will be accessed only by the administrator user
 */
// ################################################################
routes.use(adminMiddleware);

// user
routes.delete('/users/:id', UserController.delete);

// recipients
routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

// deliveryman
routes.get('/deliveryman', DeliverymanController.index);
routes.post('/deliveryman', DeliverymanController.store);
routes.put('/deliveryman/:id', DeliverymanController.update);
routes.delete('/deliveryman/:id', DeliverymanController.delete);

// delivery
routes.get('/deliveries', DeliveryController.index);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

// deliveryman get all pending deliveries
routes.get('/deliveryman/:id/deliveries', DeliveryManagerController.index);

// deliveryman get all finished deliveries
routes.get(
  '/deliveryman/:id/deliveries/finished',
  DeliveryManagerController.show
);

// deliveryman starts a delivery
// start_date
routes.put(
  '/deliveryman/:deliverymanId/delivery/:deliveryId',
  DeliveryManagerController.update
);

// deliveryman finished a delivery
// end_date
routes.put(
  '/deliveryman/:deliverymanId/delivery/:deliveryId/finished',
  DeliveryManagerController.update
);

//
//

// all deliveries with problems
routes.get('/delivery/problems', DeliveryProblemController.index);

// GET https://fastfeet.com/delivery/2/problems
routes.get('/delivery/:deliveryId/problems', DeliveryProblemController.show);

// POST https://fastfeet.com/delivery/3/problems
routes.post('/delivery/:deliveryId/problems', DeliveryProblemController.store);

routes.put('/delivery/problems/:problemId', DeliveryProblemController.update);

// DELETE https://fastfeet.com/problem/1/cancel-delivery
routes.delete(
  '/problem/:problemId/cancel-delivery',
  DeliveryProblemController.delete
);

// routes.get('/delivery/:id/problem/:id', DeliveryProblemController.show);

// ################################################################

export default routes;
