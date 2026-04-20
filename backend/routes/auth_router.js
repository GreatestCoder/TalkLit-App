const express = require("express");
const router = express.Router();
const {signup, login, logout} = require("../controllers/auth_controller.js");

router.get("/signup", signup);
router.get("/login", login);
router.get("/logout", logout);

module.exports = router;