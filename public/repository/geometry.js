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

    static defineColor(factor) {
        const hue = (factor % 1) * 360;
        return new THREE.Color(`hsl(${hue}, 100%, 50%)`);
    }

    static defineGeometry = (factor) => Math.floor((factor % 1) * 12) % 12;


    static defineSize(factor) {
        const updatedFactor = factor == 0 ? 0.5 : factor;
        return updatedFactor * 2;
    }

    static definePosition(factor) {
        const x = Geometry.getCoordinate(GlobalTracker.haloRadius);
        const y = factor * Math.random() * 10;
        const z = this.getCoordinate(GlobalTracker.haloRadius) - 9;

        return new THREE.Vector3(
            THREE.MathUtils.clamp(x, -5, 5),
            THREE.MathUtils.clamp(y, 0, 5),
            THREE.MathUtils.clamp(z, -5, 5)
        );
    }

    static getCoordinate = (factor) => (Math.random() * factor * 2) - (factor);

    static defineInternalRotationAngle(factor) {
        return {
            x: (factor % 1) * 0.02,
            y: (factor % 1) * 0.02,
            z: (factor % 1) * 0.02
        };
    }

    static defineEmissiveIntensity = (factor) => factor % 1;
}