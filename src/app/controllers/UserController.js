import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async index(req, res) {
    const users = await User.findAll({
      attributes: ['id', 'name', 'email', 'password_hash'],
    });

    return res.json(users);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fail' });
    }

    const { email } = req.body;

    const userExists = await User.findOne({
      where: { email },
    });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const user = await User.create(req.body);

    return res.json({ ok: true, user });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      password: Yup.string(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validations fails on update' });
    }

    const { id } = req.params;
    const { name, email, password } = req.body;

    const user = await User.findOne({
      where: { id },
    });

    user.name = name;
    user.email = email;
    user.password = password;

    const updated = user.save();

    if (!updated) {
      return res.json({ error: 'Error on trying update user' });
    }

    return res.json({ ok: true, user });
  }

  async delete(req, res) {
    const { id } = req.params;

    const user = await User.destroy({
      where: { id },
    });

    if (!user) {
      return res.json({ error: `Error on try to delete user` });
    }

    return res.json({ ok: true, message: 'User was deleted' });
  }
}

export default new UserController();
