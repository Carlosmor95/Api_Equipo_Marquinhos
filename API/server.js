import routes from "./routes.js";

import express from 'express';

const server = express();

server.use(routes);
server.use(express.json());

server.listen(3000)

export default server;