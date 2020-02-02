const Comment = require('../models').Comment
const Ticket = require('../models').Ticket
const User = require('../models').User

// @desc      Add comment to ticket
// @route     POST /api/v1/comment/
// @access    Private 
exports.addComment = async (req, res) => {
    const { commentText, ticketId } = req.body;
    if (commentText === '' || ticketId === '') {
      return res.status(403).json({ status: false, message: "Comment and Ticket Id cannot be empty" });
    }

    try {
        //Check if there's a comment with particular ticket id
        const ticketComment = await Comment.findOne({ where: { ticketId } });

        if (ticketComment) {
            //Comment exist then new comments can be added
            const newComment = await Comment.create({commentText, ticketId})
            return res.json({ status: true, newComment });
        }

        //Get user details along with ticket
        const checkRole = await Ticket.findOne({where: { id: ticketId, status: 0}, include: [{model: User}]});

        if(checkRole){
            //Checks if the poster of the first comment is an admin
            if(checkRole.User.role !== 'admin'){
                return res.status(401).json({status: false, message: "You cannot comment on this ticket unless an admin does"})
            }
                //If user is an admin post comment
                const newComment = await Comment.create({ commentText, ticketId });
                return res.json({ status: true, newComment });
        } else {
                //Ticket is closed therefore comments cannot be added
                return res.status(400).json({status: false, message: "Ticket has been closed therefore no comment is allowed"});
        }

        } catch (error) {
        return res.status(400).json({status: false, message: "An error occured while trying to run a query",error});
    }
}

// @desc      Get all comments
// @route     Get /api/v1/comment/
// @access    Private 
exports.getComments = async (req, res) => {
    try {
        const comments = await Comment.findAll();
        return res.json(comments)
    } catch (error) {
        return res.status(400).json({status: false, message: "An error occured while trying to run a query",error});
    }
}

// @desc      Get all comments for a ticket
// @route     Get /api/v1/comment/:id
// @access    Private
exports.getTicketComments = async (req, res) => {
    try {
        const comments = await Comment.findAll({where: {ticketId: req.params.id}});
        return res.json({status: true, count: comments.length, comments})
    } catch (error) {
        return res.status(400).json({status: false, message: "An error occured while trying to run a query",error});
    }
}