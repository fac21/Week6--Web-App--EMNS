const model = require("../database/model.js");

function getLoginOptions(request, response) {
    const sid = request.signedCookies.sid;
    if (sid) {
        model.getSession(sid).then((session) => {
            response.send(`
            <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="description" content="Parklife">
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap" rel="stylesheet">
          <style>
          body {
            background-color: #f58634;
          }
          
          h1 {
            text-align: center;
            font-family: 'Montserrat';
            color: #206a5d;
          }
          
          </style>
          <title>Parklife</title>
      </head>
        <h1>Hello Parklifer! Log out below</h1>
        <form action="/log-out" method="POST">
          <button>Log out</button>
        </form>
      `);
        });
    } else {
        response.send(`
        <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="description" content="Parklife">
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@800&display=swap" rel="stylesheet">
          <link rel="stylesheet">
          <style>
          body {
            background-color: #f58634;
          }
          
          h1 {
            margin-top: 30%;
            text-align: center;
            font-family: 'Montserrat';
            color: #206a5d;
          }

          a {
            text-align: center;
            font-family: 'Montserrat';
            color: #206a5d;
            display: flex;
            justify-content: center;

          }
          
          </style>
          <title>Parklife</title>
      
      </head>
    <h1>Hello Unknown Genius! Sign up here</h1>
    <a href="/sign-up">Sign up</a>
    <span> | </span>
    <a href="/log-in">Log in</a>
  `);
    }
}

module.exports = { getLoginOptions };