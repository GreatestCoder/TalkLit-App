const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();
const auth_router = require("./routes/auth_router.js");
const message_router = require("./routes/message_router.js");

app.use("/api/auth", auth_router);
app.use("/api/messages", message_router);

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server Started");
});