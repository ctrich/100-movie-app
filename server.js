const express = require("express");
const app = express();
const mongoose = require("mongoose");
const passport = require("passport");
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);
const flash = require("express-flash");
const connectDB = require("./config/database");
const mainRoutes = require("./routes/main");
const authRoutes = require("./routes/auth");
const searchRoutes = require("./routes/search");
const infoRoutes = require("./routes/details");
const trailerRoutes = require("./routes/trailer");

require("dotenv").config({ path: "./config/.env" });

//passport config
require('./config/passport')(passport);

connectDB();

app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//sessions
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);

//Passport middleware]
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());

app.use("/", mainRoutes);
app.use("/auth", authRoutes);
app.use("/search", searchRoutes);
app.use("/details", infoRoutes);
app.use("/trailer", trailerRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
