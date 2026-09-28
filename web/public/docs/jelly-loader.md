# Jelly Loader

A loading animation with circles that move and scale like jelly. Perfect for showing that something is loading on your website.

**Interaction.** Colored blobs scale and overlap in a looping jelly motion.

- Categories: Loaders
- Import: `@/components/ui/jelly-loader`
- Inspiration: StackBits (port) — https://stackbits.dev/docs/jellyloader

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/jelly-loader.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `framer-motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `numberOfCubes` | `number` | `8` | — |

## Usage

```tsx
"use client";

import JellyLoader from "./component";

export default function Usage() {
	return (
		<div className="flex min-h-120 w-full items-center justify-center overflow-hidden p-8">
			<JellyLoader />
		</div>
	);
}
```

## Source

### `components/ui/jelly-loader.tsx`

```tsx
'use client';

import React from 'react';
import { motion, Transition } from 'framer-motion';

type JellyLoaderProps = {
  numberOfCubes?: number;
};

const JellyLoader = ({ numberOfCubes = 8 }: JellyLoaderProps) => {
  const colors = [
    '#FFE4E1',
    '#FFB6C1',
    '#FF8A95',
    '#FF6B8A',
    '#E91E63',
    '#C2185B',
    '#AD1457',
    '#880E4F'
  ];

  const transition: Transition = {
    duration: 1.5,
    repeat: Infinity,
    repeatDelay: 0.5,
    ease: 'easeOut'
  };

  return (
    <div className="-translate-x-1/5 flex items-center justify-center">
      {Array.from({ length: numberOfCubes }).map((_, index) => {
        const x = index * 10;
        const y = -index * 10;

        return (
          <motion.span
            key={index}
            className="h-[70px] w-[100px] absolute rounded-full"
            style={{
              x,
              y,
              zIndex: numberOfCubes - index,
              backgroundColor: colors[index],
              opacity: 1 - index * 0.05
            }}
            initial={{ scale: 1 }}
            animate={{ scale: [1, 0.75, 1], rotate: [0, 360] }}
            transition={{
              ...transition,
              delay: index * 0.05
            }}
          >
            {/* <motion.span
              initial={{ rotate: 0 }}
              animate={{ rotate: [0, 360] }}
              transition={{
                ...transition,
                delay: index * 0.05
              }}
              style={{ backgroundColor: colors[index] }}
              className="h-[70px] w-[100px] shrink-0 absolute rounded-full"
            /> */}
          </motion.span>
        );
      })}
    </div>
  );
};

export default JellyLoader;
```

## Attribution

Source: StackBits · Author: Samit Kapoor · Original: https://stackbits.dev/docs/jellyloader

Adapted from the original. Credit the original author when you ship this.
