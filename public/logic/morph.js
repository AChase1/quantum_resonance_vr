class Geometry {
    static tetrahedron = (radius) => new THREE.TetrahedronGeometry(radius, 0);

    static hexahedron = (width, height, depth) => new THREE.BoxGeometry(width, height, depth);

    static octahedron = (radius) => new THREE.OctahedronGeometry(radius, 0);

    static dodecahedron = (radius) => new THREE.DodecahedronGeometry(radius, 0);

    static icosahedron = (radius) => new THREE.IcosahedronGeometry(radius, 0);

    static sphere = (radius) => new THREE.SphereGeometry(radius, 32, 32);

    static torus = (radius, tubeRadius) => new THREE.TorusGeometry(radius, tubeRadius);

    static torusKnot = (radius, tubeRadius, rotationalSymmetryWind, interiorCircleWind) => new THREE.TorusKnotGeometry(radius, tubeRadius, rotationalSymmetryWind, interiorCircleWind);

    static cylinder = (radiusTop, radiusBottom, height) => new THREE.CylinderGeometry(radiusTop, radiusBottom, height);

    static cone = (radius, height) => new THREE.ConeGeometry(radius, height);

    static plane = (width, height) => new THREE.PlaneGeometry(width, height);

    static capsule = (radius, length) => new THREE.CapsuleGeometry(radius, length);

    static createMesh(geometry, color, emissiveIntensity) {
        const material = new THREE.MeshStandardMaterial({ color: color, emissive: color, emissiveIntensity: emissiveIntensity });
        return new THREE.Mesh(geometry, material);
    }

    static createGeometry = (index, size) => {
        switch (index) {
            case 0:
                return Geometry.tetrahedron(size);
            case 1:
                return Geometry.hexahedron(size, size, size);
            case 2:
                return Geometry.octahedron(size);
            case 3:
                return Geometry.dodecahedron(size);
            case 4:
                return Geometry.icosahedron(size);
            case 5:
                return Geometry.sphere(size);
            case 6:
                return Geometry.torus(size, size / 2);
            case 7:
                return Geometry.torusKnot(size, size / 2, 2, 3);
            case 8:
                return Geometry.cylinder(size / 2, size / 2, size);
            case 9:
                return Geometry.cone(size, size);
            case 10:
                return Geometry.plane(size, size);
            case 11:
                return Geometry.capsule(size / 2, size);
            default:
                return Geometry.sphere(size);
        };
    }

}

const defaultColor = new THREE.Color(0x000000);
const defaultSize = 1;
const defaultPosition = { x: 0, y: 1.8, z: -2 };
const defaultInternalRotationAngle = { x: 0, y: 0, z: 0 };
const defaultEmissiveIntensity = 0;
const defaultGeometry = Geometry.createGeometry(0, 1);

class Morph {

    constructor() {
        this.geometry = defaultGeometry;
        this.color = defaultColor;
        this.size = defaultSize;
        this.position = defaultPosition;
        this.internalRotationAngle = defaultInternalRotationAngle;
        this.emissiveIntensity = defaultEmissiveIntensity;
    }

    defineMorph(geometry, color, size, position, internalRotationAngle, emissiveIntensity) {
        this.geometry = geometry === undefined ? defaultGeometry : geometry;
        this.color = color === undefined ? defaultColor : color;
        this.size = size === undefined ? defaultSize : size;
        this.position = position === undefined ? defaultPosition : position;
        this.internalRotationAngle = internalRotationAngle === undefined ? defaultInternalRotationAngle : internalRotationAngle;
        this.emissiveIntensity = emissiveIntensity === undefined ? defaultEmissiveIntensity : emissiveIntensity;
    }

    randomize(objectPosRange) {
        const geometry = Geometry.createGeometry(Math.floor(Math.random() * 12), Math.random() * 2);
        const color = new THREE.Color(Math.random() * 0xffffff);
        const size = Math.random() * 2;
        const position = { x: this.getCoordinate(objectPosRange), y: Math.random() * 10, z: this.getCoordinate(objectPosRange) };
        const internalRotationAngle = { x: Math.random() * 0.02, y: Math.random() * 0.02, z: Math.random() * 0.02 };
        const emissiveIntensity = Math.random();

        this.defineMorph(geometry, color, size, position, internalRotationAngle, emissiveIntensity);
    }

    getCoordinate = (objectPosRange) => (Math.random() * objectPosRange * 2) - (objectPosRange);
}

AFRAME.registerComponent("morph", {

    schema: {
        objectPosRange: { type: "int", default: 50 },
    },

    init: function () {
        this.morph = new Morph();
        this.setMorph();

        this.interval = setInterval(() => {
            this.morph.randomize(this.data.objectPosRange);
            this.setMorph();
        }, 1000);
    },

    tick: function () {
        this.el.object3D.rotation.x += this.morph.internalRotationAngle.x;
        this.el.object3D.rotation.y += this.morph.internalRotationAngle.y;
        this.el.object3D.rotation.z += this.morph.internalRotationAngle.z;
    },

    setMorph: function () {
        this.el.setObject3D("mesh", Geometry.createMesh(this.morph.geometry, this.morph.color, this.morph.emissiveIntensity));
        this.el.setAttribute("scale", { x: this.morph.size, y: this.morph.size, z: this.morph.size });
        this.el.setAttribute("position", { x: this.morph.position.x, y: this.morph.position.y, z: this.morph.position.z });
    },

});