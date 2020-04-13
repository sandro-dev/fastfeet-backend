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
import DeliveryStatusController from './app/controllers/DeliveryStatusController';
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

// ################################################################
// Recipients
// ################################################################
routes.get('/recipients', RecipientController.index);
routes.post('/recipients', RecipientController.store);
routes.put('/recipients/:id', RecipientController.update);
routes.delete('/recipients/:id', RecipientController.delete);

// ################################################################
// Deliveryman
// ################################################################
routes.get('/deliverymen', DeliverymanController.index);
routes.get('/deliverymen/:id', DeliverymanController.show);
routes.post('/deliverymen', DeliverymanController.store);
routes.put('/deliverymen/:id', DeliverymanController.update);
routes.delete('/deliverymen/:id', DeliverymanController.delete);

// ################################################################
// Deliveries
// ################################################################
routes.get('/deliveries', DeliveryController.index);
routes.get('/deliveries/:id', DeliveryController.show);
routes.post('/deliveries', DeliveryController.store);
routes.put('/deliveries/:id', DeliveryController.update);
routes.delete('/deliveries/:id', DeliveryController.delete);

// ################################################################
// Deliveries by Deliveryman
// ################################################################

// filter pending deliveries by deliveryman ID
routes.get('/deliverymen/:id/deliveries', DeliveryStatusController.index);

// filter finished deliveries by deliveryman ID
routes.get(
  '/deliverymen/:id/deliveries/finished',
  DeliveryStatusController.show
);

// deliveryman starts/finishes a delivery // start_date, end_sate
routes.put(
  '/deliverymen/:deliverymanId/deliveries/:deliveryId',
  DeliveryStatusController.update
);

// ################################################################
// Delivery Problems
// ################################################################

// list all deliveries problems
routes.get('/delivery/problems', DeliveryProblemController.index);

// filter problems by delivery ID
routes.get('/delivery/:deliveryId/problems', DeliveryProblemController.show);

// insert a delivery problem by delivery ID
routes.post('/delivery/:deliveryId/problems', DeliveryProblemController.store);

// update a delivery problem by problem ID
routes.put('/delivery/problems/:problemId', DeliveryProblemController.update);

// cancel a delivery by problem ID
routes.delete(
  '/problem/:problemId/cancel-delivery',
  DeliveryProblemController.delete
);

// ################################################################

export default routes;
