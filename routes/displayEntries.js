const db = require("../database/connection.js");
const model = require("../database/model.js");

function get(request, response) {
  model.viewAllParks()
  .then((result) => {
    const parks = result.rows;
    let parkList = "";
    for (const park of parks) {
        const {id, park_name, location, text_content} = park;
        parkList += `
        <li>${park_name}</li>
        <li>${location}</li>
        <li>${text_content}</li>
     `
    }


      const html =    
      ` <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <meta http-equiv="X-UA-Compatible" content="IE=edge">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <meta name="description" content="Parklife">
          <title>Park recommender</title>
      </head>

      <body>
      
      <h2>Parks</h2>
        <ul>${parkList} </ul>
        <br> 
        </html>
        </body>
        `  
      response.send(html);
    
})
}

module.exports = { get };