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

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own

// app.use("/api/users", usersRoutes.route(db));
// app.use("/api/events", eventsRoutes.route(db));

// Note: mount other resources here, using the same pattern above


// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).


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

app.post('/dates/new', function (req, result) {
  const parsedDates = [];
  req.body.dates.map(date => {
    parsedDates.push(JSON.parse(date))
  });

  const eventURL = req.body.eventurl;

  const addOption = function (db, parsedDate, event_id) {
    const queryString = `
    INSERT INTO dates (event_id, start_date, start_time, end_date, end_time)
    VALUES ($1, $2, $3, $4, $5)
    RETURNING *;
    `;

    return db.query(queryString, [event_id, parsedDate.startDate, parsedDate.startTime, parsedDate.endDate, parsedDate.endTime])
      .then(res => {
        return res.rows;
      })
  };

  usersRoutes.eventIdQuery(db, eventURL)
    .then(event => {
      const eventId = event.id

      const datesPromises = parsedDates.map((date) => {
        return addOption(db, date, eventId)
      })
      return Promise.all(datesPromises)
    })
    .then(() => {
      result.redirect(`/events/${eventURL}`);
    })
    .catch((err) => {
      console.error(err)
      result.status(500).json(err)
    })
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
  const myURL = req.params.uniqueurl;
  const templateVars = {};

  let eventId;

  usersRoutes.getDates(db, myURL)
    .then((ans) => {
      let dates = [];
      ans.map((item) => {
        dates.push({
          startDate: item.start_date,
          startTime: item.start_time,
          endDate: item.end_date,
          endTime: item.end_time,
          dateId: item.id
        });
      });

      templateVars.dates = dates

      return true;

    })
    .then(() => usersRoutes.getUser(db, myURL))
    .then(() => usersRoutes.eventIdQuery(db, myURL))
    .then(result => {
      eventId = result.id;
      eventName = result.title;
      templateVars.eventId = eventId;
      templateVars.title = eventName;
      return usersRoutes.getUsersOfEvent(db, eventId)
    })
    .then(users => {
      templateVars.users = users;
      templateVars.myURL = myURL;
      return false
    })
    .then(() => {
      return usersRoutes.getResponsesOfEvent(db, eventId)
    })
    .then(responses => {
      templateVars.responses = responses;
      res.render("events", templateVars);
    })
    .catch(err => {
      console.error('query error', err.stack)
      res.status(500).send(err)
    });
});


app.post("/events/:uniqueurl/adduser", (req, res) => {
  const myURL = req.params.uniqueurl;
  const body = req.body;
  const dateIds = [];
  for (let bodyKey in body) {
    if (bodyKey !== 'email' && bodyKey !== 'name') {
      dateIds.push(bodyKey);
    }
  }
  const user = { name: req.body.name, email: req.body.email };
  usersRoutes.addUser(db, user)
    .then(() => {
      const templateVars = { user };
    })
    .then(() => {
      for (let dateId in dateIds) {
        usersRoutes.addResponses(db, user.email, dateIds[dateId])
      }
      res.redirect(`/events/${myURL}`);
    })
    .catch(err => console.error('query error', err.stack));
})

app.post("/events/:uniqueurl/delete", (req, res) => {
  const uniqueurl = req.params.uniqueurl;
  let userId;
  for(let key in req.body) {
    userId = req.body[key];
  }
  usersRoutes.getUser(db, uniqueurl)
    .then(res => {
      return usersRoutes.deleteResponsesWithUser(db, userId)})
    .then(() => {
  res.redirect(`/events/${uniqueurl}`);
})
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
