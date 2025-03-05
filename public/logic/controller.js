class GlobalTracker {
    static currentStringId = "color";
    static haloRadius = 5;
}

AFRAME.registerComponent("controller", {

    init: function () {
        const camera = document.getElementById("pov_cam");

        document.addEventListener("contextmenu", function (event) {
            event.preventDefault();
        });

        window.addEventListener("keydown", function (event) {
            const halo = document.getElementById("halo");
            if (event.key == "q") {
                console.log("q pressed");
                halo.components["halo"].fetchNextString(false);
            } else if (event.key == "e") {
                console.log("e pressed");
                halo.components["halo"].fetchNextString(true);
            }
        });

        this.el.addEventListener("mousemove", function (event) {
            const string = document.getElementById(GlobalTracker.currentStringId);
            this.mouse = new THREE.Vector2();
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            if (this.isRightClickingString) {
                string.components["string"].data.amplitude = this.mouse.x;
                string.components["string"].data.frequency = this.mouse.y;
            }
        });

        this.el.addEventListener("mouseup", function (event) {

            if (event.button == 2 && this.isRightClickingString) {
                this.isRightClickingString = false;
            }
        });

        this.el.addEventListener("mousedown", function (event) {
            const string = document.getElementById(GlobalTracker.currentStringId);
            // disables default browser right click functionality
            event.preventDefault();

            if (event.button == 2) {
                // creates raycaster to check for intersection with string
                const raycaster = new THREE.Raycaster();
                raycaster.setFromCamera(this.mouse, camera.getObject3D('camera'));
                const intersects = raycaster.intersectObject(string.object3D, true);

                if (intersects.length > 0) {
                    this.isRightClickingString = true;
                }
            }
        });
    },
});