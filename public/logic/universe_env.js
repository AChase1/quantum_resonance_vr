AFRAME.registerComponent('universe-env', {

    schema: {
        numMorphs: { type: 'int', default: 500 },
        range: { type: 'int', default: 50 },
    },

    init: function () {
        for (let i = 0; i < this.data.numMorphs; i++) {
            const morph = document.createElement('a-entity');
            morph.setAttribute('morph', "objectPosRange: " + this.data.range);
            this.el.appendChild(morph);
        }

        const floor = document.createElement('a-plane');
        floor.setAttribute('id', 'floor');
        floor.setAttribute('width', 1000);
        floor.setAttribute('height', 1000);
        floor.setAttribute('rotation', '-90 0 0');
        floor.setAttribute('color', 'white');
        this.el.appendChild(floor);
    },
});