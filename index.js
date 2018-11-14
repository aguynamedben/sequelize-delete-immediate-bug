import Sequelize from 'sequelize';

import { Employee, sequelize } from './models';

async function main() {
  await Employee.sync({ force: true });

  const jims = await Employee.findAll({
    where: {
      name: 'Jim',
    },
  });
  console.log(`There are ${jims.length} Jims`);

  await sequelize.transaction({ type: 'IMMEDIATE' }).then((t) => {
    return Employee.destroy(
      { where: { badgeNumber: { [Sequelize.Op.in]: ['1', '2', '3'] } } },
      { transaction: t },
    )
      .then(() => {
        // Insert the docs
        return Employee.bulkCreate([
          { badgeNumber: '4', name: 'Jim Jack', title: 'CEO' },
          { badgeNumber: '5', name: 'Jim Jones', title: 'CTO' },
          { badgeNumber: '6', name: 'Jim John', title: 'CFO' },
        ], { transaction: t });
      })
      .then(() => t.commit())
      .catch(() => t.rollback());
  });
}

main();
