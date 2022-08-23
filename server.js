const express = require("express");
const app = express();
const mongoose = require("mongoose");
//const session = require("express-session");
//const MongoStore = require("connect-mongo")(session);
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");

require("dotenv").config({ path: "./config/.env" });

connectDB();

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use("/", mainRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
