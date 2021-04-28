const model = require("../database/model")
const auth = require("../auth");


 const COOKIE_OPTIONS = {
    httpOnly: true,
    maxAge: 600000,
    sameSite: "strict",
    signed: true,
  };

  function get(request, response) {
    response.send(`
      <h1>Create an account</h1>
      <form action="sign-up" method="POST">
        <label for="username">Username</label>
        <input type="text" id="username" name="username">
        <label for="password">Password</label>
        <input type="password" id="password" name="password">
        <button type="submit">Sign up</button>
      </form>
    `);
  }
  
  function post(request, response) {
    const { password, username } = request.body;
    auth.createUser( password, username)
    .then(auth.saveUserSession)
    .then((sid) => {
      response.cookie("sid", sid, auth.COOKIE_OPTIONS);
      response.redirect("/");
  });
  }
  module.exports = { get, post };
  