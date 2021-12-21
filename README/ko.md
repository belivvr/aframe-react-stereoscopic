# A-Frame React Immersive Stereoscopic Video Component

![Belivvr logo](https://avatars.githubusercontent.com/u/40684200?s=200&v=4)

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)


## Languages

[English](./en.md)

---

## Introduce

이 라이브러리는 [aframe-stereo-component](https://github.com/oscarmarinmiro/aframe-stereo-component) 를 참고하여 만들었습니다.  
참고한 라이브러리가 `aframe@^1.2.0` 에서 작동하지 않아 직접 만들게 되었고, [Three.js WebXR VR video 예제](https://github.com/mrdoob/three.js/blob/r135/examples/webxr_vr_video.html) 를 참고하여 `three@^0.135.0` 에서 작동하도록 만들었습니다.

![MaryOculus 스크린샷](https://user-images.githubusercontent.com/41536271/146868338-f5c42aae-9fde-46b4-b80c-229f3cd4317a.png)

위와 같은 stereoscopic 영상을 VR Immersive 로 제공하기 위해 만든 컴포넌트입니다.

## Install

이 라이브러리는 [@belivvr/aframe-react](https://github.com/belivvr/aframe-react)의 설치를 요구합니다.

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

stereoscopic(AFRAME); // stereoscopic 함수 내부에서 AFRAME.registerComponent 를 수행합니다.

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

Next.JS 에서는 `import AFRAME from 'aframe';` 을 할 수가 없습니다.  
불가피하게 `require` 를 사용할 수 밖에 없고, `useEffect` 를 통해 ssr 완료를 확인 후 랜더링을 해야합니다.  

`aframe` 이 `window` 객체를 사용하기 때문에 `typeof window !== 'undefined'` 를 통해 window 객체를 확인 후 `aframe` 을 불러옵니다.

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
      stereoscopic(AFRAME); // stereoscopic 함수 내부에서 AFRAME.registerComponent 를 수행합니다.
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
|src|대상 video 태그의 id||✅|
|type|full(360°), half(180°)|full||

### StereoscopicCamera

[a-camera 레퍼런스 참고](https://aframe.io/docs/1.2.0/primitives/a-camera.html)  
[Entity 레퍼런스 참고](https://aframe.io/docs/1.2.0/core/entity.html)  

`a-camera` 는 `a-entity` 를 상속받는 구조이기 때문에 `a-entity` 에서 사용하는 모든 컴포넌트를 사용할 수 있습니다.  
아래는 `a-camera` 의 레퍼런스 입니다.

|name|description|default|required|
|:-|:-|:-|:-:|
|far|Camera frustum far clipping plane.|10000||
|fov|Field of view (in degrees).|	80||
|lookControlsEnabled|Whether look controls are enabled.|true||
|near|Camera frustum near clipping plane.|0.5||
|reverseMouseDrag|Whether to reverse mouse drag.|false||
|wasdControlsEnabled|Whether the WASD controls are enabled.|true||
