import "dotenv/config";
import app from "./src/app.js";
import http from "http";
import connectDB from "./src/config/database.js";
import { initSocket } from "./src/sockets/server.socket.js";

const PORT = process.env.PORT || 8000;

const httpServer = http.createServer(app);
initSocket(httpServer);

// Connect DB
connectDB().then(() => {
  httpServer.listen(PORT, () => {
    console.log("server is running", PORT);
  });
});
