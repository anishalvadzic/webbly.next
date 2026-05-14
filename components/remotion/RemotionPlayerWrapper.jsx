'use client';

import { Player } from '@remotion/player';

export default function RemotionPlayerWrapper({
  component,
  durationInFrames = 90,
  fps = 30,
  width = 1200,
  height = 750,
  style,
  inputProps = {},
}) {
  return (
    <Player
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
      autoPlay
      loop
      controls={false}
      clickToPlay={false}
    />
  );
}
