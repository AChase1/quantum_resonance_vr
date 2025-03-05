AFRAME.registerComponent("string", {

    schema: {
        segments: { type: 'int', default: 40 },
        amplitude: { type: 'number', default: 0 },
        frequency: { type: 'number', default: 0 },
        length: { type: 'number', default: 1.3 },
    },

    init: function () {
        this.createString();
        const camera = document.getElementById("pov_cam");
        camera.appendChild(this.el);
        this.el.setAttribute("position", "0 0 -4");

    },

    createString: function () {
        this.el.innerHTML = "";

        for (let i = 0; i < this.data.segments; i++) {
            let sphere = document.createElement("a-sphere");
            sphere.setAttribute("radius", "0.1");
            sphere.setAttribute("color", "black");
            sphere.setAttribute("id", "node" + i);
            sphere.setAttribute("class", "interactive");
            this.el.appendChild(sphere);
        }
    },

    tick: function () {
        for (let i = 0; i < this.data.segments; i++) {
            const t = (i / this.data.segments) * Math.PI * 2;
            const x = this.data.amplitude * Math.sin(this.data.frequency * t);
            const y = (t - Math.PI) * (this.data.length / Math.PI);
            const z = 0;

            const sphere = this.el.querySelector("#node" + i);
            sphere.setAttribute("position", { x: x, y: y, z: z });
        }


    },
});