// Dependencies
const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const session = require("cookie-session");
const cookieParser = require("cookie-parser");
var path = require("path");
var cors = require('cors');
require("dotenv/config");

var app = express();

app.use(cors());

// Connect to DB
mongoose.set("useUnifiedTopology", true);
mongoose.set("useCreateIndex", true);
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true }, () => {
  console.log("Connected to DB");
});

// Serve the static files from the React app
app.use(express.static(path.resolve(__dirname, "../client/build")));

app.use(bodyParser.json());

// Initialize cookie-parser to allow us access the cookies stored in the browser
app.use(cookieParser(process.env.COOKIE_SECRET));

// initialize express-session to allow us track the logged-in user across sessions.
app.use(
  session({
    name: "memento-session",
    secret: process.env.COOKIE_SECRET,
    cookie: { maxAge: 300000 },
  })
);

app.use((req, res, next) => {
  if (!req.session.user) {
    req.session.user = {};
  }
  next();
});


// Import Routes
const usersRoute = require("./routes/users");
const notesRoute = require("./routes/notes");
app.use("/api/users/", usersRoute); 
app.use("/api/notes/", notesRoute); 

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/build/index.html"));
});

// PORT
var port = process.env.PORT || 80;

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
