const express = require("express");
const router = express.Router();
const itemsController = require("../controller/items");

router.get("/index", itemsController.getIndex);
router.post("/index", itemsController.postAddItems);

router.get("/delete/:Id", itemsController.getDelete);
router.post("/delete", itemsController.postDelete);

router.get("/edit/:Id", itemsController.getEdit);
router.post("/edit", itemsController.postEdit);

exports.router = router;
