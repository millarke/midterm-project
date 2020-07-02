DROP TABLE IF EXISTS dates CASCADE;

CREATE TABLE dates (
  id SERIAL PRIMARY KEY NOT NULL,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  -- what type should we use for the date?
  start_date DATE,
  start_time TIME,
  end_date DATE,
  end_time TIME
);