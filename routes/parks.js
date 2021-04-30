const model = require("../database/model.js");
const db = require("../database/connection.js");

function getParks(request, response) {
    db.query(`select parks.park_name, parks.location, park_comments.text_content from parks 
      left join park_comments on parks.id = park_comments.park_id`).then((result) => {
        const parks = result.rows;
        console.log(parks)
        let parkList = "";
        for (const park of parks) {
            const { id, park_name, location, text_content } = park;
            parkList += `
          <li>${park_name}</li>
          <li>${location}</li>
          <li>${text_content}</li>
       `
        }


        const html =
            `
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
            margin-top: 30%;
            text-align: center;
            font-family: 'Montserrat';
            color: #206a5d;
          }

          .parks {
            display: flex;
            flex-direction: column;
            justify-content: center;
            text-align: left;
            align-items: center;
            font-family: 'Montserrat';
            color: #206a5d; 
            list-style: none;
          }

          a {
            text-align: center;
            font-family: 'Montserrat';
            color: #206a5d;
            display: flex;
            justify-content: center;
          }
          
          </style>
            <h1>Parks</h1>
        <ul class="parks">${parkList} </ul>
        <br> 
        <a href="/">Home</a>
        `
        response.send(html);

    })
}


module.exports = { getParks };