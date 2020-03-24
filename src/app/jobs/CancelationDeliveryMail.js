import { parseISO, format } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Mail from '../../lib/Mail';

class CancelationDeliveryMail {
  get key() {
    return 'CancelationDeliveryMail';
  }

  async handle({ data }) {
    const { deliveryman, delivery, recipient, problem } = data;

    console.log('|XXXXX|==> The Queue for CANCELATION delivery was executed');

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: `[Cancelamento] A entrega do pedido nº ${delivery.id} foi cancelada`,
      template: 'cancelationDelivery',
      context: {
        deliveryman: deliveryman.name,
        deliveryId: delivery.id,
        product: delivery.product,
        recipient: recipient.name,
        cancelatedAt: format(
          parseISO(delivery.canceled_at),
          "dd ' de ' MMMM', às ' H:mm'h'",
          { locale: pt }
        ),
        problem,
      },
    });
  }
}

export default new CancelationDeliveryMail();
