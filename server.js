const express = require("express");
const server = express();
const cookieParser = require("cookie-parser");
const PORT = process.env.PORT || 3000;
const dotenv = require("dotenv");
dotenv.config();

const home = require("./routes/home.js");
const signUp = require("./routes/signUp.js")
const logIn = require("./routes/logIn.js")
const createEntry = require("./routes/createEntry.js")
const displayEntries = require("./routes/displayEntries.js")
// const staticHandler = express.static("public");

server.use(express.urlencoded({ extended: false }));

server.use(cookieParser(process.env.COOKIE_SECRET));

// server.use(express.static("public"));

console.log(process.env.COOKIE_SECRET);

server.get("/sign-up", signUp.get);
server.post("/sign-up", signUp.post);
server.get("/log-in", logIn.get);
server.post("/log-in", logIn.post);
server.get("/", home.get);
server.get("/parks", createEntry.get);
server.post("/parks", createEntry.post)
server.get("/view-parks", displayEntries.get);


server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));
