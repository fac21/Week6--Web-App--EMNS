const db = require("./connection.js");

function getUser(name) {
    const SELECT_USER = `SELECT id, name, password FROM users WHERE name = $1`
    return db.query(SELECT_USER, [name]).then((result) => result.rosw[0])
}

module.exports = { getUser }