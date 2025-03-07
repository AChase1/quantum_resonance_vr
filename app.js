// --- SERVER & APP CONFIGURATION --- ///

const express = require("express");
const app = express();
const port = 8080;
const rootFile = "index.html";
const staticPath = __dirname + "/public";
app.get('/', function (req, res) {
    res.sendFile(rootFile, { root: staticPath });
});

const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
server.listen(port);
app.use(express.static(staticPath));

console.log("Listening on port: " + port);

let users = {};

/// --- SOCKET.IO CONFIGURATION --- ///
io.on("connection", (socket) => {
    console.log("User Connected: " + socket.id);

    const avatarColorIndex = socket.id % 4;

    users[socket.id] = { position: { x: 0, y: 0, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, color: Object.entries(avatarColorMap)[avatarColorIndex] };

    io.emit("fetchUsers", users);

    io.emit("newPlayer", { id: socket.id, data: players[socket.id] });

    socket.on("sendUserUpdate", (data) => {
        if (users[socket.id]) {
            users[socket.id].position = data.position;
            users[socket.id].rotation = data.rotation;
            io.emit("retrieveUserUpdates", { id: socket.id, data: data });
        }
    });

    socket.on("disconnect", () => {
        console.log("User '" + socket.id + "' disconnected");
    });
});