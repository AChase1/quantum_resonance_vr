class GlobalTracker {
    static currentStringId = "color";
    static haloRadius = 5;
    static numMorphs = 25;
    static instantiatedMorphCount = 0;
}

const stringPurposeMap = { "color": "purple", "geometry": "blue", "size": "green", "position": "black", "internalRotationAngle": "orange", "emissiveIntensity": "yellow" };

const avatarColorMap = { 0x0055ff: 0xffa500, 0xffff00: 0x8a2be2, 0xff0000: 0x00ffff, 0x800000: 0x40e0d0 };