 const model = require("../database/model")


 const COOKIE_OPTIONS = {
    httpOnly: true,
    maxAge: 600000,
    sameSite: "strict",
    signed: true,
  };

function get (request, response) {
   response.send( `
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
    <title>Park recommender</title>
</head>
<body>
    <h1>Log in</h1>
    <form action="log-in" method="POST">
      <label for="name">Name</label>
      <input type="text" id="name" name="name">
      <label for="password">Password</label>
      <input type="password" id="password" name="password">
      <button type="submit">Log in</button>
    </form>
        
</body>
</html>
`)
}
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


function saveUserSession(user) {
    const sid = crypto.randomBytes(18).toString("base64");
    return model.createSession(sid, { user });
  }

function post(request,response) {
    const {name, password} = request.body
    verifyUser(name, password)
    .then(saveUserSession)
    .then((sid) => {
        response.cookie("sid", sid, COOKIE_OPTIONS)
        response.redirect("/parks");
    })
    .catch((error) => {
        console.error(error)
        response.send(`</h1>Username or password is incorrect</h1>`)
    })
}


module.exports={ get, post }