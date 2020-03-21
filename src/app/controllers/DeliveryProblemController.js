import * as Yup from 'yup';

import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';

class DeliveryProblemController {
  async index(req, res) {
    const problems = await DeliveryProblem.findAll({
      include: [
        {
          model: Delivery,
          as: 'delivery',
        },
      ],
    });
    return res.json(problems);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { deliveryId } = req.params;
    const { description } = req.body;

    const delivery = await Delivery.findByPk(deliveryId);

    if (!delivery) {
      return res.status(400).json({ error: 'This delivery do not exists' });
    }

    const problem = await DeliveryProblem.create({
      delivery_id: deliveryId,
      description,
    });
    return res.json(problem);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      description: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { problemId } = req.params;
    const { description } = req.body;

    const problem = await DeliveryProblem.findByPk(problemId);

    if (!problem) {
      return res.status(400).json({ error: 'This problem do not exists' });
    }

    problem.description = description;

    if (!problem.save()) {
      return res.json({ error: 'Error on trying update problem' });
    }

    return res.json({ ok: true, problem });
  }

  async delete(req, res) {
    const { problemId } = req.params;

    const delivery = await DeliveryProblem.destroy({
      where: { id: problemId },
    });

    if (!delivery) {
      return res.json({ error: 'Error on trying to delete delivery problem' });
    }

    return res.json({ ok: true, message: 'The delivery problem was deleted' });
  }
}

export default new DeliveryProblemController();
