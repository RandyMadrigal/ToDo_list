const Sequelize = require("sequelize");
const sequelize = require("../util/database/database");

const AdminItem = sequelize.define("Items", {
  Id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  Titulo: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  Descripcion: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

module.exports = AdminItem;
