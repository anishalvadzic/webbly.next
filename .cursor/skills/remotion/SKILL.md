---
name: remotion
description: >-
  Guides Remotion-based video apps: compositions in Root.tsx, Composition props,
  useCurrentFrame/useVideoConfig, OffthreadVideo/Img/Gif/Audio, AbsoluteFill,
  Sequence/Series/TransitionSeries, interpolate/spring/random, staticFile, and
  deterministic frame-driven UI vs interactive React. Use when building, editing,
  or reviewing Remotion compositions, rendering, or Remotion-specific APIs.
compatibility: Claude Code, Claude Desktop, Cursor
metadata:
  author: ThariqS (gist) / adapted for Cursor
  version: "1.0"
  source: https://gist.github.com/ThariqS/3d446e7c7aa9eb94f468194deb73028f
---

This skill applies to Remotion-based video apps that use React to render videos.

Full Remotion documentation: https://www.remotion.dev/docs/. Consult these docs when uncertain or for APIs not covered here.

## Project structure

The root file is usually named `src/Root.tsx` and looks like this:

```tsx
import {Composition} from 'remotion';
import {MyComp} from './MyComp';

export const Root: React.FC = () => {
	return (
		<>
			<Composition
				id="MyComp"
				component={MyComp}
				durationInFrames={120}
				width={1920}
				height={1080}
				fps={30}
				defaultProps={{}}
			/>
		</>
	);
};
```

A `Composition` defines a video that can be rendered. It consists of a React `component`, an `id`, `durationInFrames`, `width`, `height`, and frame rate `fps`.

Defaults when scaffolding or unspecified:

- `fps`: 30
- `height`: 1080
- `width`: 1920
- `id`: `"MyComp"`
- `defaultProps` must match the shape of props the `component` expects

Inside a React component, use the `useCurrentFrame()` hook for the current frame number. Frame numbers start at 0.

```tsx
export const MyComp: React.FC = () => {
	const frame = useCurrentFrame();
	return <div>Frame {frame}</div>;
};
```

## Component rules

Inside a component, regular HTML and SVG tags can be returned. Remotion provides special tags for video and audio; they accept regular CSS styles.

### Video

Use `OffthreadVideo` from `remotion`.

```tsx
import {OffthreadVideo} from 'remotion';

export const MyComp: React.FC = () => {
	return (
		<div>
			<OffthreadVideo
				src="https://remotion.dev/bbb.mp4"
				style={{width: '100%'}}
			/>
		</div>
	);
};
```

- `startFrom`: trim the left side by a number of frames
- `endAt`: limit how long the video is shown
- `volume`: 0–1

### Still images

Use `Img` from `remotion`.

```tsx
import {Img} from 'remotion';

export const MyComp: React.FC = () => {
	return <Img src="https://remotion.dev/logo.png" style={{width: '100%'}} />;
};
```

### Animated GIFs

Install `@remotion/gif` and use `Gif`.

```tsx
import {Gif} from '@remotion/gif';

export const MyComp: React.FC = () => {
	return (
		<Gif
			src="https://media.giphy.com/media/l0MYd5y8e1t0m/giphy.gif"
			style={{width: '100%'}}
		/>
	);
};
```

### Audio

Use `Audio` from `remotion`.

```tsx
import {Audio} from 'remotion';

export const MyComp: React.FC = () => {
	return <Audio src="https://remotion.dev/audio.mp3" />;
};
```

Asset sources may be remote URLs or files under the project `public/` folder. For `public/` assets, use `staticFile` from `remotion`.

```tsx
import {Audio, staticFile} from 'remotion';

export const MyComp: React.FC = () => {
	return <Audio src={staticFile('audio.mp3')} />;
};
```

- `startFrom`, `endAt`, `volume` behave like video (frames and 0–1 volume).

### Layering

Layer elements with `AbsoluteFill` from `remotion`.

```tsx
import {AbsoluteFill} from 'remotion';

export const MyComp: React.FC = () => {
	return (
		<AbsoluteFill>
			<AbsoluteFill style={{background: 'blue'}}>
				<div>This is in the back</div>
			</AbsoluteFill>
			<AbsoluteFill style={{background: 'blue'}}>
				<div>This is in front</div>
			</AbsoluteFill>
		</AbsoluteFill>
	);
};
```

### Sequence

Wrap any element in `Sequence` to place it later in the timeline.

```tsx
import {Sequence} from 'remotion';

export const MyComp: React.FC = () => {
	return (
		<Sequence from={10} durationInFrames={20}>
			<div>This only appears after 10 frames</div>
		</Sequence>
	);
};
```

- `from`: frame where the element appears; if negative, the sequence starts immediately but cuts off the first `Math.abs(from)` frames from the child timeline.
- `durationInFrames`: how long the element appears.

Inside a child of `Sequence`, `useCurrentFrame()` is relative to the sequence (starts at 0 when the sequence is visible).

```tsx
import {Sequence} from 'remotion';

export const Child: React.FC = () => {
	const frame = useCurrentFrame();

	return <div>At frame 10, this should be 0: {frame}</div>;
};

export const MyComp: React.FC = () => {
	return (
		<Sequence from={10} durationInFrames={20}>
			<Child />
		</Sequence>
	);
};
```

