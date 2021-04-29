const db = require("../database/connection.js");

function get(request, response) {
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
<body>
    <h1>Recommend a park</h1>
    <form action="/parks" method="POST">
      <label for="park">Park name</label>
      <input type="text" id="park" name="park">

      <label for="location">Location</label>
      <input type="text" id="location" name="location">

      <label for="comment">Comment</label>
      <input type="text" id="comment" name="comment">

      <button type="submit">Add a park</button>
    </form>
        
</body>
</html>
    `)
};

function post(request, response) {
    const data = request.body;
    db.query(
            "INSERT INTO parks(park_name, location) VALUES($1, $2)",
            [data.park, data.location]
        )
            db.query(
                "INSERT INTO park_comments(text_content) VALUES($1)",
                [data.comment]
            )
   .catch((error) => {
       console.log(error)
   })
        .then(() => {
            response.redirect("/view-parks");
        });
}

module.exports = {get, post };