const express = require("express");
const router = express.Router();
const loginController = require("../controller/login");
const isAuth = require("../middleware/is-auth");

router.get("/", loginController.getLogin);
router.post("/", loginController.postLogin);
router.post("/logOut", isAuth, loginController.postLogOut);
router.get("/create-user", loginController.getCreateUser);
router.post("/create-user", loginController.postCreateUser);

exports.router = router;
