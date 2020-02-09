import Deliverymen from '../models/Deliverymen';

class DeliverymenController {
  async index(req, res) {
    const deliverymen = await Deliverymen.findAll();
    return res.json(deliverymen);
  }

  async store(req, res) {
    return res.json();
  }

  async update(req, res) {
    return res.json();
  }

  async delete(req, res) {
    const { id } = req.params;

    const deliveryman = await Deliverymen.destroy({
      where: { id },
    });

    if (!deliveryman) {
      return res.json({ error: 'Error on trying to delete deliveryman' });
    }

    return res.json({ ok: true, message: 'The deliveryman was deleted' });
  }
}

export default new DeliverymenController();
