import routes from "./routes.js";
import express from 'express';

const server = express();

server.use(express.json());
server.use(routes);

server.listen(3000)

export default server;