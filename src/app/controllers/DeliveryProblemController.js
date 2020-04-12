import * as Yup from 'yup';

import DeliveryProblem from '../models/DeliveryProblem';
import Delivery from '../models/Delivery';
import Deliveryman from '../models/Deliveryman';
import Recipient from '../models/Recipient';

import CancelationMail from '../jobs/CancelationDeliveryMail';
import Queue from '../../lib/Queue';

class DeliveryProblemController {
  async index(req, res) {
    const { page = 1, per_page = 10 } = req.query;

    const total = await DeliveryProblem.findAll();

    const problems = await DeliveryProblem.findAll({
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      order: [['id', 'ASC']],
      limit: per_page,
      offset: (page - 1) * per_page,
    });

    return res.json({
      page: Number(page),
      total_results: total.length,
      total_page: Math.ceil(total.length / per_page),
      per_page: Number(per_page),
      results: problems,
    });
  }

  async show(req, res) {
    const { deliveryId } = req.params;

    const problems = await DeliveryProblem.findAll({
      where: { delivery_id: deliveryId },
      include: [
        {
          model: Delivery,
          as: 'delivery',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
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

    const problem = await DeliveryProblem.findOne({
      where: { id: problemId },
      include: [
        {
          model: Delivery,
          as: 'delivery',
          include: [
            {
              model: Deliveryman,
              as: 'deliveryman',
            },
            {
              model: Recipient,
              as: 'recipient',
            },
          ],
        },
      ],
    });

    if (!problem) {
      return res.json({
        error: 'Error on trying to find the problem',
      });
    }

    problem.delivery.canceled_at = new Date();
    const saved = problem.delivery.save();

    if (!saved) {
      return res.json({
        error: 'Error on trying to cancel the delivery',
      });
    }

    // notification to deliveryman
    await Queue.add(CancelationMail.key, {
      deliveryman: problem.delivery.deliveryman,
      delivery: problem.delivery,
      recipient: problem.delivery.recipient,
      problem: problem.description,
    });

    return res.json({
      ok: true,
      message: `The delivery #${problem.delivery_id} was successfully canceled`,
    });
  }
}

export default new DeliveryProblemController();
