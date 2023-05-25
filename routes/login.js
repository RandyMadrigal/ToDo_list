const express = require("express");
const router = express.Router();
const loginController = require("../controller/login");

router.get("/", loginController.getLogin);
router.post("/", loginController.postLogin);
router.get("/create-user", loginController.getCreateUser);
router.post("/create-user", loginController.postCreateUser);

exports.router = router;
