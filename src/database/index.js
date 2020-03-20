import Sequelize from 'sequelize';

import dbConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';
import Recipient from '../app/models/Recipient';
import Signature from '../app/models/Signature';
import Deliveryman from '../app/models/Deliveryman';
import Delivery from '../app/models/Delivery';

const models = [User, File, Recipient, Deliveryman, Signature, Delivery];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(dbConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
