require("dotenv").config();
const PORT = process.env.PORT | 5050;
const express = require("express");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const mongoose = require("mongoose");
const passport = require("./app/passport/setup.js");
const router = require("./app/router.js");

const app = express();

mongoose.connect(process.env.MONGODB, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
  session({
    secret: "very secret this is",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({ mongoUrl: process.env.MONGODB }),
  })
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.use("/api", router);

app.listen(PORT, () => {
  console.log(`App listening at http://localhost:${PORT}`);
});
