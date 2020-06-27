const express = require('express');
const router  = express.Router();
const app = express();
const PORT = 3000;


app.set("view engine", "ejs");



app.get("/new", (req, res) => {
  
  res.render("/new_event");
});


app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}!`);
});

