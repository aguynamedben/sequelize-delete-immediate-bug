import Sequelize from 'sequelize';

import createEmployeeModel from './Employee';

console.log('wat');

const sequelize = new Sequelize('commande', 'username', 'password', {
  dialect: 'sqlite',
  storage: './wat.db',
  logging: (sql, _settings) => {
    console.log(sql);
  },
  pool: {
    max: 1,
    min: 1,
    evict: 0,
  },
  retry: {
    max: 20,
    match: [
      'SQLITE_BUSY: database is locked',
    ],
  },
});

const Employee = createEmployeeModel(sequelize);

export { sequelize, Employee };
