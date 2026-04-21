const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const auth_router = require("./routes/auth_router.js");
const message_router = require("./routes/message_router.js");
const {connectDB} = require("./lib/db.js");

dotenv.config();
const app = express();
app.use(express.json());
const __dirname__ = path.resolve();

app.use("/api/auth", auth_router);
app.use("/api/messages", message_router);


if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname__, "../frontend/dist")));

    app.use((req, res) => {
        res.sendFile(path.join(__dirname__, "../frontend", "dist", "index.html"));
    });
}

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log("Server Started");
    connectDB();
});