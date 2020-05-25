// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("express-session");
const cookieParser = require("cookie-parser");
var path = require("path");
const {verifyJWT, generateJWT} = require('./static/auth');
require("dotenv/config");


const app = express();


// Connect to DB
mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("Connected to DB");
});


app.use(bodyParser.json());


// Initialize cookie-parser to allow us access the cookies stored in the browser
app.use(cookieParser(process.env.COOKIE_SECRET));

// Initialize express-session to allow us track the logged-in user across sessions
app.use(
  session({ secret: process.env.COOKIE_SECRET, cookie: { maxAge: 60000 } })
);


// Import Routes
const usersRoute = require("./routes/users");
const notesRoute = require("./routes/notes");


// Verify the users JWT
app.use((req, res, next) => {

  const decoded = verifyJWT(req.cookies.user_jwt);
  if (!decoded) {
    res.clearCookie('user_jwt');
    req.session.user = {};
  } else {
    console.log("JWT exists");
    req.session.user = decoded;
  }

  next();
});


app.use("/api/users/", usersRoute); 
app.use("/api/notes/", notesRoute); 


// allows the app to use any necessary folders
// app.use("/front-end", express.static(__dirname + "/front-end"));
// app.use("/static", express.static(__dirname + "/static"));


// ROUTES
app.get("/", (req, res) => {
  res.json({ message: "Success" }); //test
});

// Route for handling 404 requests(unavailable routes)
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!");
});


// PORT
var port = process.env.PORT || 80;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
