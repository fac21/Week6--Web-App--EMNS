const db = require("../database/connection.js");

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

module.exports = {get };