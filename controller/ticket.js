const Ticket = require("../models").Ticket;
const {Op} = require('sequelize');
const pdfMakePrinter = require("pdfmake/src/printer");
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

  try {
        const tempTag = Math.random().toString(8).substring(2, 6)+Math.random().toString(36).substring(2, 4)
        const tag = "Tick-" + tempTag;
        const ticketDetails = {
          title: req.body.title,
          description: req.body.description,
          userId: req.body.userId,
          tag
        };

        const ticket = await Ticket.create(ticketDetails);
        return res.status(201).json({status: true, message: "Ticket successfully added!", ticket})
  } catch (error) {
      return res.status(400).json({status: false, message: "An error occured while trying to run a query",error});
  }

};

// @desc      View all support ticket
// @route     Get /api/v1/ticket
// @access    Private
exports.getTickets = async (req, res) => {
  try {
        const tickets = await Ticket.findAll();
        return res.json(tickets)
  } catch (error) {
      return res.status(400).json({status: false, message: "An error occured while trying to run a query",error});
  }
};

// @desc      View all active support ticket
// @route     Get /api/v1/ticket/active
// @access    Private
exports.getActiveTickets = async (req, res) => {
  try {
        const tickets = await Ticket.findAll({where: {status: 0}});
        return res.json({status: true, count: tickets.length, tickets})
  } catch (error) {
      return res.status(400).json({status: false, message: "An error occured while trying to run a query",error});
  }
};

// @desc      View all active support ticket
// @route     Get /api/v1/ticket/closed
// @access    Private
exports.getClosedTickets = async (req, res) => {
  try {
        const tickets = await Ticket.findAll({where: {status: 1}});
        return res.json({status: true, count: tickets.length, tickets})
  } catch (error) {
      return res.status(400).json({status: false, message: "An error occured while trying to run a query",error});
  }
};

// @desc      View all user support ticket
// @route     Get /api/v1/ticket/user/:id
// @access    Private
exports.getUserTickets = async (req, res) => {
  try {
    //Check if user id is passed as request paramter
    if (!req.params.id || req.params.id === "") {
        return res.status(404).json({ status: false, message: "User id not found" });
    }

    const tickets = await Ticket.findAll({where: {userId: req.params.id}});
        return res.json({status: true, count: tickets.length, tickets})
  } catch (error) {
      return res.status(400).json({status: false, message: "An error occured while trying to run a query", error});
  }
};

// @desc      Close user support ticket
// @route     PUT /api/v1/ticket
// @access    Private
exports.closeTicket = async (req, res) => {
  try {
    //Check if logged user is an admin
    if (!req.body.role && req.body.role !== "admin") {
      return res.status(401).json({status: false, message: "You do not have required access to perform this action"});
    }

    //Update ticket status column to 1
    const ticket = await Ticket.update({ status: 1 }, { where: { id: req.body.id } });
        return res.json({status: true, message: "Ticket Successfully closed!", ticket});
  } catch (error) {
    return res.status(400).json({status: false, message: "An error occured while trying to run a query", error});
  }
};

// @desc      View support ticket by tag
// @route     Get /api/v1/ticket/tag/:id
// @access    Private
exports.getTicketByTag = async (req, res) => {
  try {
    const ticket = await Ticket.findOne({ where: { tag: req.params.id } });
    if(ticket){
        return res.json({ status: true, ticket });
    } else {
        return res.status(404).json({status: false, message: `Ticket with tag ${req.params.id} not found`})
    }
    
  } catch (error) {
    return res.status(400).json({status: false, message: "An error occured while trying to run a query", error});
  }
}

// @desc      View support ticket closed within one month
// @route     Get /api/v1/ticket/report
// @access    Private
exports.getTicketReport = async (req, res) => {

    try {
        const report = await Ticket.findAll({
          where: {
            status: 1,
            updatedAt: {
              [Op.between]: [new Date(new Date().setDate(0)), new Date()]
            }
          }
        });

        let bodyData = [
          ["Title", "Description", "Tag", "Date Created", "Date Edited"]
        ];

        report.forEach(reportItem => {
            let dataRow = []

            dataRow.push(reportItem.title)
            dataRow.push(reportItem.description);
            dataRow.push(reportItem.tag);
            dataRow.push(new Date(reportItem.createdAt).toISOString().slice(0, 10));
            dataRow.push(new Date(reportItem.updatedAt).toISOString().slice(0, 10));

            bodyData.push(dataRow)
        })

        const docDefinition = {
          content: [
            { text: "Report", style: "header" },
            {
                text:`This is a report of tickets closed in the last one month with total of ${report.length} tickets.`,
                style: "subheader"},
            {
              style: "tableExample",
              table: {
                body: bodyData
              }
            }
          ],
          styles: {
            header: {
              fontSize: 18,
              bold: true,
              margin: [0, 0, 0, 10],
              alignment: "center"
            },
            subheader: {
              fontSize: 14,
              bold: true,
              margin: [0, 10, 0, 5],
              alignment: "center"
            },
            tableExample: {
              margin: [0, 10, 0, 10],
              alignment: "center"
            },
            tableHeader: {
              bold: true,
              fontSize: 13,
              color: "black"
            }
          }
        };

         generatePdf(docDefinition, report => {
            res.setHeader("Content-Type", "application/pdf");
            return res.send(report);
        });
        
    } catch (error) {
        console.log(error)
        return res.status(400).json({status: false, message: "An error occured while trying to run a query", error});
    }
}

//Function to generate ticket report pdf
const generatePdf = async (docDefinition, successCallback, errorCallback) => {
  try {
    const fontDescriptors = {
      Roboto: {
        normal: "./fonts/Roboto-Regular.ttf",
        bold: "./fonts/Roboto-Medium.ttf",
        italics: "./fonts/Roboto-Italic.ttf"
      }
    };

    const printer = new pdfMakePrinter(fontDescriptors);
    const doc = printer.createPdfKitDocument(docDefinition);

    let chunks = [];
    let result;

    doc.on("data", function(chunk) {
      chunks.push(chunk);
    });

    doc.on("end", () => {
      result = Buffer.concat(chunks);
      successCallback(result);
    });

    doc.end();
  } catch (err) {
    throw err;
  }
};
