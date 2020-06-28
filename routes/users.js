/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();

const addUser = function(db, user) {

  const queryString = `
  INSERT INTO users (name, email)
  VALUES ($1, $2)
  RETURNING *;
  `;

  return db.query(queryString, [user.name, user.email])
    .then(res => res.rows)
    .catch(err => console.error('query error', err.stack));
};
exports.addUser = addUser;


const route = function(db) {
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

