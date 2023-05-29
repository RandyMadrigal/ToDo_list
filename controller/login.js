const userModel = require("../model/Users");
const bcrypt = require("bcrypt");

exports.getLogin = (req, res, next) => {
  res.render("login/login", {
    Title: "Login",
    errorMessage: req.flash("error"),
    layout: "login-layouts",
  });
};

exports.postLogin = (req, res, next) => {
  const { UserName, Password } = req.body;

  userModel
    .findAll({ where: { UserName: UserName } })
    .then((result) => {
      const item = result.map((result) => result.dataValues);
      if (item.length < 1) {
        req.flash("error", "Invalid User");
        return res.redirect("/");
      }
      bcrypt
        .compare(Password, item[0].Password)
        .then((isEqual) => {
          if (isEqual) {
            req.session.user = item[0];
            req.session.IsLoggedIn = true;
            return res.redirect("index");
          }
          //password don't match
          req.flash("error", "Invalid password");
          res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      //Nombre de usuario ya esta ocupado!
      console.log(err);
    });
};

exports.postLogOut = (req, res, next) => {
  req.session.destroy((err) => {
    console.log(err);
    res.redirect("/");
  });
};

exports.getCreateUser = (req, res, next) => {
  res.render("login/create-user", {
    Title: "Create-User",
    errorMessage: req.flash("error"),
    layout: "login-layouts",
  });
};

exports.postCreateUser = (req, res, next) => {
  const { Nombre, Apellido, Email, UserName, Password, ConfirmPassword } =
    req.body;

  const hash = bcrypt.hashSync(Password, 8);

  const isEqual = bcrypt
    .compare(ConfirmPassword, hash)
    .then((isEqual) => {
      if (isEqual) {
        userModel
          .create({
            Nombre: Nombre,
            Apellido: Apellido,
            Email: Email,
            UserName: UserName,
            Password: hash,
          })
          .then((result) => {
            res.redirect("/");
          })
          .catch((err) => {
            req.flash("error", "the user is already in use");
            console.log(err);
            res.redirect("create-user");
          });
      } else {
        req.flash("error", "Confirm the Password");
        res.redirect("create-user");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
