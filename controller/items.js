const AdminItems = require("../model/AdminItem");

exports.getIndex = (req, res, next) => {
  AdminItems.findAll()
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

exports.getDelete = (req, res, next) => {
  const Id = req.params.Id;

  AdminItems.findByPk(Id)
    .then((result) => {
      const item = result.dataValues;
      res.render("delete", { title: "delete", Item: item });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.postDelete = (req, res, next) => {
  const Id = req.body.Id;

  try {
    AdminItems.destroy({ where: { Id: Id } });
    console.log("Eliminado con exito");
  } catch (error) {
    console.log(err);
  }
  res.redirect("/index");
};
