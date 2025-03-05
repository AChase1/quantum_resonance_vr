const stringPurposeMap = { "color": "purple", "geometry": "blue", "size": "green", "position": "black", "internalRotationAngle": "orange", "emissiveIntensity": "yellow" };

AFRAME.registerComponent("halo-interface", {
    schema: {
        haloColor: { type: "color", default: "blue" },
        haloOpacity: { type: "number", default: 0.25 },
        stringTracker: { type: "int", default: 0 }
    },

    init: function () {
        this.stringEntries = Object.entries(stringPurposeMap);
        for (i = 0; i < this.stringEntries.length; i++) {
            this.createString(Object.keys(stringPurposeMap)[i]);
        }
        this.changeStringVisibility(true);
        this.createHalo();
    },

    createHalo: function () {
        const halo = document.createElement("a-entity");
        halo.setAttribute("id", "halo");
        const haloGeometry = new THREE.CylinderGeometry(GlobalTracker.haloRadius, GlobalTracker.haloRadius, 40, 20);
        const haloMaterial = new THREE.MeshStandardMaterial({ color: this.data.haloColor, transparent: true, opacity: this.data.haloOpacity });
        halo.setObject3D("mesh", new THREE.Mesh(haloGeometry, haloMaterial));
        halo.setAttribute("position", "0 -5 -9");
        this.el.appendChild(halo);
    },

    fetchNextString(isNextString) {
        this.changeStringVisibility(false);
        this.data.stringTracker = (this.data.stringTracker + (isNextString ? 1 : -1) + this.stringEntries.length) % this.stringEntries.length;
        this.changeStringVisibility(true);
    },

    changeStringVisibility(visibility) {
        const stringId = this.stringEntries[this.data.stringTracker][0];
        GlobalTracker.currentStringId = stringId;
        const currentString = document.getElementById(stringId);
        if (currentString != null) {
            currentString.setAttribute("visible", visibility);

        }
    },

    createString(purpose) {
        const string = document.createElement("a-entity");
        string.setAttribute("string", "color: " + stringPurposeMap[purpose]);
        string.setAttribute("id", purpose);
        string.setAttribute("visible", false);
        this.el.appendChild(string);
    }
});