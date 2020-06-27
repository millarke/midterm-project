DROP TABLE IF EXISTS events CASCADE;

CREATE TABLE events (
  id SERIAL PRIMARY KEY NOT NULL,
  -- do we need or want on delete cascade here? double check how this works. we want events being deleted if users delete their accounts, but the problem is that we don't even have user accounts.
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  location VARCHAR(255),
  uniqueURL VARCHAR(255)
)
