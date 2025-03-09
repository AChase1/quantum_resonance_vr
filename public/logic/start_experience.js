AFRAME.registerComponent("start-experience", {
    init: function () {
        // force user to click "Enter Experience" button
        document.querySelector("#user-gesture-button").style.display =
            "block";
    },
});



// called when user clicks initial button
const startExperience = function () {
    // hide button
    document.querySelector("#user-gesture-overlay").style.display = "none";

    //play ambient sound
    const ambientSounds = document.querySelectorAll(".background-sound");
    ambientSounds.forEach(function (soundEntity) {
        soundEntity.components["sound"].playSound();
    });

    updateTimer();
};

let countdown = 300;
function updateTimer() {
    document.getElementById('timer').innerText = `Plank Epoch Ends in: ${countdown}`;
    countdown--;

    if (countdown >= 0) {
        setTimeout(updateTimer, 1000);
    } else {
        document.getElementById('timer').innerText = "Time's up!";
    }
}
