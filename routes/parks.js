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
            ` <h2>Parks</h2>
        <ul>${parkList} </ul>
        <br> `
        response.send(html);

    })
}


module.exports = { getParks };