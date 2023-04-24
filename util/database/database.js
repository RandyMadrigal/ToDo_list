const Sequelize = require("sequelize");
const path = require("path");

//SQLITE
const sequelize = new Sequelize("sqlite::memory", {
  dialect: "sqlite",
  storage: path.join(
    path.dirname(require.main.filename),
    "util/database",
    "ToDoList.sqlite"
  ),
});

module.exports = sequelize;
