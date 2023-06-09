const AdminItems = require("../model/AdminItem");

exports.getIndex = (req, res, next) => {
  const filterTitle = req.body.filterTitle;

  AdminItems.findAll({ where: { UserId: req.user.Id } })
    .then((result) => {
      const item = result.map((result) => result.dataValues); //Estandar
      res.render("index", {
        title: "home",
        Item: item,
        hasItems: item.length > 0,
        UserName: req.session.user.UserName,
        successful: req.flash("successful"),
      });
    })
    .catch((err) => {});
};

exports.postAddItems = (req, res, next) => {
  const { Titulo, Descripcion } = req.body;

  AdminItems.create({
    Titulo: Titulo,
    Descripcion: Descripcion,
    UserId: req.user.Id,
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
      res.render("edit", { title: "delete", Item: item });
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

exports.getEdit = (req, res, next) => {
  const Id = req.params.Id;
  const editMode = req.query.editMode;

  try {
    if (editMode) {
      AdminItems.findByPk(Id)
        .then((result) => {
          const item = result.dataValues;
          res.render("edit", { title: "Edit", Item: item, editMode: editMode });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      res.redirect("/index");
    }
  } catch (err) {
    console.log(err);
  }
};

exports.postEdit = (req, res, next) => {
  const { Id, Titulo, Descripcion } = req.body;

  AdminItems.update(
    { Titulo: Titulo, Descripcion: Descripcion },
    { where: { Id: Id } }
  );

  res.redirect("/Index");
};
