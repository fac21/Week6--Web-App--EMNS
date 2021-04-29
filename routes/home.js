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
    db.query("SELECT * FROM parks").then((result) => {
        const parks = result.rows;
        console.log(parks)
        let parkList = "";
        for (const park of parks) {
            const { id, park_name } = park;
            parkList += `
            <li>
              <span>${park_name}</span>
              <form action="/users/delete/" method="POST" class="inline">
                <button name="id" value="${id}" aria-label="Delete ${park_name}">
                  &times;
                </button>
              </form>
            </li>
          `;
        }
        const html = (
            `
          <h2>Parks</h2>
          <ul>${parkList}</ul>
        `
        );
        response.send(html);

        console.log(result)
    });
}

module.exports = { get };