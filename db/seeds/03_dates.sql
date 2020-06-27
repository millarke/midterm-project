CREATE TABLE dates (
  id SERIAL PRIMARY KEY NOT NULL,
  event_id INTEGER REFERENCES events(id) ON DELETE CASCADE,
  -- what type should we use for the date?
  date TIMESTAMP
);

INSERT INTO dates (event_id, date) VALUES (1, '2020-06-29 04:05:00')
INSERT INTO dates (event_id, date) VALUES (1, '2020-06-30 04:05:00')
INSERT INTO dates (event_id, date) VALUES (1, '2020-07-01 04:05:00')
INSERT INTO dates (event_id, date) VALUES (2, '2020-06-29 06:05:00')
INSERT INTO dates (event_id, date) VALUES (2, '2020-06-30 06:05:00')
INSERT INTO dates (event_id, date) VALUES (2, '2020-07-01 06:05:00')
INSERT INTO dates (event_id, date) VALUES (3, '2020-06-28 07:05:00')
INSERT INTO dates (event_id, date) VALUES (3, '2020-06-29 07:05:00')
INSERT INTO dates (event_id, date) VALUES (3, '2020-06-30 07:05:00')
INSERT INTO dates (event_id, date) VALUES (3, '2020-07-01 07:05:00')
