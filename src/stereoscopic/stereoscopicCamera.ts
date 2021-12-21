export default {
  schema: {
    eye: { default: 'left', oneOf: ['left', 'right'] },
  },

  init() {
    (this as any).layer_changed = false;
  },

  tick() {
    const { eye } = (this as any).data;
    const layer: number = eye === 'left' ? 1 : 2;

    if (!(this as any).layer_changed) {
      const childrenTypes: string[] = [];

      (this as any).el.object3D.children.forEach(({ type }: { type: string }, index: number) => {
        childrenTypes[index] = type;
      });

      const rootIndex = childrenTypes.indexOf('PerspectiveCamera');
      const rootCam = (this as any).el.object3D.children[rootIndex];

      rootCam.layers.enable(layer);
    }
  },
};
