const express = require("express");
const accountsRouter = require('./accounts/accountsRouter');

const server = express();

server.use(express.json());
server.use('/accounts', accountsRouter);

module.exports = server;
