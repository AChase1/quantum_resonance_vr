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

        const haloFloorHighlight = document.createElement('a-entity');
        haloFloorHighlight.setAttribute('id', 'halo-floor-highlight');
        const haloFloorGeometry = new THREE.CircleGeometry(GlobalTracker.haloRadius, 32);
        const haloFloorMaterial = new THREE.MeshBasicMaterial({ color: 'red' });
        haloFloorHighlight.setObject3D('mesh', new THREE.Mesh(haloFloorGeometry, haloFloorMaterial));
        haloFloorHighlight.setAttribute('rotation', "-90 0 0");
        this.el.appendChild(haloFloorHighlight);

        this.previousCameraPosition = new THREE.Vector3();
    },

    tick: function () {
        const camera = document.getElementById('pov_cam');
        const haloFloorHighlight = document.getElementById('halo-floor-highlight');
        const currentCameraPosition = camera.object3D.position;
        const currentCameraRotation = camera.object3D.rotation;

        // Check if the camera's position has changed
        if (!currentCameraPosition.equals(this.previousCameraPosition)) {
            // Calculate the direction vector based on the camera's rotation
            const direction = new THREE.Vector3();
            camera.object3D.getWorldDirection(direction);

            // Update the position of the halo floor highlight
            const newPosition = currentCameraPosition.clone().add(direction.multiplyScalar(-9));
            haloFloorHighlight.setAttribute('position', { x: newPosition.x, y: 0, z: newPosition.z });

            // Update the previous camera position
            this.previousCameraPosition.copy(currentCameraPosition);
        }

    }
});