import React from 'react';
import type { EntityProps } from '@belivvr/aframe-react/types/core';
import { Camera } from '@belivvr/aframe-react';

interface Props {
  far?: number;
  fov?: number;
  lookControlsEnabled?: boolean;
  near?: number;
  reverseMouseDrag?: boolean;
  wasdControlsEnabled?: boolean;
}

export default function StereoscopicCamera(props: Props & EntityProps): JSX.Element {
  return (
    <Camera
      stereoscopic-camera="eye: left;"
      position={{ x: 0, y: 0, z: 10 }}
      {...props}
    />
  );
}
