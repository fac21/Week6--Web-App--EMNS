const db = require("../database/connection.js");

function get(request, response) {
    db.query(`select parks.park_name, parks.location, park_comments.text_content from parks 
      left join park_comments on parks.id = park_comments.park_id`).then((result) => {
      const parks = result.rows;
      console.log(parks)
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