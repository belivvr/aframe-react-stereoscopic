# A-Frame React Immersive Stereoscopic Video Component

![Belivvr logo](https://avatars.githubusercontent.com/u/40684200?s=200&v=4)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)


## Languages

[한국어](./ko.md)

---

## Introduce

This library was created by referring to the [aframe-stereo-component](https://github.com/oscarmarinmiro/aframe-stereo-component).  
The library I referred to did not work in `aframe@^1.2.0`, so I made it work in `three@^0.135.0`, referring to [the example of Three.js WebXR VR video](https://github.com/mrdoob/three.js/blob/r135/examples/webxr_vr_video.html).  

![MaryOculus Screenshot](https://user-images.githubusercontent.com/41536271/146868338-f5c42aae-9fde-46b4-b80c-229f3cd4317a.png)

It is a component created to provide the above stereoscopic video as VR Immersive.

## Install

Require to install [@belivvr/aframe-react](https://github.com/belivvr/aframe-react).

```sh
# yarn
yarn add aframe @belivvr/aframe-react @belivvr/aframe-react-stereoscopic

# npm
npm i aframe @belivvr/aframe-react @belivvr/aframe-react-stereoscopic
```

## Usage

### React

```tsx
import AFRAME from 'aframe';
import { Scene, Assets } from '@belivvr/aframe-react';
import {
  stereoscopic,
  StereoscopicCamera,
  StereoscopicVideo,
} from '@belivvr/aframe-react-stereoscopic';

stereoscopic(AFRAME); // Doing AFRAME.registerComponent in stereoscopic function.

ReactDOM.render(
  (
    <Scene>
      <Assets>
        <video
          id="video"
          src="./MaryOculus.mp4"
          controls
          autoPlay
          playsInline
          muted
          crossOrigin="crossorigin"
        />
      </Assets>

      <StereoscopicCamera
        wasdControlsEnabled={false}
        reverseMouseDrag
      />
      <StereoscopicVideo
        src="#video"
        type="full" // full or half
      />
    </Scene>
  ),
  document.getElementById('root'),
);
```

### Next.JS

Can't using `import AFRAME from 'aframe';` in Next.JS.  
Inevitably, we have no choice but to use `require`, and we have to check the completion of ssr through `useEffect` and then rendering.  

Since `aframe` uses the `window` object, check the window object through `typeof window !== 'undefined'` and call `aframe`.

```tsx
import type { NextPage } from 'next';

import React, { useEffect, useState } from 'react';
import { Scene, Assets } from '@belivvr/aframe-react';
import {
  stereoscopic,
  StereoscopicCamera,
  StereoscopicVideo,
} from '@belivvr/aframe-react-stereoscopic';

const Home: NextPage = () => {
  const [rendered, setRendered] = useState<boolean>(false);

  useEffect(() => {
    setRendered(true);

    if (typeof window !== 'undefined') {
      const AFRAME = require('aframe'); // eslint-disable-line global-require
      stereoscopic(AFRAME); // Doing AFRAME.registerComponent in stereoscopic function.
    }
  }, [stereoscopic, setRendered]);

  if (!rendered) {
    return <>loading</>;
  }

  return (
    <Scene>
      <Assets>
        <video
          id="video"
          src="./MaryOculus.mp4"
          controls
          autoPlay
          playsInline
          muted
          crossOrigin="crossorigin"
        />
      </Assets>

      <StereoscopicCamera
        wasdControlsEnabled={false}
        reverseMouseDrag
      />
      <StereoscopicVideo
        src="#video"
        type="full" // full or half
      />
    </Scene>
  );
};

export default Home;
```

## Options

### StereoscopicVideo

|name|description|default|required|
|:-|:-|:-|:-:|
|src|target video tag's id||✅|
|type|full(360°), half(180°)|full||

### StereoscopicCamera

[a-camera reference](https://aframe.io/docs/1.2.0/primitives/a-camera.html)  
[Entity reference](https://aframe.io/docs/1.2.0/core/entity.html)  

`a-camera` is a structure that inherits `a-entity`, so all components used in `a-entity` can be used.  
Below is the reference of `a-camera`.

|name|description|default|required|
|:-|:-|:-|:-:|
|far|Camera frustum far clipping plane.|10000||
|fov|Field of view (in degrees).|	80||
|lookControlsEnabled|Whether look controls are enabled.|true||
|near|Camera frustum near clipping plane.|0.5||
|reverseMouseDrag|Whether to reverse mouse drag.|false||
|wasdControlsEnabled|Whether the WASD controls are enabled.|true||
