import * as Yup from 'yup';

import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Delivery from '../models/Delivery';

class DeliveryController {
  async index(req, res) {
    const deliveries = await Delivery.findAll({
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
        {
          model: File,
          as: 'signature',
          attributes: ['url', 'path'],
        },
      ],
    });

    return res.json(deliveries);
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

    // TODO notification deliveryman by email

    return res.json(delivery);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      signature_id: Yup.number(),
      canceled_at: Yup.date(),
      start_date: Yup.date(),
      end_date: Yup.date(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { signature_id, canceled_at, start_date, end_date } = req.body;

    const delivery = await Delivery.findOne({ where: { id } });

    if (!delivery) {
      return res.status(400).json({ error: 'This delivery do not exists' });
    }

    delivery.signature_id = signature_id;
    delivery.canceled_at = canceled_at;
    delivery.start_date = start_date;
    delivery.end_date = end_date;

    if (!delivery.save()) {
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
