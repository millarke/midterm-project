// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT       = process.env.PORT || 8080;
const ENV        = process.env.ENV || "development";
const express    = require("express");
const bodyParser = require("body-parser");
const sass       = require("node-sass-middleware");
const app        = express();
const morgan     = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();
// const usersRoute = require('./routes/users.js');

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan('dev'));

app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/styles", sass({
  src: __dirname + "/styles",
  dest: __dirname + "/public/styles",
  debug: true,
  outputStyle: 'expanded'
}));
app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own

app.use("/api/users", usersRoutes.route(db));
app.use("/api/widgets", widgetsRoutes(db));

// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  res.render("index");
});

// app.get("/new", (req, res) => {
//   res.render("new_event");
// });

app.get("/new-event", (req, res) =>{
  res.render("new_event");
});

app.post("/new-event", (req, res) => {
  const user = {name: req.body.name, email: req.body.email};
  const event = {title: req.body['event-name'], description: req.body.description, location: req.body.location};

  usersRoutes.addUser(db, user);

  res.redirect('/choose-dates');
});

app.get("/events", (req, res) => {
  res.render("events");
});

app.get("/choose-dates", (req, res) => {
  res.render("date_options");
});



// sets the button to redirect to urls_login.

// app.post("/home", (req, res) => {
//   res.redirect("/");
// });


// app.post("/new-event", (req, res) => {
//   res.redirect("/new");
// });


// app.post("/create", (req, res) => {
//   res.redirect("/events");
// });ß

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
