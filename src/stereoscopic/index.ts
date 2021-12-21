import stereoscopicCamera from './stereoscopicCamera';
import stereoscopicVideo from './stereoscopicVideo';

export default (AFRAME: any) => {
  AFRAME.registerComponent('stereoscopic-camera', stereoscopicCamera);
  AFRAME.registerComponent('stereoscopic-video', stereoscopicVideo(AFRAME));
};
