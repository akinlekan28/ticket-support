const express = require("express");
const passport = require('passport')
const protect = passport.authenticate("jwt", { session: false })
const {
  register,
  login,
  allUsers,
  deletedUsers,
  deleteUser
} = require("../controller/user");

const router = express.Router();

//register route
router.post("/register", register);
//login route
router.post("/login", login);
//get all active users
router.get('/', protect, allUsers)
//get all deleted users
router.get("/deleted", protect, deletedUsers);
//delete user
router.put("/delete/:id", protect, deleteUser);

module.exports = router;
