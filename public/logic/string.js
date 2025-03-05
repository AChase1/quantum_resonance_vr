AFRAME.registerComponent("string", {

    schema: {
        segments: { type: 'int', default: 40 },
        amplitude: { type: 'number', default: 0 },
        frequency: { type: 'number', default: 0 },
        length: { type: 'number', default: 0.7 },
        vibrationAmplitude: { type: 'number', default: 0.01 },
        vibrationFrequency: { type: 'number', default: 30 },
        color: { type: 'color', default: 'black' },
    },

    init: function () {
        this.createString();
        this.el.setAttribute("position", "1 -0.2 -1.5");
    },

    createString: function () {
        this.el.innerHTML = "";

        for (let i = 0; i < this.data.segments; i++) {
            let sphere = document.createElement("a-sphere");
            sphere.setAttribute("radius", "0.05");
            sphere.setAttribute("color", this.data.color);
            sphere.setAttribute("id", "node" + i);
            sphere.setAttribute("class", "interactive");
            this.el.appendChild(sphere);
        }
    },

    tick: function (time) {
        for (let i = 0; i < this.data.segments; i++) {
            const t = (i / this.data.segments) * Math.PI * 2;
            const x = this.data.amplitude * Math.sin(this.data.frequency * t);
            const y = (t - Math.PI) * (this.data.length / Math.PI);
            const z = 0;

            this.data.vibrationAmplitude = this.data.amplitude * 0.01;
            this.data.vibrationFrequency = this.data.frequency * 30;
            const vibration = this.data.vibrationAmplitude * Math.sin(this.data.vibrationFrequency * time / 1000);

            const sphere = this.el.querySelector("#node" + i);
            sphere.setAttribute("position", { x: x + vibration, y: y, z: z });
        }


    },
});