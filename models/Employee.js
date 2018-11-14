import Sequelize from 'sequelize';

export default function(sequelize) {
  const Employee = sequelize.define('Employee', {
    badgeNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false,
      get() {
        const title = this.getDataValue('title');
        // 'this' allows you to access attributes of the instance
        return this.getDataValue('name') + ' (' + title + ')';
      },
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      set(val) {
        this.setDataValue('title', val.toUpperCase());
      }
    }
  });

  return Employee;
}
