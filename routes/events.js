/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const addEvent = function(db, event) {

  // const queryString = `
  // INSERT INTO events (user_id, title, description, location, uniqueURL)
  // VALUES ($1, $2, $3, $4, $5)
  // RETURNING *;
  // `;

  const queryString = `
  INSERT INTO events (user_id, title, description, location, uniqueURL)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `;

  return db.query(queryString, [1, event.title, event.description, event.location, event.uniqueURL])
  // return db.query(queryString, [event.name, event.title, event.description, event.location, event.uniqueURL])
    .then(res => res.rows)
    .catch(err => console.error('query error', err.stack));
};
exports.addEvent = addEvent;

// this doesn't actually do anything yet, if we want it to we'll need to change the route variable at the bottom here and in users.js and both in server.js
const route = function(db) {
  router.get("/", (req, res) => {
    db.query(`
    SELECT * FROM events;
    `)
      .then(data => {
        const events = data.rows;
        res.json({ events });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });
  return router;
};
exports.route = route;

