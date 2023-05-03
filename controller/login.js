exports.getLogin = (req, res, next) => {
  res.render("login/login", { Title: "Login", layout: "login-layouts" });
};

exports.postLogin = (req, res, next) => {
  res.redirect("index");
};

exports.getCreateUser = (req, res, next) => {
  res.render("login/create-user", {
    Title: "Create-User",
    layout: "login-layouts",
  });
};
