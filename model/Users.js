const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../util/database/database");

const Users = sequelize.define(
  "Users",
  {
    Id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },

    Nombre: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { len: [1, 30] },
    },

    Apellido: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: { len: [1, 30] },
    },

    Email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
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
