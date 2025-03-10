AFRAME.registerComponent("ui-mechanics", {
    init: function () {
        this.showControls = false;
        document.getElementById("controls-menu").style.display = "none";
        document.getElementById("controls-label").style.display = "block";
        document.querySelector("#user-gesture-button").style.display = "block";

        document.addEventListener("keydown", (event) => {
            if (event.key === "i") {
                if (this.showControls) {
                    document.getElementById("controls-menu").style.display = "none";
                    document.getElementById("controls-label").style.display = "block";
                    this.showControls = false;
                } else {
                    document.getElementById("controls-menu").style.display = "block";
                    document.getElementById("controls-label").style.display = "none";
                    this.showControls = true;
                }
            }
        });
    },
});