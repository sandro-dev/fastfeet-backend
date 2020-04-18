import Sequelize, { Model } from 'sequelize';

class Delivery extends Model {
  static init(sequelize) {
    super.init(
      {
        recipient_id: Sequelize.INTEGER,
        deliveryman_id: Sequelize.INTEGER,
        signature_id: Sequelize.INTEGER,
        product: Sequelize.STRING,
        canceled_at: Sequelize.DATE,
        start_date: Sequelize.DATE,
        end_date: Sequelize.DATE,
        status: {
          type: Sequelize.VIRTUAL,
          get() {
            let status = 'PENDENTE';

            if (this.canceled_at) {
              status = 'CANCELADA';
            }

            if (this.start_date && this.end_date && !this.canceled_at) {
              status = 'ENTREGUE';
            }

            if (this.start_date && !this.end_date && !this.canceled_at) {
              status = 'RETIRADA';
            }

            return status;
          },
        },
        cancelable: {
          type: Sequelize.VIRTUAL,
          get() {
            let status = true;

            if (this.start_date && this.end_date) {
              status = false;
            }

            return status;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Recipient, {
      foreignKey: 'recipient_id',
      as: 'recipient',
    });

    this.belongsTo(models.Deliveryman, {
      foreignKey: 'deliveryman_id',
      as: 'deliveryman',
    });

    this.belongsTo(models.File, {
      foreignKey: 'signature_id',
      as: 'signature',
    });
  }
}

export default Delivery;
