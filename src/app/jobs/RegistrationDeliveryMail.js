import Mail from '../../lib/Mail';

class RegistrationDeliveryMail {
  get key() {
    return 'RegistrationDeliveryMail';
  }

  async handle({ data }) {
    const { deliveryman, delivery, recipient } = data;

    console.log('|###|==> The Queue for registration delivery was executed');

    await Mail.sendMail({
      to: `${deliveryman.name} <${deliveryman.email}>`,
      subject: `Uma nova encomenda disponível para entrega - ID #${delivery.id}`,
      template: 'registration',
      context: {
        deliveryman: deliveryman.name,
        product: delivery.product,
        recipient: recipient.name,
        street: recipient.street,
        number: recipient.number,
        complement: recipient.complement,
        city: recipient.city,
        state: recipient.state,
        postcode: recipient.postcode,
      },
    });
  }
}

export default new RegistrationDeliveryMail();
