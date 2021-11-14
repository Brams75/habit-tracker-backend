const express = require("express");
const userController = require("./controllers/userController.js");
const passport = require("passport");

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Welcome to the API habit-tracker");
});

router.post("/auth/register_login", (req, res, next) => {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return res.status(400).json({ errors: err });
    }
    if (!user) {
      return res.status(400).json({ errors: "No user found" });
    }
    req.logIn(user, function (err) {
      if (err) {
        return res.status(400).json({ errors: err });
      }
      return res.status(200).json({ success: `logged in ${user.id}` });
    });
  })(req, res, next);
});
router.delete("/deleteUser/:id", userController.deleteUser);

module.exports = router;
