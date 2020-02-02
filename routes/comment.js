const express = require("express");
const passport = require("passport");
const protect = passport.authenticate("jwt", { session: false });
const { addComment, getComments, getTicketComments } = require("../controller/comment");

const router = express.Router();

//Post and Get comments
router
  .route("/")
  .post(protect, addComment)
  .get(protect, getComments);

//Get ticket specific comments
router.get('/:id', protect, getTicketComments);

module.exports = router;
