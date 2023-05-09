const { Sequelize } = require("sequelize");
const sequelize = require("../util/database/database");

const Users = sequelize.define(
  "Users",
  {
    Id: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    Nombre: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: { len: [1, 20] },
    },

    Apellido: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { len: [1, 20] },
    },

    UserName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      validate: { len: [1, 20] },
    },

    Password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  },

  {
    timestamps: true,
    createdAt: true,
    updatedAt: false,
  }
);

module.exports = Users;
