const express = require("express");
const router = express.Router();
const itemsController = require("../controller/items");

router.get("/index", itemsController.getIndex);
router.post("/index", itemsController.postAddItems);
exports.router = router;
