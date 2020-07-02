// load .env data into process.env
require('dotenv').config();

// Web server config
const PORT = process.env.PORT || 8080;
const ENV = process.env.ENV || "development";
const express = require("express");
const bodyParser = require("body-parser");
const sass = require("node-sass-middleware");
const app = express();
const morgan = require('morgan');

// PG database client/connection setup
const { Pool } = require('pg');
const dbParams = require('./lib/db.js');
const db = new Pool(dbParams);
db.connect();
// const usersRoute = require('./routes/users.js');

const { generateRandomString } = require("./helpers");
// const newUrl = generateRandomString();

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
const eventsRoutes = require("./routes/events");
// const widgetsRoutes = require("./routes/widgets");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own

// app.use("/api/users", usersRoutes.route(db));
// app.use("/api/events", eventsRoutes.route(db));
// we don't need this wigits line below
// app.use("/api/widgets", widgetsRoutes(db));

// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


// app.post('/add-dates-to-options', function (req, res) {

//   console.log('the_start_date:', req.body.startDate);
//   console.log('the_start_time:', req.body.startTime);
//   console.log('the_end_date:', req.body.endDate);
//   console.log('the_ens_time:', req.body.endTime);
//   // res.send(200)
// });

//--------- home -----------
// this section is all good


app.get("/", (req, res) => {
  res.redirect("/home");
});

app.get("/home", (req, res) => {
  res.render("index");
});

//--------- new event part 1 ---------
// this section has problems.

// get /new-event works great, no issues though there is a ? in the URL for some reason
app.get("/new-event", (req, res) => {
  res.render("new_event");
});

app.post('/dates/new', function (req, res) {
  console.log("=============== req: ", req.body)

  const parsedDates = [];
  req.body.dates.map(date => {
    parsedDates.push(JSON.parse(date))
  })

  const eventURL = [];
  eventURL.push(req.body.eventurl);
  // eventURL.push(JSON.parse(req.body.eventurl));
  console.log("============>>>", parsedDates)
  const eventIdQuery = `
  SELECT id FROM events
  WHERE uniqueurl = $1 ;
  `;

  const addOption = function (db, parsedDate, event_id) {
    const queryString = `


    INSERT INTO dates (event_id, start_date, start_time, end_date, end_time)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `;


    return db.query(queryString, [event_id, parsedDate.startDate, parsedDate.startTime, parsedDate.endDate, parsedDate.endTime])
      .then(res => {
        // console.log('addOption: ', option);
        console.log('we are here now: ', res.rows);
        return res.rows[0];
      })
      .catch(err => console.error('query error', err.stack))
  };

  db.query(eventIdQuery, eventURL)
    .then(res => {
      const eventId = res.rows[0].id

      parsedDates.map((date) => {
        addOption(db, date, eventId)
      })
    
    })
  // ${eventurl}

 



  // const option = { startDate: req.body.startDate, startTime: req.body.startTime, endDate: req.body.endDate, endTime: req.body.endTime }
 
  // res.redirect(`/events/${uniqueurl}`);
  res.send(200)
});

// let currentEventUniqueURL;

// this currently adds to the database
app.post("/new-event", (req, res) => {

  const randoString = generateRandomString();

  const user = { name: req.body.name, email: req.body.email };
  usersRoutes.addUser(db, user)
    .then(userDb => {
      const event = { user_id: userDb.id, title: req.body['event-name'], description: req.body.description, location: req.body.location, uniqueURL: randoString };
      eventsRoutes.addEvent(db, event)
        .then(() => {
          const templateVars = { randoString, event, user };
          res.render('date_options', templateVars);
        });
    })
    .catch(err => console.error('query error', err.stack));
});

app.get("/events/:uniqueurl", (req, res) => {
  // console.log("WE ARE HERE");
  const myURL = req.params.uniqueurl;

  usersRoutes.getUser(db, myURL)
    .then((row) => {
      // console.log("row: ", row);
      const templateVars = { event: row, myURL: myURL };
      res.render("events", templateVars);
    })

    .catch(err => console.error('query error', err.stack));
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
