import React from 'react';
import { render } from '@testing-library/react';

import StereoscopicCamera from '../../src/components/StereoscopicCamera';

describe('StereoscopicCamera', () => {
  context('Without any given props', () => {
    it('Should renders default StereoscopicCamera', () => {
      const { container } = render(<StereoscopicCamera />);
      const expectProps = [
        'position="0 0 10"',
        'stereoscopic-camera="eye: left;"',
      ];
  
      expect(container.innerHTML).toBe(`<a-camera position="0 0 10" stereoscopic-camera="eye: left;"></a-camera>`)
    });
  });

  context('With gives position', () => {
    it('Should renders given position', () => {
      const { container } = render(<StereoscopicCamera position={{ x: 10, y: 10, z: 0 }} />);
      const expectProps = [
        'position="10 10 0"',
        'stereoscopic-camera="eye: left;"',
      ];
  
      expect(container.innerHTML).toBe(`<a-camera position="10 10 0" stereoscopic-camera="eye: left;"></a-camera>`)
    });
  });

  context('With gives some props', () => {
    it('Should renders a-camera with given props', () => {
      const { container } = render((
        <StereoscopicCamera
          position={{ x: 10, y: 10, z: 0 }}
          wasdControlsEnabled={false}
          reverseMouseDrag
        />
      ));
      const expectProps = [
        'position="10 10 0"',
        'stereoscopic-camera="eye: left;"',
        'reverse-mouse-drag="true"',
        'wasd-controls-enabled="false"',
      ];
  
      expect(container.innerHTML).toBe(`<a-camera ${expectProps.join(' ')}></a-camera>`);
    });
  });
});
