const express = require("express");
const passport = require("passport");
const protect = passport.authenticate("jwt", { session: false });

const router = express.Router();


module.exports = router;