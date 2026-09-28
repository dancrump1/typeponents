# Stack Scroll

A scrollable component that displays images in a stacked card layout. As you scroll, the cards animate with smooth transitions, scaling, and positioning effects to create an engaging visual experience.

**Interaction.** Cards scale and restack as you scroll, like a deck being dealt.

- Categories: Scroll
- Tags: scroll-driven
- Import: `@/components/ui/stack-scroll`
- Inspiration: StackBits (port) — https://stackbits.dev/docs/stackScroll

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/stack-scroll.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `framer-motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `items` *(required)* | `{ image: string; }[]` | — | — |

## Usage

```tsx
"use client";

import StackScroll from "./component";

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
			<div className="h-full w-full flex flex-col items-center justify-center gap-2 bg-white/10">
  <StackScroll items={[...images, ...images]} />
</div>
		</div>
	);
}
```

## Source

### `components/ui/stack-scroll.tsx`

```tsx
'use client';

import React, { useRef } from 'react';
import Image from 'next/image';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';

const StackScrollItem = ({
  image,
  index,
  isLeft,
  scrollYProgress,
  totalItems
}: {
  image: string;
  index: number;
  isLeft: boolean;
  scrollYProgress: MotionValue<number>;
  totalItems: number;
}) => {
  const direction = isLeft ? -1 : 1;
  const position = index / (totalItems / 2);
  const isFirst = index === 0;
  const isLast = index === totalItems / 2 - 1;

  const exitGap = 0.04;

  const translateY = useTransform(
    scrollYProgress,
    [0, position, position + exitGap, 1],
    [0, 0, ...(isLast ? [0, 0] : [-50, -50])]
  );
  const translateX = useTransform(
    scrollYProgress,
    [0, position, 1],
    [isFirst ? 0 : index * 20 * direction, 0, isLast ? 0 : -index * 20 * direction]
  );
  const scale = useTransform(
    scrollYProgress,
    [0, position, ...(isLast ? [1] : [position + exitGap, 1])],
    [1 - index * 0.1, 1, ...(isLast ? [1] : [1.2, 1.2])]
  );
  const opacity = useTransform(
    scrollYProgress,
    [0, position, ...(isLast ? [1] : [position + exitGap, 1])],
    [1, 1, ...(isLast ? [1] : [0, 0])]
  );
  const blur = useTransform(
    scrollYProgress,
    [0, position, ...(isLast ? [1] : [position + exitGap, 1])],
    [2, 0, ...(isLast ? [0] : [10, 10])]
  );

  return (
    <motion.div
      style={{
        translateX,
        translateY,
        scaleY: scale,
        opacity,
        filter: useTransform(blur, (value) => `blur(${value}px)`),
        zIndex: totalItems - index
      }}
      className="h-[300px] max-w-sm w-full absolute rounded-xl overflow-hidden"
    >
      <Image
        src={image}
        alt={image}
        width={1000}
        height={1000}
        className="object-cover h-full w-full"
      />
    </motion.div>
  );
};

const StackScroll = ({ items }: { items: { image: string }[] }) => {
  const ref = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    container: ref,
    offset: ['start start', 'end end']
  });

  return (
    <div
      ref={ref}
      className="h-full w-full overflow-y-auto relative"
      style={{ minHeight: '400px' }}
    >
      <div className="h-full w-full absolute top-0 left-0">
        <div
          className="w-full"
          style={{
            height: (items.length / 2 + 2) * 300
          }}
        />
      </div>
      <div className="grid grid-cols-2 gap-12 h-full w-full sticky top-0 left-0">
        <div className="flex flex-col h-full justify-center w-full items-end relative">
          {items.slice(0, items.length / 2).map((image, index) => (
            <StackScrollItem
              key={`left-column-image-${index}`}
              image={image.image}
              index={index}
              isLeft={true}
              scrollYProgress={scrollYProgress}
              totalItems={items.length}
            />
          ))}
        </div>
        <div className="flex flex-col h-full justify-center w-full items-start relative">
          {items.slice(items.length / 2).map((image, index) => (
            <StackScrollItem
              key={`right-column-image-${index}`}
              image={image.image}
              index={index}
              isLeft={false}
              scrollYProgress={scrollYProgress}
              totalItems={items.length}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default StackScroll;
```

## Attribution

Source: StackBits · Author: Samit Kapoor · Original: https://stackbits.dev/docs/stackScroll

Adapted from the original. Credit the original author when you ship this.
