# Rolling Ball Scroll Indicator

A scroll indicator that displays animated bars with a rolling ball that moves across them as you scroll. The bars grow and shrink based on your scroll position while a colorful ball rolls smoothly from left to right.

**Interaction.** A ball rolls across growing bars to mark scroll progress.

- Categories: Scroll
- Tags: spring, scroll-driven
- Import: `@/components/ui/rolling-ball-scroll-indicator`
- Inspiration: StackBits (port) — https://stackbits.dev/docs/rollingballscrollindicator

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/rolling-ball-scroll-indicator.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `framer-motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `scrollContainerId` | `string` | `'scroll-target'` | — |
| `direction` | `"vertical" | "horizontal"` | `'vertical'` | — |

## Usage

```tsx
"use client";

import RollingBallScrollIndicator from "./component";
import Image from "next/image";

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
		<div className="relative h-[480px] w-full overflow-hidden">
			<div className="h-full w-full flex items-start justify-center gap-2 relative">
    <div
        id="scroll-target"
        className="h-full w-full overflow-y-scroll absolute top-0 left-0"
    >
        <div className="flex flex-col items-center justify-start gap-2 pb-14">
        {images.map((image, i) => {
            return (
            <Image key={i} src={image.image} alt={image.image} width={512} height={512} />
            );
        })}
        </div>
    </div>
    <div className="sticky top-full right-10 z-[999] w-full bg-black/50 p-2 flex items-end justify-center backdrop-blur-xl h-14">
        <RollingBallScrollIndicator scrollContainerId="scroll-target" direction="vertical" />
    </div>
</div>
		</div>
	);
}
```

## Source

### `components/ui/rolling-ball-scroll-indicator.tsx`

```tsx
'use client';

import { motion, MotionValue, useScroll, useSpring, useTransform } from 'framer-motion';
import { usePathname } from 'next/navigation';
import React, { useEffect } from 'react';

const BARS = 40;

const ScrollBar = ({
  index,
  scrollProgress
}: {
  index: number;
  scrollProgress: MotionValue<number>;
}) => {
  const thisBarPosition = index / BARS;

  // Transform scroll progress directly into distance
  const distance = useTransform(scrollProgress, (value) => {
    return Math.abs(value - thisBarPosition);
  });

  // Apply spring to the distance for smooth animation
  const springDistance = useSpring(distance, {
    stiffness: 700,
    damping: 40
  });

  // Transform the spring distance into height
  const height = useTransform(springDistance, [0, 1], [0, 35]);
  const opacity = useTransform(springDistance, [0, 0.05, 1], [0, 0.2, 1]);

  return (
    <motion.div
      className="w-0.5 bg-white"
      style={{
        height: height,
        opacity: useTransform(opacity, (value) => `${value}`)
      }}
    />
  );
};

const ScrollIndicatorBars = ({
  container,
  direction
}: {
  container: HTMLElement;
  direction: 'vertical' | 'horizontal';
}) => {
  const ref = React.useRef<HTMLElement>(container);

  // Update ref if container changes
  React.useEffect(() => {
    ref.current = container;
  }, [container]);

  const { scrollXProgress, scrollYProgress } = useScroll({
    container: ref
  });

  const springDistance = useSpring(direction === 'vertical' ? scrollYProgress : scrollXProgress, {
    stiffness: 700,
    damping: 40
  });

  const left = useTransform(springDistance, [0, 1], [0, 100]);
  const rotateZ = useTransform(springDistance, [0, 1], [0, 3000]);

  return (
    <div className="flex items-end justify-center gap-1 md:gap-2 relative w-fit">
      {Array.from({ length: BARS }).map((_, index) => {
        return (
          <ScrollBar
            key={`scroll-bar-${index}`}
            index={index}
            scrollProgress={direction === 'vertical' ? scrollYProgress : scrollXProgress}
          />
        );
      })}
      <motion.div
        className="h-3.5 w-1 rounded-full absolute bottom-0"
        style={{ left: useTransform(left, (value) => `${value}%`) }}
      >
        <motion.div
          style={{ rotateZ: useTransform(rotateZ, (value) => `${value}deg`) }}
          className="w-3.5 h-3.5 rounded-full bg-gradient-to-b from-yellow-500 to-green-500 from-50% to-50% absolute top-0 left-1/2 -translate-x-1/2"
        ></motion.div>
      </motion.div>
    </div>
  );
};

const ScrollIndicator = ({
  scrollContainerId,
  direction
}: {
  scrollContainerId: string;
  direction: 'vertical' | 'horizontal';
}) => {
  const [container, setContainer] = React.useState<HTMLElement | null>(null);

  useEffect(() => {
    const scrollContainer = document.getElementById(scrollContainerId);
    if (scrollContainer) {
      setContainer(scrollContainer);
    }
  }, [scrollContainerId]);

  if (!container) {
    return null;
  }

  return <ScrollIndicatorBars container={container} direction={direction} />;
};

const RollingBallScrollIndicator = ({
  scrollContainerId = 'scroll-target',
  direction = 'vertical'
}: {
  scrollContainerId?: string;
  direction?: 'vertical' | 'horizontal';
}) => {
  const pathname = usePathname();

  return (
    <ScrollIndicator key={pathname} scrollContainerId={scrollContainerId} direction={direction} />
  );
};

export default RollingBallScrollIndicator;
```

## Attribution

Source: StackBits · Author: Samit Kapoor · Original: https://stackbits.dev/docs/rollingballscrollindicator

Adapted from the original. Credit the original author when you ship this.
