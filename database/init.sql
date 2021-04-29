BEGIN;

DROP TABLE IF EXISTS users, parks CASCADE;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(255) NOT NULL UNIQUE, 
  password TEXT NOT NULL
);

CREATE TABLE parks (
  id SERIAL PRIMARY KEY,
  park_name TEXT,
  location VARCHAR(255)
);

CREATE TABLE park_comments (
id SERIAL PRIMARY KEY,
park_id INTEGER REFERENCES parks(id), -- related to the comment of the park. 
user_id INTEGER REFERENCES users(id) ON DELETE CASCADE, -- CASCADE means delete the post if the author gets deleted // different users can have different comments 
text_content TEXT
);



INSERT INTO users (username, password) VALUES
  ('Michael', '$2a$10$vzgLAxSa1k293giKSbVWi.GgSGmb1JB/kD1qWIg.mrUlt7UwVDCWG'),
  ('Nafisa', '$2a$10$vzgLAxSa1k293giKSbVWi.GgSGmb1JB/kD1qWIg.mrUlt7UwVDCWQ'),
  ('Evgeny', '$2a$10$vzgLAxSa1k293giKSbVWi.GgSGmb1JB/kD1qWIg.mrUlt7UwVDCWB'),
  ('Sevda', '$2a$10$vzgLAxSa1k293giKSbVWi.GgSGmb1JB/kD1qWIg.mrUlt7UwVDCWA');

  INSERT INTO parks (park_name, location) VALUES
  ('Battersea Park.', 'London, UK'),
  ('Hampstead Heath Park.', 'London, UK'),
  ('Primrose Hill Park.', 'London, UK'),
  ('London Fields', 'London, UK');


 INSERT INTO park_comments (park_id, user_id, text_content) VALUES
 (3, 2, 'Lovely time spent!'),
 (2, 1, 'Awesome! Definitely worth seeing'),
 (1, 3, 'Highly recommended!'),
 (4, 4, 'Great park and vibe!');

 DROP TABLE IF EXISTS sessions CASCADE;

CREATE TABLE sessions (
  sid TEXT PRIMARY KEY,
  data JSON NOT NULL
);

INSERT INTO sessions (sid, data) VALUES (
  'abc123',
  '{"test":"stuff"}'
);

COMMIT

-- serach for location, find park, go into each suggested park and look up the comments. 
-- What information we gonna need in every page? What would be the return value. 
-- One user can post several tables, if they were in the same table they wouldnt be able. 
-- When we have a fixed list of data we put the data into different tables for navigating through existing data more easily i.e. when using a large pre-existing database of park names. 
-- We have seperate tables to ensure data is not dublicated. s