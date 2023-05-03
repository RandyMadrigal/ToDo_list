require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT || 3700;
const bodyParser = require("body-parser");
const path = require("path");
const expressHbs = require("express-handlebars"); //Engine view
const bcryptjs = require("bcryptjs"); //Encriptar contraseñas

//database
const sequelize = require("./util/database/database");
const AdminItems = require("./model/AdminItem");
const UsersModel = require("./model/Users");

//routes
const loginRouter = require("./routes/login");
const itemsRouter = require("./routes/items");

//Error Controller
const ErrorController = require("./controller/404");

const app = express();

app.engine(
  "hbs",
  expressHbs.engine({
    extname: "hbs",
    layoutsDir: "views/layouts",
    defaultLayout: "main-layouts",
  })
);

app.set("view engine", "hbs");
app.set("views", "./views");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(loginRouter.router);
app.use(itemsRouter.router);

app.use("/", ErrorController.Error404);

sequelize
  .sync({ force: true })
  .then((result) => {
    return UsersModel.findAll({ where: { UserName: process.env.USER_NAME } });
  })
  .then((user) => {
    if (!user) {
      const hash = bcryptjs.hashSync(`process.env.PASSWORD`, 8);

      UsersModel.create({
        Nombre: process.env.NOMBRE,
        Apellido: process.env.APELLIDO,
        UserName: process.env.USERNAME,
        Password: hash,
      });
    }
    return user;
  })
  .then((user) => {
    app.listen(PORT, () => {
      console.log("running in port " + PORT + " / Conexion  exitosa");
    });
  })
  .catch((err) => {
    console.log(err);
  });
