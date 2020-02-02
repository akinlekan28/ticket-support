const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const hpp = require("hpp");
const cors = require("cors");
const passport = require("passport");
const morgan = require("morgan");

//import route files
const user = require("./routes/user");
const ticket = require("./routes/ticket");
const comment = require("./routes/comment");

const app = express();

// Load env vars
dotenv.config({ path: "./config/config.env" });

//Body parser
app.use(express.json());
// Set security headers
app.use(helmet());
// Prevent http param pollution
app.use(hpp());
// Enable CORS
app.use(cors());
// Dev logging middleware
// app.use(morgan("dev"));
//Passport Middleware
app.use(passport.initialize());
//Passport config
require("./utils/passport")(passport);

//Load models
const models = require("./models");

// Mount routers
app.use("/api/v1/user", user);
app.use("/api/v1/ticket", ticket);
app.use("/api/v1/comment", comment);

//Root url
app.get("/", function(req, res) {
  res.status(200).json({message:"Hello World"});
});

//express port
const PORT = process.env.PORT || 5000;

//Initialize express app to listen at port
app.listen(PORT, () => {
  models.sequelize
    .sync()
    .then(res => console.log("Database connection successful!!!"))
    .catch(err => console.log(err));
});

module.exports = app;