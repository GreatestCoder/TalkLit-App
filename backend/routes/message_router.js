const express = require("express");
const router = express.Router();
const {send, receive} = require("../controllers/message_controller.js");

router.get("/send", send);
router.get("/receive", receive);

module.exports = router;