### Series

For multiple segments back-to-back, use `Series`.

```tsx
import {Series} from 'remotion';

export const MyComp: React.FC = () => {
	return (
		<Series>
			<Series.Sequence durationInFrames={20}>
				<div>This only appears immediately</div>
			</Series.Sequence>
			<Series.Sequence durationInFrames={30}>
				<div>This only appears after 20 frames</div>
			</Series.Sequence>
			<Series.Sequence durationInFrames={30} offset={-8}>
				<div>This only appears after 42 frames</div>
			</Series.Sequence>
		</Series>
	);
};
```

`Series.Sequence` is like `Sequence` but has no `from`; it has an optional `offset` to shift the start in frames.

### TransitionSeries

For sequential segments with transitions between them, use `TransitionSeries` from `@remotion/transitions`.

```tsx
import {AbsoluteFill} from 'remotion';
import {
	linearTiming,
	springTiming,
	TransitionSeries,
} from '@remotion/transitions';

import {fade} from '@remotion/transitions/fade';
import {wipe} from '@remotion/transitions/wipe';

export const MyComp: React.FC = () => {
	return (
		<TransitionSeries>
			<TransitionSeries.Sequence durationInFrames={60}>
				<AbsoluteFill style={{backgroundColor: 'blue'}} />
			</TransitionSeries.Sequence>
			<TransitionSeries.Transition
				timing={springTiming({config: {damping: 200}})}
				presentation={fade()}
			/>
			<TransitionSeries.Sequence durationInFrames={60}>
				<AbsoluteFill style={{backgroundColor: 'black'}} />
			</TransitionSeries.Sequence>
			<TransitionSeries.Transition
				timing={linearTiming({durationInFrames: 30})}
				presentation={wipe()}
			/>
			<TransitionSeries.Sequence durationInFrames={60}>
				<AbsoluteFill style={{backgroundColor: 'white'}} />
			</TransitionSeries.Sequence>
		</TransitionSeries>
	);
};
```

`TransitionSeries.Sequence` is like `Series.Sequence` but has no `offset`. `TransitionSeries.Transition` must sit between `TransitionSeries.Sequence` blocks; order matters.

### Deterministic randomness

Remotion requires deterministic React output. Do **not** use `Math.random()`. Use `random` from `remotion` with a static seed (returns a number in `[0, 1)`).

```tsx
import {random} from 'remotion';

export const MyComp: React.FC = () => {
	return <div>Random number: {random('my-seed')}</div>;
};
```

### interpolate

```tsx
import {interpolate} from 'remotion';

export const MyComp: React.FC = () => {
	const frame = useCurrentFrame();
	const value = interpolate(frame, [0, 100], [0, 1], {
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	return (
		<div>
			Frame {frame}: {value}
		</div>
	);
};
```

Arguments: value to map, input range array, output range array, optional options. Prefer `extrapolateLeft: 'clamp'` and `extrapolateRight: 'clamp'` by default.

### useVideoConfig

When you need `fps`, `durationInFrames`, `height`, or `width` of the composition, use `useVideoConfig()` from `remotion`.

```tsx
import {useVideoConfig} from 'remotion';

export const MyComp: React.FC = () => {
	const {fps, durationInFrames, height, width} = useVideoConfig();
	return (
		<div>
			fps: {fps}
			durationInFrames: {durationInFrames}
			height: {height}
			width: {width}
		</div>
	);
};
```

### spring

Suggested default-style usage:

```tsx
import {spring} from 'remotion';

export const MyComp: React.FC = () => {
	const frame = useCurrentFrame();
	const {fps} = useVideoConfig();

	const value = spring({
		fps,
		frame,
		config: {
			damping: 200,
		},
	});
	return (
		<div>
			Frame {frame}: {value}
		</div>
	);
};
```

## Remotion UI components vs interactive React

**Remotion components**

- Rendered frame-by-frame for video
- No user interactions (`onClick`, hover, etc.)
- Avoid `useState` for interactivity
- Must be deterministic: same inputs → same pixels
- Animation is driven by frame number via hooks and helpers
- No event handlers or live user input

**Typical React components**

- Events, `useState` / `useReducer`, async data, real-time input

**Implementation differences**

1. **State**: Remotion uses `useCurrentFrame()` (and props) to drive motion; interactive apps use `useState`, etc.
2. **Motion**: Remotion uses `interpolate()`, `spring()`, sequences; web UIs often use CSS or animation libraries.
3. **Input**: Remotion has no runtime user input; pass everything via composition props. Interactive React handles clicks, forms, gestures.
4. **Effects**: Prefer pure frame-based logic; avoid `useEffect` for animation-critical paths in Remotion.

### Best practices

1. Prefer frame-based animation over wall-clock timing inside compositions.
2. Keep render paths pure for the exported frame.
3. Use Remotion hooks: `useCurrentFrame()`, `useVideoConfig()`, etc.
4. Use `Sequence` / `Series` / `TransitionSeries` for timeline structure.
5. Strip interactive handlers from visuals meant for render.
6. Keep output deterministic for reproducible renders.
