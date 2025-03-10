// --- SERVER & APP CONFIGURATION --- ///

const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const io = require("socket.io")(server);

const port = 8080;
const rootFile = "index.html";
const staticPath = __dirname + "/public";
app.get('/', function (req, res) {
    res.sendFile(rootFile, { root: staticPath });
});

let users = {};
let votes = {};
let totalVotes = 0;

/// --- SOCKET.IO CONFIGURATION --- ///
io.on("connection", (socket) => {
    console.log("User Connected: " + socket.id);
    const avatarColorMap = { 0x0055ff: 0xffa500, 0xffff00: 0x8a2be2, 0xff0000: 0x00ffff, 0x800000: 0x40e0d0 };

    users[socket.id] = { position: { x: 0, y: 1.6, z: 0 }, rotation: { x: 0, y: 0, z: 0 }, color: Object.entries(avatarColorMap)[0], voted: false };
    io.emit("fetchUsers", users);

    socket.on("sendVote", (chosenId) => {
        totalVotes++;

        if (votes[chosenId]) {
            votes[chosenId]++;
        } else {
            votes[chosen] = 1;
        }

        if (totalVotes >= Object.keys(users).length) {
            io.emit("retrieveWinner", getWinner(votes));
        }
    });

    function getWinner(map) {
        let winner = null;
        let highestValue = -Infinity;

        for (const [key, value] of Object.entries(map)) {
            if (value > highestValue) {
                highestValue = value;
                winner = key;
            }
        }
        return winner;
    }

    socket.on("sendTimer", (time) => {
        io.emit("retrieveTimer", time);
    });

    socket.on("sendMorphUpdate", (data) => {
        io.emit("retrieveMorphUpdates", data);
    });

    socket.on("sendUserUpdate", (data) => {
        if (users[socket.id]) {
            users[socket.id].position = data.position;
            users[socket.id].rotation = data.rotation;
            io.emit("retrieveUserUpdates", { id: socket.id, data: data });
        }
    });

    socket.on("disconnect", () => {
        console.log("User '" + socket.id + "' disconnected");
        delete users[socket.id];
        io.emit("removeUser", socket.id);
    });
});


app.use(express.static(staticPath));
server.listen(port);
console.log("Listening on port: " + port);