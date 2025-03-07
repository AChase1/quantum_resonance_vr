
AFRAME.registerComponent("halo-interface", {
    schema: {
        haloColor: { type: "color", default: "blue" },
        haloOpacity: { type: "number", default: 0.25 },
        stringTracker: { type: "int", default: 0 },
    },

    init: function () {
        this.stringEntries = Object.entries(stringPurposeMap);
        for (i = 0; i < this.stringEntries.length; i++) {
            this.createString(Object.keys(stringPurposeMap)[i]);
        }
        this.changeStringVisibility(true);
        this.createMorphs(GlobalTracker.numMorphs);
    },

    createMorphs: function (numMorphs) {
        for (let i = 0; i < numMorphs; i++) {
            const morph = document.createElement("a-entity");
            const camera = document.getElementById("pov_cam");
            camera.appendChild(morph);
            morph.setAttribute("morph", "");
        }
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