/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const addEvent = function(db, event) {

  const queryString = `
  INSERT INTO events (user_id, title, description, location, uniqueURL)
  VALUES ($1, $2, $3, $4, $5)
  RETURNING *;
  `;

  return db.query(queryString, [event.user_id, event.title, event.description, event.location, event.uniqueURL])
    .then(res => res.rows);
};
exports.addEvent = addEvent;
