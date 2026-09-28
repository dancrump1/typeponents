# Flow Scroll

A scrollable component that displays images in a flowing grid layout as you scroll. Each image smoothly scales and slides into view, creating a dynamic waterfall effect where images flow from the sides and center themselves, making your gallery feel alive and responsive to every scroll movement.

**Interaction.** Images scale and slide into a flowing grid as you scroll past them.

- Categories: Scroll
- Tags: scroll-driven
- Import: `@/components/ui/flow-scroll`
- Inspiration: StackBits (port) — https://stackbits.dev/docs/flowScroll

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/flow-scroll.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `framer-motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `images` *(required)* | `string[]` | — | — |

## Usage

```tsx
"use client";

import FlowScroll from "./component";

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
			<FlowScroll
  images={[
    ...images.map((image) => image.image),
    ...images.map((image) => image.image),
    ...images.map((image) => image.image),
    ...images.map((image) => image.image)
  ]}
/>
		</div>
	);
}
```

## Source

### `components/ui/flow-scroll.tsx`

```tsx
'use client';

import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import React, { useRef } from 'react';

interface FlowScrollCardProps {
  image: string;
  index: number;
  scrollYProgress: MotionValue<number>;
  totalItems: number;
}

const FlowScrollCard = ({ image, index, scrollYProgress, totalItems }: FlowScrollCardProps) => {
  const ITEMS_PER_ROW = 3;
  const prev = Math.max(0, index - ITEMS_PER_ROW);
  const next = Math.min(totalItems - 1, index + ITEMS_PER_ROW);

  const previousRow = Math.floor(prev / ITEMS_PER_ROW);
  const currentRow = Math.floor(index / ITEMS_PER_ROW);
  const nextRow = Math.floor(next / ITEMS_PER_ROW);

  const totalRows = Math.floor(totalItems / ITEMS_PER_ROW);

  const scrollRangePerRow = 1 / totalRows;

  const entryAnimation = previousRow / totalRows - scrollRangePerRow;
  const currPosition = currentRow / totalRows;
  const holdAnimationStart = currPosition;
  const holdAnimationEnd = currPosition;
  const exitAnimation = nextRow / totalRows + scrollRangePerRow * 2;

  const offsetToAdd = (scrollRangePerRow / totalItems) * (currentRow + 2);
  const range = [
    0,
    entryAnimation - offsetToAdd,
    holdAnimationStart - offsetToAdd,
    holdAnimationEnd - offsetToAdd,
    exitAnimation - offsetToAdd,
    1
  ];

  const scale = useTransform(scrollYProgress, range, [0.5, 0.5, 1, 1, 0.5, 0.5]);

  const isLeft = index % ITEMS_PER_ROW === 0;
  const isRight = index % ITEMS_PER_ROW === 2;
  const xTransform = useTransform(scrollYProgress, range, [
    isLeft ? '100%' : isRight ? '-100%' : '0%',
    isLeft ? '100%' : isRight ? '-100%' : '0%',
    '0%',
    '0%',
    '0%',
    '0%'
  ]);
  const rotate = useTransform(scrollYProgress, range, [
    isLeft ? -20 : isRight ? 20 : 0,
    isLeft ? -20 : isRight ? 20 : 0,
    0,
    0,
    0,
    0
  ]);
  const shadowY = useTransform(scrollYProgress, range, [50, 50, 25, 25, -50, -50]);

  return (
    <motion.div
      style={{
        scale,
        x: xTransform,
        rotate,
        zIndex: !isLeft && !isRight ? 1 : 0,
        boxShadow: useTransform(shadowY, (value) => `0px ${value}px 40px 10px rgba(0, 0, 0, 0.1)`)
      }}
      className="w-full sm:max-w-48 md:max-w-60 h-32 sm:h-60 md:h-72 overflow-hidden rounded-2xl"
    >
      <Image
        src={image}
        alt={image}
        width={1000}
        height={1000}
        className="h-full w-full object-cover"
      />
    </motion.div>
  );
};

interface FlowScrollProps {
  images: string[];
}

const FlowScroll = ({ images }: FlowScrollProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ['start start', 'end end']
  });

  return (
    <div ref={ref} className="w-full h-full overflow-y-auto flex justify-center py-36 pb-96">
      <div className="grid grid-cols-3 gap-4 md:gap-6 lg:gap-12 h-max">
        {images.map((image, index) => (
          <FlowScrollCard
            key={`sphere-scroll-card-${index}`}
            image={image}
            index={index}
            scrollYProgress={scrollYProgress}
            totalItems={images.length}
          />
        ))}
      </div>
    </div>
  );
};

export default FlowScroll;
```

## Attribution

Source: StackBits · Author: Samit Kapoor · Original: https://stackbits.dev/docs/flowScroll

Adapted from the original. Credit the original author when you ship this.
