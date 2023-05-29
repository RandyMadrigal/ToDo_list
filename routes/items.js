const express = require("express");
const router = express.Router();
const itemsController = require("../controller/items");
const isAuth = require("../middleware/is-auth");

router.get("/index", isAuth, itemsController.getIndex);
router.post("/index", isAuth, itemsController.postAddItems);

router.get("/delete/:Id", isAuth, itemsController.getDelete);
router.post("/delete", isAuth, itemsController.postDelete);

router.get("/edit/:Id", isAuth, itemsController.getEdit);
router.post("/edit", isAuth, itemsController.postEdit);

exports.router = router;
