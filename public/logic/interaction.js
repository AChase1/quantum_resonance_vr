AFRAME.registerComponent("interaction", {
    init: function () {
        const camera = document.getElementById("pov_cam");
        const string = document.getElementById("string");


        document.addEventListener("contextmenu", function (event) {
            event.preventDefault();
        });

        this.el.addEventListener("mousemove", function (event) {
            this.mouse = new THREE.Vector2();
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            if (this.isRightClickingString) {
                string.setAttribute("string", "amplitude: " + this.mouse.x + "; frequency: " + this.mouse.y);
            }
        });

        this.el.addEventListener("mouseup", function (event) {
            if (event.button == 2 && this.isRightClickingString) {
                this.isRightClickingString = false;
            }
        });

        this.el.addEventListener("mousedown", function (event) {
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