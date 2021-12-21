export default (AFRAME: any) => ({
  schema: {
    eye: { default: 'left', oneOf: ['left', 'right'] },
    mode: { default: 'full', oneOf: ['full', 'half'] },
  },

  init() {
    const object3D = (this as any).el.object3D.children[0];
    object3D.rotation.y = Math.PI / 2;

    const { data } = this as any;
    const { eye, mode } = data;

    const geometry = mode === 'full'
      ? new AFRAME.THREE.SphereGeometry(100, 64, 64)
      : new AFRAME.THREE.SphereGeometry(100, 64, 64, Math.PI / 2, Math.PI, 0, Math.PI);

    const uvs = geometry.attributes.uv.array;

    for (let i = 0; i < uvs.length; i += 2) {
      uvs[i] *= 0.5;

      if (eye === 'right') {
        uvs[i] += 0.5;
      }
    }

    const bufferGeometry = geometry.clone();
    bufferGeometry.normalizeNormals();
    bufferGeometry.computeVertexNormals();

    object3D.geometry = bufferGeometry;
  },

  update() {
    const { eye } = (this as any).data;
    const layer: number = eye === 'left' ? 1 : 2;
    const object3D = (this as any).el.object3D.children[0];

    object3D.layers.set(layer);
  },
});
