require("dotenv").config();

const express = require("express");
const PORT = process.env.PORT || 3700;
const bodyParser = require("body-parser");
const path = require("path");
const expressHbs = require("express-handlebars"); //Engine view
const bcrypt = require("bcrypt"); //Encriptar contraseñas
const session = require("express-session");
//database
const sequelize = require("./util/database/database");
const AdminItems = require("./model/AdminItem");
const UsersModel = require("./model/Users");
//routes
const loginRouter = require("./routes/login");
const itemsRouter = require("./routes/items");
//Error Controller
const ErrorController = require("./controller/404");
//store session
const store = require("connect-session-sequelize")(session.Store);
const myStore = new store({ db: sequelize });

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

app.use(
  session({
    secret: process.env.SECRET || "my secret",
    resave: false,
    saveUninitialized: false,
    store: myStore,
  })
);

//Session middleware
app.use((req, res, next) => {
  if (!req.session.user) {
    return next();
  }

  //console.log(req.session.user);

  UsersModel.findByPk(req.session.user.Id)
    .then((user) => {
      req.user = user.dataValues;
      next();
    })
    .catch((err) => {
      console.log(err);
      next();
    });
});

app.use(loginRouter.router);
app.use(itemsRouter.router);

app.use("/", ErrorController.Error404);

AdminItems.belongsTo(UsersModel, { constraint: true, onDelete: "CASCADE" });
UsersModel.hasMany(AdminItems);

//FIND OR CREATE METHOD TO USE A DEFAULT USER IN THE APP.
sequelize
  .sync()
  .then((result) => {
    const hash = bcrypt.hashSync(process.env.PASSWORD, 8);
    return UsersModel.findOrCreate({
      where: { UserName: process.env.USER_NAME },
      defaults: {
        Nombre: process.env.NOMBRE,
        Apellido: process.env.APELLIDO,
        UserName: process.env.USER_NAME,
        Password: hash,
      },
    });
  })
  .then((result) => {
    app.listen(PORT, () => {
      console.log("running in port " + PORT + " / Conexion  exitosa");
    });
  })
  .catch((err) => {
    console.log(err);
  });
