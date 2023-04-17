const express = require("express");
const router = express.Router();
const itemsController = require("../controller/items");

router.get("/index", itemsController.getIndex);

exports.router = router;
