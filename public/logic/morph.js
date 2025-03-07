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

    static createMesh = (geometry, color, emissiveIntensity) => new THREE.Mesh(geometry, new THREE.MeshStandardMaterial({ color: color, emissive: color, emissiveIntensity: emissiveIntensity }));

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
const defaultInternalRotationAngle = { x: 0, y: 0, z: 0 };
const defaultEmissiveIntensity = 0;
const defaultGeometryIndex = 0;
const defaultPosition = new THREE.Vector3(0, 0, -9);

class Morph {

    constructor() {
        this.defineGeometry(Math.random());
        this.defineColor(Math.random());
        this.defineSize(Math.random());
        this.definePosition(Math.random());
        this.defineInternalRotationAngle(Math.random());
        this.defineEmissiveIntensity(Math.random());
    }

    defineColor(factor) {
        const hue = (factor % 1) * 360;
        this.color = this.color == undefined ? defaultColor : new THREE.Color(`hsl(${hue}, 100%, 50%)`);
    }

    defineGeometry(factor) {
        this.geometryIndex = this.geometryIndex == undefined ? defaultGeometryIndex : Math.floor((factor % 1) * 12) % 12;
    }

    defineSize(factor) {
        const updatedFactor = factor == 0 ? 0.5 : factor;
        this.size = this.size == undefined ? defaultSize : updatedFactor * 2;
    }

    definePosition(factor) {
        const x = this.getCoordinate(GlobalTracker.haloRadius);
        const y = factor * Math.random() * 10;
        const z = this.getCoordinate(GlobalTracker.haloRadius) - 9;

        this.position = this.position == undefined ? defaultPosition : new THREE.Vector3(
            THREE.MathUtils.clamp(x, -5, 5),
            THREE.MathUtils.clamp(y, 0, 5),
            THREE.MathUtils.clamp(z, -5, 5)
        );
    }
    getCoordinate = (factor) => (Math.random() * factor * 2) - (factor);

    defineInternalRotationAngle(factor) {
        this.internalRotationAngle = this.internalRotationAngle == undefined ? defaultInternalRotationAngle : {
            x: (factor % 1) * 0.02,
            y: (factor % 1) * 0.02,
            z: (factor % 1) * 0.02
        };
    }

    defineEmissiveIntensity(factor) {
        this.emissiveIntensity = this.emissiveIntensity == undefined ? defaultEmissiveIntensity : (factor % 1);
    }

}

AFRAME.registerComponent("morph", {

    init: function () {
        this.morph = new Morph();
        this.setMorph();
    },

    tick: function () {
        if (this.el.hasAttribute('mesh')) {
            this.el.object3D.rotation.x += this.morph.internalRotationAngle.x;
            this.el.object3D.rotation.y += this.morph.internalRotationAngle.y;
            this.el.object3D.rotation.z += this.morph.internalRotationAngle.z;
        }
    },

    setMorph: function () {
        this.el.setObject3D("mesh", Geometry.createMesh(Geometry.createGeometry(this.morph.geometryIndex), this.morph.color, this.morph.emissiveIntensity));
        this.el.setAttribute("scale", { x: this.morph.size, y: this.morph.size, z: this.morph.size });
        this.el.setAttribute("position", this.morph.position);
    },

    updateMorphProperties: function (string, factor) {
        switch (string.id) {
            case "color":
                this.morph.defineColor(factor);
                break;
            case "geometry":
                this.morph.defineGeometry(factor);
                break;
            case "size":
                this.morph.defineSize(factor);
                break;
            case "position":
                this.morph.definePosition(factor * 5);
                break;
            case "internalRotationAngle":
                this.morph.defineInternalRotationAngle(factor);
                break;
            case "emissiveIntensity":
                this.morph.defineEmissiveIntensity(factor);
                break;
            default:
                console.log("Unknown string");
        }

        this.setMorph();
    },


});