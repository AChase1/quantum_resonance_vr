

AFRAME.registerComponent("avatar", {

    schema: {
        color: { type: "color", default: 0x0055ff },
    },

    init: function () {
        this.createAvatarObjects();
    },

    createAvatarObjects: function () {
        const pColor = this.data.color;
        const sColor = avatarColorMap[this.data.color];

        const head = document.createElement("a-entity");
        const headGeometry = Geometry.sphere(0.2);
        const headMaterial = new THREE.MeshStandardMaterial({ color: sColor });
        head.setObject3D("mesh", new THREE.Mesh(headGeometry, headMaterial));

        const torso = document.createElement("a-entity");
        const torsoGeometry = Geometry.hexahedron(0.4, 0.9, 0.15);
        const torsoMaterial = new THREE.MeshStandardMaterial({ color: pColor });
        torso.setObject3D("mesh", new THREE.Mesh(torsoGeometry, torsoMaterial));
        torso.setAttribute("position", { x: 0, y: -0.6, z: 0 });

        const rArm = document.createElement("a-entity");
        const rArmGeometry = Geometry.hexahedron(0.1, 0.6, 0.1);
        const rArmMaterial = new THREE.MeshStandardMaterial({ color: sColor });
        rArm.setObject3D("mesh", new THREE.Mesh(rArmGeometry, rArmMaterial));
        rArm.setAttribute("position", { x: 0.2, y: -0.5, z: 0 });

        const lArm = document.createElement("a-entity");
        const lArmGeometry = Geometry.hexahedron(0.1, 0.6, 0.1);
        const lArmMaterial = new THREE.MeshStandardMaterial({ color: sColor });
        lArm.setObject3D("mesh", new THREE.Mesh(lArmGeometry, lArmMaterial));
        lArm.setAttribute("position", { x: -0.2, y: -0.5, z: 0 });

        const rLeg = document.createElement("a-entity");
        const rLegGeometry = Geometry.hexahedron(0.1, 0.6, 0.1);
        const rLegMaterial = new THREE.MeshStandardMaterial({ color: sColor });
        rLeg.setObject3D("mesh", new THREE.Mesh(rLegGeometry, rLegMaterial));
        rLeg.setAttribute("position", { x: 0.15, y: -1.3, z: 0 });

        const lLeg = document.createElement("a-entity");
        const lLegGeometry = Geometry.hexahedron(0.1, 0.6, 0.1);
        const lLegMaterial = new THREE.MeshStandardMaterial({ color: sColor });
        lLeg.setObject3D("mesh", new THREE.Mesh(lLegGeometry, lLegMaterial));
        lLeg.setAttribute("position", { x: -0.15, y: -1.3, z: 0 });

        this.el.appendChild(head);
        this.el.appendChild(torso);
        this.el.appendChild(rArm);
        this.el.appendChild(lArm);
        this.el.appendChild(rLeg);
        this.el.appendChild(lLeg);
    },
});