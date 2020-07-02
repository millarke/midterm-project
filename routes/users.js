/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router = express.Router();

const addUser = function (db, user) {

  const queryString = `
  INSERT INTO users (name, email)
  VALUES ($1, $2)
  RETURNING *;
  `;

  return db.query(queryString, [user.name, user.email])
    .then(res => res.rows[0]);
  // .catch(err => console.error('query error', err.stack));
};
exports.addUser = addUser;

const getUser = function (db, uniqueURL) {

  const queryString = `
  SELECT *
  FROM users
  JOIN events
  ON users.id = events.user_id
  WHERE uniqueurl = $1;
  `;

  // console.log(queryString);

  return db.query(queryString, [uniqueURL])
    .then(res => res.rows[0])
    .catch(err => console.error('getUser: ', err.message));
};
exports.getUser = getUser;

const route = function (db) {
  router.get("/", (req, res) => {
    db.query(`
    SELECT * FROM users;
    `)
      .then(data => {
        const users = data.rows;
        res.json({ users });
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

const getDates = function (db, eventURL) {

  const queryString = `
  SELECT * FROM dates
  JOIN events ON dates.event_id = events.id 
  WHERE events.uniqueurl = $1;
  `;

  // console.log(queryString);

  return db.query(queryString, [eventURL])
    .then(res => res.rows[0])
    .catch(err => console.error('getDates: ', err.message));
};
exports.getDates = getDates;


const eventIdQuery = function (db, eventURL) {

  const queryString = `
    SELECT * FROM events
    WHERE events.uniqueurl = $1;
    `;
  return db.query(queryString, [eventURL])
    .then(res => res.rows[0])
};

exports.eventIdQuery = eventIdQuery;