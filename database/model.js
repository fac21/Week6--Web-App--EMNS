const { decodeBase64 } = require("bcryptjs");
const db = require("./connection.js");

function createUser(hash, username) {
  const INSERT_USER = `
    INSERT INTO users (password, username) VALUES ($1, $2)
    RETURNING id, username, password
  `;
  return db
    .query(INSERT_USER, [hash, username])
    .then((result) => result.rows[0]);
}

function getUser(username) {
  const SELECT_USER = `SELECT id, username, password FROM users WHERE username = $1`;
  return db.query(SELECT_USER, [username]).then((result) => result.row[0]);
}

function getSession(sid) {
  const SELECT_SESSION = "SELECT data FROM sessions WHERE sid=$1";
  return db.query(SELECT_SESSION, [sid]).then((result) => {
    const singleResult = result.rows[0];
    return singleResult && singleResult.data;
  });
}

function createSession(sid, data) {
  const INSERT_SESSION = `
    INSERT INTO sessions (sid, data) VALUES ($1, $2)
    RETURNING sid
  `;
  return db
    .query(INSERT_SESSION, [sid, data])
    .then((result) => result.rows[0].sid);
}

function viewAllParks(request, response) {
  return db.query(`select parks.park_name, parks.location, park_comments.text_content from parks 
    left join park_comments on parks.id = park_comments.park_id`)
}

module.exports = { createUser, getUser, getSession, createSession, viewAllParks };





