class GlobalTracker {
    static currentStringId = "color";
    static haloRadius = 5;
    static numMorphs = 25;
}

AFRAME.registerComponent("controller", {

    init: function () {
        const camera = document.getElementById("pov_cam");

        document.addEventListener("contextmenu", function (event) {
            event.preventDefault();
        });

        window.addEventListener("keydown", function (event) {
            const halo = document.getElementById("halo-interface");
            if (event.key == "q") {
                halo.components["halo-interface"].fetchNextString(false);
            } else if (event.key == "e") {
                halo.components["halo-interface"].fetchNextString(true);
            } else if (event.key == " ") {
                const scene = document.querySelector("a-scene");
                const worldPosition = new THREE.Vector3();
                const camera = document.getElementById("pov_cam");
                const morphs = Array.from(camera.children).filter(child => child.hasAttribute("morph"));
                morphs.forEach(morph => {
                    morph.object3D.getWorldPosition(worldPosition);
                    camera.removeChild(morph);
                    scene.appendChild(morph);
                    morph.setAttribute("position", worldPosition);
                });
                halo.components["halo-interface"].createMorphs(GlobalTracker.numMorphs)
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
                const camera = document.getElementById("pov_cam")
                const morphs = Array.from(camera.children).filter(child => child.hasAttribute("morph"));
                morphs.forEach(morph => {
                    const halo = document.getElementById("halo-interface");
                    const strings = Array.from(halo.children).filter(child => child.hasAttribute("string"));
                    for (let i = 0; i < strings.length; i++) {
                        const stringData = strings[i].components["string"].data;
                        const factor = stringData.frequency * (1 + stringData.amplitude * (Math.random() - 0.5) * 2);
                        morph.components["morph"].updateMorphProperties(strings[i], factor);
                    }
                });
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