'use client';

import { forwardRef, useImperativeHandle, useRef } from 'react';
import { Player } from '@remotion/player';

const RemotionPlayerWrapper = forwardRef(function RemotionPlayerWrapper(
  {
    component,
    durationInFrames = 90,
    fps = 30,
    width = 1200,
    height = 750,
    scrollDriven = false,
    style,
    inputProps = {},
  },
  ref
) {
  const playerRef = useRef(null);

  useImperativeHandle(ref, () => ({
    seekTo: (frame) => playerRef.current?.seekTo(frame),
    pause: () => playerRef.current?.pause(),
    play: () => playerRef.current?.play(),
  }));

  return (
    <Player
      ref={playerRef}
      component={component}
      durationInFrames={durationInFrames}
      compositionWidth={width}
      compositionHeight={height}
      fps={fps}
      style={{
        width: '100%',
        height: '100%',
        borderRadius: 12,
        overflow: 'hidden',
        ...style,
      }}
      inputProps={inputProps}
      autoPlay={!scrollDriven}
      loop={!scrollDriven}
      controls={false}
      clickToPlay={false}
    />
  );
});

export default RemotionPlayerWrapper;
