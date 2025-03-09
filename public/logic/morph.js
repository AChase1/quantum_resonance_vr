const defaultColor = new THREE.Color(0x000000);
const defaultSize = 1;
const defaultInternalRotationAngle = { x: 0, y: 0, z: 0 };
const defaultEmissiveIntensity = 0;
const defaultGeometryIndex = 0;
const defaultPosition = new THREE.Vector3(0, 0, -9);

AFRAME.registerComponent("morph", {

    schema: {
        position: { type: "vec3", default: defaultPosition },
        color: { type: "color", default: defaultColor },
        size: { type: "number", default: defaultSize },
        geometryIndex: { type: "number", default: defaultGeometryIndex },
        internalRotationAngle: { type: "vec3", default: defaultInternalRotationAngle },
        emissiveIntensity: { type: "number", default: defaultEmissiveIntensity },
    },

    init: function () {
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
        this.el.setObject3D("mesh", Geometry.createMesh(Geometry.createGeometry(this.data.geometryIndex), this.data.color, this.data.emissiveIntensity));
        this.el.setAttribute("scale", { x: this.data.size, y: this.data.size, z: this.data.size });
        this.el.setAttribute("position", this.data.position);
    },

    updateMorphProperties: function (string, factor) {
        switch (string.id) {
            case "color":
                this.data.color = Geometry.defineColor(factor);
                break;
            case "geometry":
                this.data.geometryIndex = Geometry.defineGeometry(factor);
                break;
            case "size":
                this.data.size = Geometry.defineSize(factor);
                break;
            case "position":
                this.data.position = Geometry.definePosition(factor * 5);
                break;
            case "internalRotationAngle":
                this.data.internalRotationAngle = Geometry.defineInternalRotationAngle(factor);
                break;
            case "emissiveIntensity":
                this.data.emissiveIntensity = Geometry.defineEmissiveIntensity(factor);
                break;
            default:
                console.log("Unknown string");
        }
    },
});