CREATE TABLE responses (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  date_id INTEGER REFERENCES dates(id) ON DELETE CASCADE,

  INSERT INTO responses (user_id, date_id) VALUES (1, 2)
  INSERT INTO responses (user_id, date_id) VALUES (1, 3)
  INSERT INTO responses (user_id, date_id) VALUES (2, 3)
  INSERT INTO responses (user_id, date_id) VALUES (1, 4)
  INSERT INTO responses (user_id, date_id) VALUES (1, 5)
  INSERT INTO responses (user_id, date_id) VALUES (2, 4)
  INSERT INTO responses (user_id, date_id) VALUES (3, 4)
