import * as Yup from 'yup';

import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

class DeliveryProblemController {
  async index(req, res) {
    const deliveries = await DeliveryProblem.findAll({});
    return res.json(deliveries);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      delivery_id: Yup.number().required(),
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { delivery_id } = req.body;

    const delivery = await Delivery.findByPk(delivery_id);

    if (!delivery) {
      return res.status(400).json({ error: 'This delivery do not exists' });
    }

    const problem = await DeliveryProblem.create(req.body);
    return res.json(problem);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      delivery_id: Yup.number(),
      description: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { description } = req.body;

    const delivery = await DeliveryProblem.findByPk(id);

    if (!delivery) {
      return res
        .status(400)
        .json({ error: 'This delivery problem do not exists' });
    }

    delivery.description = description;

    if (!delivery.save()) {
      return res.json({ error: 'Error on trying update delivery' });
    }

    return res.json({ ok: true, delivery });
  }

  async delete(req, res) {
    const { id } = req.params;

    const delivery = await DeliveryProblem.destroy({ where: { id } });

    if (!delivery) {
      return res.json({ error: 'Error on trying to delete delivery problem' });
    }

    return res.json({ ok: true, message: 'The delivery problem was deleted' });
  }
}

export default new DeliveryProblemController();
