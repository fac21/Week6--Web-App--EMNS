const crypto = require("crypto");
const bcrypt = require("bcryptjs");
const model = require("./database/model");

const COOKIE_OPTIONS = {
  httpOnly: true,
  maxAge: 600000,
  sameSite: "strict",
  signed: true,
};

function verifyUser(name, password) {
  return model.getUser(name).then((user) => {
    return bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        throw new Error("Password mismatch");
      } else {
        delete user.password;
        return user;
      }
    });
  });
}

function createUser(password, name) {
  return bcrypt.hash(password, 10).then((hash) => model.createUser(hash, name));
}

function saveUserSession(user) {
  const sid = crypto.randomBytes(18).toString("base64");
  return model.createSession(sid, { user });
}

module.exports = {
  COOKIE_OPTIONS,
  verifyUser,
  createUser,
  saveUserSession,
};
