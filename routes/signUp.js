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
      margin-top: 30%;
      text-align: center;
      font-family: 'Montserrat';
      color: #206a5d;
    }
    
    label {
      text-align: center;
      font-family: 'Montserrat';
      color: #206a5d;
    }

    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 10px;
    }

    </style>
    <title>Parklife</title>
</head>

      <body>
      <h1>Create an account</h1>
      <form action="sign-up" method="POST">
        <label for="username">Username</label>
        <input type="text" id="username" name="username">
        <label for="password">Password</label>
        <input type="password" id="password" name="password">
        <button type="submit">Sign up</button>
      </form>
      </html>
      </body>
    `);
  }
  
  function post(request, response) {
    const { password, username } = request.body;
    console.log(password, username)
    auth.createUser( password, username)
    .then(auth.saveUserSession)
    .then((sid) => {
      response.cookie("sid", sid, auth.COOKIE_OPTIONS);
      response.redirect("/parks");
  });
  }
  module.exports = { get, post };
  