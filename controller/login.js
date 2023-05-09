const userModel = require("../model/Users");
const bcryptjs = require("bcryptjs");

exports.getLogin = (req, res, next) => {
  res.render("login/login", { Title: "Login", layout: "login-layouts" });
};

exports.postLogin = (req, res, next) => {
  const { UserName, Password } = req.body;

  userModel
    .findAll({ where: { UserName: UserName } })
    .then((result) => {
      const item = result.map((result) => result.dataValues);
      if (item.length < 1) {
        res.redirect("/");
      }
      bcryptjs
        .compare(Password, item[0].Password)
        .then((isEqual) => {
          if (isEqual) {
            res.redirect("index");
          }
          res.redirect("/");
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getCreateUser = (req, res, next) => {
  res.render("login/create-user", {
    Title: "Create-User",
    layout: "login-layouts",
  });
};
