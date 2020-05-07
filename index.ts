import Server from "./class/server";
import router from "./routes/router";
import bodyParser from "body-parser";
import cors from "cors";

const server = new Server();

// Body Parser
server.app.use( bodyParser.urlencoded({ extended: true }) );
server.app.use(bodyParser.json());

// CORS
/* Cualquier persona puede consumir el servicio gracias al cors*/
server.app.use( cors({ origin: true, credentials: true }) );

// Rutas de servicio
server.app.use('/',  router);




server.start( () => {
    console.log(`Servidor corriendo en el puerto: ${ server.port }`);
});

