module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('deliveries', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },

      recipient_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'recipients', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      deliveryman_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'deliveryman', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      signature_id: {
        type: Sequelize.INTEGER,
        defaultValue: null,
        references: { model: 'signatures', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      product: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      canceled_at: {
        type: Sequelize.DATE,
        allowNull: true,
        defaultValue: null,
      },

      start_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      end_date: {
        type: Sequelize.DATE,
        allowNull: true,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: queryInterface => {
    return queryInterface.dropTable('deliveries');
  },
};
