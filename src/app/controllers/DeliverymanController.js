import * as Yup from 'yup';
import { Op } from 'sequelize';

import Deliveryman from '../models/Deliveryman';
import File from '../models/File';

class DeliverymanController {
  async index(req, res) {
    const { q = '', page = 1, per_page = 10 } = req.query;

    const searchParams = {
      name: {
        [Op.iLike]: `%${q}%`,
      },
    };

    const total = await Deliveryman.findAll();

    const deliveryman = await Deliveryman.findAll({
      where: searchParams,
      attributes: { exclude: ['createdAt', 'updatedAt'] },
      include: [
        {
          model: File,
          as: 'avatar',
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
      results: deliveryman,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { email } = req.body;

    const userExists = await Deliveryman.findOne({ where: { email } });

    if (userExists) {
      return res
        .status(400)
        .json({ error: 'This email is already registered' });
    }

    const deliveryman = await Deliveryman.create(req.body);

    return res.json(deliveryman);
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      avatar_id: Yup.number(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(401).json({ error: 'Validation fails' });
    }

    const { id } = req.params;
    const { name, email, avatar_id } = req.body;

    const deliveryman = await Deliveryman.findOne({
      where: { id },
      attributes: ['id', 'name', 'email', 'avatar_id'],
    });

    if (!deliveryman) {
      return res.status(400).json({ error: 'This deliveryman do not exists' });
    }

    const emailExists = await Deliveryman.findOne({ where: { email } });

    if (emailExists && Number(emailExists.id) !== Number(id)) {
      return res
        .status(400)
        .json({ error: 'Email already exists on onother deliveryman' });
    }

    deliveryman.name = name;
    deliveryman.email = email;
    deliveryman.avatar_id = avatar_id;

    const updated = deliveryman.save();

    if (!updated) {
      return res.json({ error: 'Error on trying update deliveryman' });
    }

    return res.json({ ok: true, deliveryman });
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliveryman.destroy({ where: { id } });

    if (!deliveryman) {
      return res.json({ error: 'Error on trying to delete deliveryman' });
    }

    return res.json({ ok: true, message: 'The deliveryman was deleted' });
  }
}

export default new DeliverymanController();
