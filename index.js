import { httpServer } from "./src/http_server/index.js";
import {startwsServer} from "./src/http_server/server.js";

const HTTP_PORT =  process.env.HTTP_PORT || 8181;
const port = process.env.PORT || 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(+HTTP_PORT);
startwsServer(+port)
