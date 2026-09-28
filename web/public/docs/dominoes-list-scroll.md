# Dominoes List Scroll

A scrollable component that displays images with domino-like falling animations as you scroll. Each image rotates and falls like a domino piece, creating a smooth cascading effect that responds to your scroll position with realistic 3D shadows.

**Interaction.** Images tip over like dominos as you scroll, with optional 3D shadows.

- Categories: Scroll
- Tags: scroll-driven
- Import: `@/components/ui/dominoes-list-scroll`
- Inspiration: StackBits (port) — https://stackbits.dev/docs/dominoeslistscroll

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/dominoes-list-scroll.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `framer-motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `items` *(required)* | `{ image: string; }[]` | — | — |
| `height` | `number` | `500` | — |
| `width` | `number` | `384` | — |
| `enableShadow` | `boolean` | `false` | — |

## Usage

```tsx
"use client";

import DominoesListScroll from "./component";

const images = [
  {
    "image": "https://picsum.photos/seed/stackbits1/800/800"
  },
  {
    "image": "https://picsum.photos/seed/stackbits2/800/800"
  },
  {
    "image": "https://picsum.photos/seed/stackbits3/800/800"
  },
  {
    "image": "https://picsum.photos/seed/stackbits4/800/800"
  },
  {
    "image": "https://picsum.photos/seed/stackbits5/800/800"
  },
  {
    "image": "https://picsum.photos/seed/stackbits6/800/800"
  },
  {
    "image": "https://picsum.photos/seed/stackbits7/800/800"
  },
  {
    "image": "https://picsum.photos/seed/stackbits8/800/800"
  },
  {
    "image": "https://picsum.photos/seed/stackbits9/800/800"
  },
  {
    "image": "https://picsum.photos/seed/stackbits10/800/800"
  }
];

export default function Usage() {
	return (
		<div className="flex min-h-120 w-full items-center justify-center overflow-hidden p-8">
			<div className="h-full w-full flex flex-col items-center justify-start gap-2">
    <DominoesListScroll items={[...images, ...images]} enableShadow height={500} width={384} />
</div>
		</div>
	);
}
```

## Source

### `components/ui/dominoes-list-scroll.tsx`

```tsx
'use client';

import { motion, MotionValue, useMotionValueEvent, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import React, { useRef } from 'react';

const DominoesItem = ({
  image,
  index,
  scrollYProgress,
  totalItems,
  height,
  width,
  enableShadow
}: {
  image: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  totalItems: number;
  height: number;
  width: number;
  enableShadow: boolean;
}) => {
  const thisDominoePosition = index / totalItems;
  const preStep = Math.max(0, thisDominoePosition - 0.04);
  const postStep = Math.min(1, thisDominoePosition + 0.04);

  const rotateX = useTransform(
    scrollYProgress,
    [0, preStep, thisDominoePosition, postStep, 1],
    [0, 0, 0, 90, 90]
  );
  const antiRotateX = useTransform(
    scrollYProgress,
    [0, preStep, thisDominoePosition, postStep, 1],
    [90, 90, 90, 0, 0]
  );

  const translateZ = useTransform(
    scrollYProgress,
    [0, preStep, thisDominoePosition, postStep, 1],
    [-height * index, -height, 0, height, height * (totalItems - index)]
  );
  const antiSkewX = useTransform(
    scrollYProgress,
    [0, preStep, thisDominoePosition, postStep, 1],
    [30, 30, 30, 0, 0]
  );
  const shadowOpacity = useTransform(
    scrollYProgress,
    [0, preStep, thisDominoePosition, postStep, postStep, 1],
    [0.6, 0.6, 0.6, 0.6, 0, 0]
  );

  return (
    <motion.div
      style={{
        rotateX,
        translateZ,
        zIndex: totalItems - index,
        transformOrigin: 'bottom',
        transformStyle: 'preserve-3d',
        height,
        width,
        transition: '100ms ease-out'
      }}
      className="absolute"
    >
      {/* shadow */}
      {enableShadow && (
        <motion.span
          style={{
            rotateX: antiRotateX,
            transformOrigin: 'bottom',
            skewX: antiSkewX,
            opacity: shadowOpacity,
            transition: '100ms ease-out'
          }}
          className="absolute inset-0 bg-black z-0 opacity-0 rounded"
        />
      )}
      <Image
        src={image}
        alt={image}
        width={width}
        height={height}
        className="w-full h-full object-cover rounded z-[1]"
      />
    </motion.div>
  );
};

const DominoesListScroll = ({
  items,
  height = 500,
  width = 384,
  enableShadow = false
}: {
  items: { image: string }[];
  height?: number;
  width?: number;
  enableShadow?: boolean;
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: scrollRef
  });
  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    console.log({ latest });
  });

  return (
    <div className="h-full w-full relative overflow-hidden">
      <div className="sticky top-0 left-0 h-screen w-full flex items-center justify-center z-10 pointer-events-none">
        <div
          style={{
            perspective: '1000px',
            transformStyle: 'preserve-3d'
          }}
          className="flex flex-col items-center justify-center w-full"
        >
          {items.map((item, index) => (
            <DominoesItem
              key={`dominoe-${index}`}
              image={item.image}
              index={index}
              scrollYProgress={scrollYProgress}
              totalItems={items.length}
              height={height}
              width={width}
              enableShadow={enableShadow}
            />
          ))}
        </div>
      </div>
      <div
        ref={scrollRef}
        className=" w-full overflow-y-auto h-full bg-white absolute top-0 left-0"
      >
        <div
          style={{
            height: items.length * 500
          }}
          className="w-full bg-white"
        ></div>
      </div>
    </div>
  );
};

export default DominoesListScroll;
```

## Attribution

Source: StackBits · Author: Samit Kapoor · Original: https://stackbits.dev/docs/dominoeslistscroll

Adapted from the original. Credit the original author when you ship this.
