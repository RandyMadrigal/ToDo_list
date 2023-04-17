const express = require("express");
const port = 3900;
const bodyParser = require("body-parser");
const path = require("path");
const expressHbs = require("express-handlebars"); //Engine view
const bcryptjs = require("bcryptjs"); //Encriptar contraseñas

//routes
const itemsRouter = require("./routes/items");

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

app.use(itemsRouter.router);

app.listen(port, () => {
  console.log("the app is running in the port " + port);
});
