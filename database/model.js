const { decodeBase64 } = require("bcryptjs");

function getUser(username) {
  const SELECT_USER = `SELECT id, username, password FROM users WHERE username = $1`;
  return db.query(SELECT_USER, [username]).then((result) => result.row[0]);
}

module.exports = { getUser };
