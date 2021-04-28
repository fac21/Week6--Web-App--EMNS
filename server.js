const express = require("express")
const server = express()
const cookieParser = require("cookie-parser")
const PORT = process.env.PORT || 3000;
const dotenv = require("dotenv")
dotenv.config();
const home = require("./routes/home.js");
const logIn = require("./routes/logIn.js")
const createEntry = require("./routes/createEntry.js")

server.use(express.urlencoded({ extended: false }));

server.use(cookieParser(process.env.COOKIE_SECRET));

server.get("/", home.get);
server.get("/login", logIn.get);
server.post("/login", logIn.post);
server.get("/parks", createEntry.get);
server.post("/parks", createEntry.post);


server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));