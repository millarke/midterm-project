DROP TABLE IF EXISTS responses CASCADE;

CREATE TABLE responses (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  date_id INTEGER REFERENCES dates(id) ON DELETE CASCADE
  -- don't need this bool --
  -- response BOOLEAN DEFAULT 'false'
);
