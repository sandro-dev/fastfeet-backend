import * as Yup from 'yup';
import { Op } from 'sequelize';
import {
  isAfter,
  isBefore,
  parseISO,
  setHours,
  startOfHour,
  startOfDay,
  endOfDay,
} from 'date-fns';

import Recipient from '../models/Recipient';
import Deliveryman from '../models/Deliveryman';
import File from '../models/File';
import Delivery from '../models/Delivery';

class DeliveryManagerController {
  async index(req, res) {
    const { id } = req.params;
    const { page = 1, per_page = 10 } = req.query;

    const total = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: null,
      },
    });

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
        end_date: null,
      },
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
      order: [['id', 'ASC']],
      limit: per_page,
      offset: (page - 1) * per_page,
    });

    return res.json({
      page: Number(page),
      total_results: total.length,
      total_page: Math.ceil(total.length / per_page),
      per_page: Number(per_page),
      results: deliveries,
    });
  }

  async show(req, res) {
    const { id } = req.params;
    const { page = 1, per_page = 10 } = req.query;

    const total = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        end_date: { [Op.not]: null },
      },
    });

    const deliveries = await Delivery.findAll({
      where: {
        deliveryman_id: id,
        end_date: { [Op.not]: null },
      },
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
      order: [['id', 'ASC']],
      limit: per_page,
      offset: (page - 1) * per_page,
    });

    return res.json({
      page: Number(page),
      total_results: total.length,
      total_page: Math.ceil(total.length / per_page),
      per_page: Number(per_page),
      results: deliveries,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date(),
      end_date: Yup.date(),
      signature_id: Yup.number(),
    });

    // Validation of data
    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    // params of route
    const { deliveryId, deliverymanId } = req.params;

    // verify if delivery exists
    const delivery = await Delivery.findOne({ where: { id: deliveryId } });

    if (!delivery) {
      return res.status(400).json({ error: 'This delivery do not exists' });
    }

    // request body data
    const { start_date, end_date, signature_id } = req.body;

    // start date ISO
    const start_date_ISO = parseISO(start_date);
    const end_date_ISO = parseISO(end_date);

    // if is a starting up a delivery
    if (start_date) {
      // deliveries by deliveryman by day
      const deliveriesByDay = await Delivery.findAll({
        where: {
          deliveryman_id: deliverymanId,
          start_date: {
            [Op.between]: [
              startOfDay(start_date_ISO),
              endOfDay(start_date_ISO),
            ],
          },
        },
      });

      if (deliveriesByDay.length >= 5) {
        return res.status(400).json({
          error: `You can only pick up 5 deliveries a day`,
        });
      }

      if (
        isBefore(start_date_ISO, setHours(startOfHour(new Date()), 8)) ||
        isAfter(start_date_ISO, setHours(startOfHour(new Date()), 18))
      ) {
        return res
          .status(400)
          .json({ error: 'You only can take the delivery between 8h and 18h' });
      }

      delivery.start_date = start_date;
      const save = delivery.save();

      if (!save) {
        return res.json({ error: 'Error on trying update delivery' });
      }
    }

    // if is finishing delivery
    if (end_date) {
      delivery.end_date = end_date;
      delivery.signature_id = signature_id;
      const save = delivery.save();

      if (!save) {
        return res.json({ error: 'Error on trying update delivery' });
      }
    }

    return res.json({ ok: true, delivery });
  }
}

export default new DeliveryManagerController();
