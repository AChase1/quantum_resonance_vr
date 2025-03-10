class GlobalTracker {
    static currentStringId = "color";
    static haloRadius = 5;
    static numMorphs = 25;
    static disableMorphCreation = false;
    static instantiatedMorphCount = 0;
    static totalMorphsNeeded = 1000;
    static timerStarted = false;
    static timer = 300;
    static users = [];
    static totalVotes = 0;

    static getUserInfoString = (userId) => {
        if (GlobalTracker.users.includes(userId)) {
            console.log(GlobalTracker.users.indexOf(userId));
            const userNumber = GlobalTracker.users.indexOf(userId);
            return "User " + (userNumber + 1);
        } else {
            console.log("User not found");
        }
    }
}

const stringPurposeMap = { "color": "purple", "geometry": "blue", "size": "green", "position": "black", "internalRotationAngle": "orange", "emissiveIntensity": "yellow" };

const avatarColorMap = { 0x0055ff: 0xffa500, 0xffff00: 0x8a2be2, 0xff0000: 0x00ffff, 0x800000: 0x40e0d0 };