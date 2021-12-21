import React from 'react';
import { render } from '@testing-library/react';

import StereoscopicVideo from '../../src/components/StereoscopicVideo';

describe('StereoscopicVideo', () => {
  const givenSrc = '#video';

  context('Without gives mode', () => {
    it('Should renders left mode', () => {
      const { container } = render(
        <StereoscopicVideo
          src={givenSrc}
        />,
      );
      const expectLeft = '<a-videosphere src="#video" stereoscopic-video="eye: left; mode: full;"></a-videosphere>';
      const expectRight = '<a-videosphere src="#video" stereoscopic-video="eye: right; mode: full;"></a-videosphere>';

      expect(container.innerHTML).toBe(`${expectLeft}${expectRight}`);
    });
  });

  context('When mode is full', () => {
    const givenMode = 'full';

    it('Should renders full mode', () => {
      const { container } = render(
        <StereoscopicVideo
          src={givenSrc}
          mode={givenMode}
        />,
      );
      const expectLeft = '<a-videosphere src="#video" stereoscopic-video="eye: left; mode: full;"></a-videosphere>';
      const expectRight = '<a-videosphere src="#video" stereoscopic-video="eye: right; mode: full;"></a-videosphere>';

      expect(container.innerHTML).toBe(`${expectLeft}${expectRight}`);
    });
  });

  context('When mode is half', () => {
    const givenMode = 'half';

    it('Should renders half mode', () => {
      const { container } = render(
        <StereoscopicVideo
          src={givenSrc}
          mode={givenMode}
        />,
      );
      const expectLeft = '<a-videosphere src="#video" stereoscopic-video="eye: left; mode: half;"></a-videosphere>';
      const expectRight = '<a-videosphere src="#video" stereoscopic-video="eye: right; mode: half;"></a-videosphere>';

      expect(container.innerHTML).toBe(`${expectLeft}${expectRight}`);
    });
  });
});
