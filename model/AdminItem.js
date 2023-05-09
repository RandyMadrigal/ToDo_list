const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database/database");

const AdminItem = sequelize.define("Items", {
  Id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
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
