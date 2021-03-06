import * as Yup from 'yup';
import { Op } from 'sequelize';

import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Delivery from '../models/Delivery';

// import Notification from '../schemas/Notification';
import RegistrationMail from '../jobs/RegistrationDeliveryMail';
import Queue from '../../lib/Queue';

class DeliveryController {
  async index(req, res) {
    const { q = '', page = 1, per_page = 10 } = req.query;

    const searchParams = {
      product: { [Op.iLike]: `%${q}%` },
    };

    const totalDeliveries = await Delivery.findAll({ where: searchParams });

    const deliveries = await Delivery.findAll({
      where: searchParams,
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['url', 'path'],
            },
          ],
        },
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'path'],
        },
      ],
      order: [['id', 'ASC']],
      limit: per_page,
      offset: (page - 1) * per_page,
    });

    return res.json({
      page: Number(page),
      total_results: totalDeliveries.length,
      total_page: Math.ceil(totalDeliveries.length / per_page),
      per_page: Number(per_page),
      results: deliveries,
    });

    // return res.json(deliveries);
  }

  async show(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.findOne({
      where: { id },
      include: [
        {
          model: Recipient,
          as: 'recipient',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
        {
          model: Deliveryman,
          as: 'deliveryman',
          attributes: { exclude: ['createdAt', 'updatedAt'] },
        },
      ],
      order: [['id', 'ASC']],
    });

    return res.json(delivery);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number().required(),
      deliveryman_id: Yup.number().required(),
      product: Yup.string().required(),
      signature_id: Yup.number(),
      canceled_at: Yup.date(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const delivery = await Delivery.create(req.body);

    const { deliveryman_id, recipient_id } = req.body;
    const deliveryman = await Deliveryman.findByPk(deliveryman_id);
    const recipient = await Recipient.findByPk(recipient_id);

    // TODO notification deliveryman by email
    await Queue.add(RegistrationMail.key, {
      deliveryman,
      delivery,
      recipient,
    });

    return res.json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      recipient_id: Yup.number(),
      deliveryman_id: Yup.number(),
      product: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { recipient_id, deliveryman_id, product } = req.body;

    const delivery = await Delivery.findOne({ where: { id } });

    if (!delivery) {
      return res.status(400).json({ error: 'This delivery do not exists' });
    }

    delivery.recipient_id = recipient_id;
    delivery.deliveryman_id = deliveryman_id;
    delivery.product = product;

    const saved = delivery.save();
    if (!saved) {
      return res.json({ error: 'Error on trying update delivery' });
    }

    return res.json({ ok: true, delivery });
  }

  async delete(req, res) {
    const { id } = req.params;

    const delivery = await Delivery.destroy({ where: { id } });

    if (!delivery) {
      return res.json({ error: 'Error on trying to delete delivery' });
    }

    return res.json({ ok: true, message: 'The delivery was deleted' });
  }
}

export default new DeliveryController();
