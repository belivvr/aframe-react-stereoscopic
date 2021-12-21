import React from 'react';
import { VideoSphere } from '@belivvr/aframe-react';

interface Props {
  src: string;
  mode?: 'full' | 'half';
}

export default function StereoscopicVideo({
  src,
  mode = 'full',
}: Props): JSX.Element {
  return (
    <>
      <VideoSphere
        src={src}
        stereoscopic-video={`eye: left; mode: ${mode};`}
      />
      <VideoSphere
        src={src}
        stereoscopic-video={`eye: right; mode: ${mode};`}
      />
    </>
  );
}
