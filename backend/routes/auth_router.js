const express = require("express");
const router = express.Router();
const {signup, login, logout, updateProfile} = require("../controllers/auth_controller.js");
const {protectRoute} = require("../middlewares/auth_middlewares.js");
const {arcjetProtection} = require("../middlewares/arcjet_middleware.js");


router.use(arcjetProtection);


router.post("/signup", signup);
router.post("/login", login);
router.post("/logout", logout);
router.put("/update-profile", protectRoute, updateProfile);


module.exports = router;