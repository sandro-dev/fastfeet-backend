import * as Yup from 'yup';
import { Op } from 'sequelize';
import Recipient from '../models/Recipient';

class RecipientController {
  async index(req, res) {
    const { q = '', page = 1, per_page = 10 } = req.query;

    const searchParams = {
      name: { [Op.iLike]: `%${q}%` },
    };

    const total = await Recipient.findAll({
      where: searchParams,
    });

    const recipients = await Recipient.findAll({
      where: searchParams,
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
      results: recipients,
    });
  }

  async show(req, res) {
    const { id } = req.params;
    const recipient = await Recipient.findOne({
      where: { id },
      attributes: { exclude: ['createdAt', 'updatedAt'] },
    });

    return res.json(recipient);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.string(),
      complement: Yup.string(),
      city: Yup.string().required(),
      state: Yup.string().required(),
      postcode: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const recipient = await Recipient.create(req.body);

    return res.json({ ok: true, recipient });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street: Yup.string(),
      number: Yup.string(),
      complement: Yup.string(),
      city: Yup.string(),
      state: Yup.string(),
      postcode: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const recipient = await Recipient.findOne({
      where: { id },
    });

    const { street, number, complement, city, state, postcode } = req.body;

    recipient.street = street;
    recipient.number = number;
    recipient.complement = complement;
    recipient.city = city;
    recipient.state = state;
    recipient.postcode = postcode;

    recipient.save();

    return res.json({ ok: true, recipient });
  }

  async delete(req, res) {
    const { id } = req.params;

    const recipient = await Recipient.destroy({ where: { id } });

    if (!recipient) {
      return res.json({ error: 'Error on trying to delete recipient' });
    }
    return res.json({ ok: true, message: 'The recipient was deleted' });
  }
}

export default new RecipientController();
