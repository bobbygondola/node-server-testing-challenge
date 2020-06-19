const express = require('express');
const helmet = require('helmet');
const morgan = require('morgan');
const server = express();

server.use(express());
server.use(morgan());
server.use(helmet());
server.use(express.json());

const requiresAuth = require('./auth/requires-auth');
const dbConnection = require('./data/data-config');
const authRouter = require("./auth/auth-router");
const facultyRouter = require('./faculty/faculty-router');
server.use("/api/auth", authRouter);
server.use("/api/faculty", requiresAuth, facultyRouter);

const session = require("express-session");
// const KnexSessionStore = require("connect-session-knex")(session);
const sessionConfig = {
  name: "Monkey",
  secret: "secret",
  cookie: {
    maxAge: 1000 * 60 * 10 * 60,
    secure: false,
    httpOnly: true,
  },
  resave: false,
  saveUninitialized: true,
//   store: new KnexSessionStore({
//     knex: dbConnection,
//     createtable: true,
//     clearInterval: 1000 * 60 * 60 * 24, // one day
//   }),
};
server.use(session(sessionConfig))



//test api :8007
server.get('/', (req,res) => {
    res.status(200).json({api: "is up lets goo"})
})


module.exports=server;