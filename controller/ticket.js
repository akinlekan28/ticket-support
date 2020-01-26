const Ticket = require("../models").Ticket;
const validateTicketInput = require('../validation/ticket');

// @desc      Add support ticket
// @route     POST /api/v1/ticket/
// @access    Private
exports.addTicket = async (req, res) => {
  //Validate req body
  const { errors, isValid } = validateTicketInput(req.body);

  //Return invalid errors as response
  if (!isValid) {
    return res.status(400).json(errors);
  }
  res.json(req.body)
};
