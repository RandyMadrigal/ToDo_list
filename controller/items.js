const AdminItems = require("../model/AdminItem");

exports.getIndex = (req, res, next) => {
  AdminItems.findAll({})
    .then((result) => {
      const item = result.map((result) => result.dataValues); //Estandar
      res.render("index", {
        title: "home",
        Item: item,
        hasItems: item.length > 0,
      });
    })
    .catch((err) => {});
};

exports.postAddItems = (req, res, next) => {
  const { Titulo, Descripcion } = req.body;

  AdminItems.create({
    Titulo: Titulo,
    Descripcion: Descripcion,
  })
    .then((result) => {
      console.log(result);
      res.redirect("/index");
    })
    .catch((err) => {
      console.log(err);
    });
};
