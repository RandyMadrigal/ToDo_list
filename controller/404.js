exports.Error404 = (req, res, next) => {
  res.render("error", { layout: false });
};
