import http from "http";
import { Server } from "socket.io";
import app from "./app.js";

const PORT = process.env.PORT || 5000;

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

io.on("connection", (socket) => {
    console.log("A user connected");
    socket.on("disconnect", () => console.log("A user disconnected"));
});

server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
