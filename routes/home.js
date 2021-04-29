const model = require("../database/model.js");
const db = require("../database/connection.js");


function get(request, response) {
  const sid = request.signedCookies.sid;
  if (sid) {
    model.getSession(sid).then((session) => {
      response.send(`<!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="description" content="Parklife">
          <title>Park recommender</title>
      </head>

      <body>
        <img src="/parklife.png">
        <form action="/log-out" method="POST">
          <button>Log out</button>
        </form>
        </html>
        </body
      `);
    });
  } else {
    response.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="Parklife">
        <title>Park life</title>
    </head>

    <body>
      <img src="/parklife.png">
    <a href="/sign-up">Sign up</a>
    <span> | </span>
    <a href="/log-in">Log in</a>
  `);
  }
}



module.exports = { get };
