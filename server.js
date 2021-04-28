const express = require("express")
const server = express()
const cookieParser= require("cookie-parser")
const PORT= process.env.PORT || 3000;
const dotenv = require("dotenv")
dotenv.config();

const logIn = require("./routes/logIn.js")

server.use(express.urlencoded({ extended: false }));

server.use(cookieParser(process.env.COOKIE_SECRET));

server.get("/login", logIn.get)
server.post("/login", logIn.post)

server.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));