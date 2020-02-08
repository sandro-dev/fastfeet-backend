import { Router } from 'express';

const routes = new Router();

routes.get('/', (req, res) => {
  return res.json({ok:true, message: "The server ir running on port 3333"})
})

export default routes;