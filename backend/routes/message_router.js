const express = require("express");
const router = express.Router();
const {protectRoute} = require("../middlewares/auth_middlewares.js");
const {arcjetProtection} = require("../middlewares/arcjet_middleware.js");
const {getAllContacts, getChatPartners, getMessagesByUserId, sendMessage} = require("../controllers/message_controller.js");


router.use(arcjetProtection, protectRoute);


router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);


module.exports = router;