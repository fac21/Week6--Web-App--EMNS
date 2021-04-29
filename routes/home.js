const model = require("../database/model.js");
const db = require("../database/connection.js");


function get(request, response) {
  const sid = request.signedCookies.sid;
  if (sid) {
    model.getSession(sid).then((session) => {
      response.send(`
        <h1>Hello ${session.user.username}</h1>
        <form action="/log-out" method="POST">
          <button>Log out</button>
        </form>
      `);
    });
  } else {
    response.send(`
    <h1>Hello anonymous</h1>
    <a href="/sign-up">Sign up</a>
    <span> | </span>
    <a href="/log-in">Log in</a>
  `);
  }
}


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
        ` <h2>Parks</h2>
          <ul>${parkList} </ul>
          <br> `  
        response.send(html);
      
})
}


module.exports = { get };
