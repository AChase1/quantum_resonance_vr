AFRAME.registerComponent('universe-env', {
    init: function () {
        const floor = document.createElement('a-plane');
        floor.setAttribute('id', 'floor');
        floor.setAttribute('width', 1000);
        floor.setAttribute('height', 1000);
        floor.setAttribute('rotation', '-90 0 0');
        floor.setAttribute('color', 'white');
        this.el.appendChild(floor);
    },
});