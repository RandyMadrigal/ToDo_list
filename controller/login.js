require("dotenv").config();

const userModel = require("../model/Users");
const bcrypt = require("bcrypt");
const Transporter = require("../services/sendEmail");

exports.getLogin = (req, res, next) => {
  res.render("login/login", {
    Title: "Login",
    errorMessage: req.flash("error"),
    infoMessage: req.flash("info"),
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
            req.flash("successful", "Hi " + item[0].UserName + " :D");
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

  //Check Email.
  userModel
    .findAll({ where: { Email: Email } })
    .then((result) => {
      const user = result.map((result) => result.dataValues);
      console.log(user.length);
      if (user.length > 0) {
        req.flash("error", "the Email is already in use");
        res.redirect("create-user");
      }
    })
    .catch((err) => {
      console.log(err);
    });

  //Check UserName
  userModel
    .findAll({ where: { UserName: UserName } })
    .then((result) => {
      const user = result.map((result) => result.dataValues);
      console.log(user.length);
      if (user.length > 0) {
        req.flash("error", "the User is already in use");
        res.redirect("create-user");
      }
    })
    .catch((err) => {
      console.log(err);
    });

  //password and confirm password
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
            req.flash("info", "your user has been created successfully");
            res.redirect("/");

            return Transporter.send({
              to: Email,
              from: process.env.SENDER,
              subject: "your user has been created successfull - " + Nombre,
              html: "<strong>Welcome to ToDoApp W'Nodejs c: </strong>",
            })
              .then((response) => {
                console.log(response[0].statusCode);
                console.log(response[0].headers);
              })
              .catch((err) => {
                console.log(
                  err +
                    " Unauthorized, u need a API KEY to use the email services"
                );
              });
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        req.flash("error", "Wrong Password");
        res.redirect("create-user");
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
