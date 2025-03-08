const socket = io();
const avatar = document.getElementById("avatar");
const otherUsersContainer = document.getElementById("other-users");
let otherUsers = [];


socket.on("retrieveUserUpdates", ({ id, data }) => {
    if (otherUsers[id]) {
        otherUsers[id].setAttribute("position", data.position);
        otherUsers[id].setAttribute("rotation", data.rotation);
    }
});

socket.on("fetchUsers", (users) => {
    Object.entries(users).forEach(([id, data]) => addOtherUser(id, data));
});

socket.on("removePlayer", (id) => {
    if (otherUsers[id]) {
        remotePlayers[id].remove();
        delete remotePlayers[id];
    }
});

setInterval(() => {
    const position = avatar.getAttribute("position");
    const rotation = avatar.getAttribute("rotation");
    const color = avatar.components["avatar"].data.color;
    socket.emit("sendUserUpdate", { position, rotation, color });
}, 100);

function addOtherUser(id, data) {
    const avatar = document.createElement("a-entity");
    avatar.setAttribute("avatar", "color: " + data.color);
    avatar.setAttribute("position", data.position);
    avatar.setAttribute("rotation", data.rotation);
    avatar.setAttribute("id", id);
    otherUsersContainer.appendChild(avatar);
    otherUsers[id] = avatar;
}