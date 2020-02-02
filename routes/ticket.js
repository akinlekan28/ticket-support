const express = require("express");
const passport = require("passport");
const protect = passport.authenticate("jwt", { session: false });
const {
  addTicket,
  getTickets,
  getActiveTickets,
  getClosedTickets,
  getUserTickets,
  closeTicket,
  getTicketByTag,
  getTicketReport,
  getTicketWithComments
} = require("../controller/ticket");

const router = express.Router();

//create ticket, close ticket & get all tickets route
router
  .route("/")
  .post(protect, addTicket)
  .put(protect, closeTicket)
  .get(protect, getTickets);

//get closed ticket routes
router.get("/closed", protect, getClosedTickets);

//get active ticket routes
router.get("/active", protect, getActiveTickets);

//get user tickets
router.get("/user/:id", protect, getUserTickets);

//get ticket by tag
router.get("/tag/:id", protect, getTicketByTag);

//get ticket with comments
router.get('/comments/:id', protect, getTicketWithComments)

//get ticket report
router.get("/report", protect, getTicketReport);

module.exports = router;
