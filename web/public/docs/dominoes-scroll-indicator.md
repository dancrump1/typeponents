# Dominoes Scroll Indicator

A scroll indicator that shows domino-like bars that rotate as you scroll through content. Each bar rotates at different positions to create a cascading effect.

**Interaction.** A stack of bars rotates in sequence to show how far you've scrolled.

- Categories: Scroll
- Tags: scroll-driven
- Import: `@/components/ui/dominoes-scroll-indicator`
- Inspiration: StackBits (port) — https://stackbits.dev/docs/dominoesscrollindicator

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/dominoes-scroll-indicator.json
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

import DominoesScrollIndicator from "./component";
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
			<div className="h-full w-full flex items-start justify-center gap-2 relative overflow-hidden">
  <div id="dominoes-scroll-target" className="h-full w-full overflow-y-scroll">
    <div className="flex flex-col items-center justify-start gap-2 pb-14">
      {images.map((image, i) => {
        return (
          <Image key={i} src={image.image} alt={image.image} width={512} height={512} />
        );
      })}
    </div>
  </div>

  <div className="absolute bottom-4 right-4 z-[999] bg-black/50 p-2 rounded">
    <DominoesScrollIndicator
      scrollContainerId="dominoes-scroll-target"
      direction="vertical"
    />
  </div>
</div>
		</div>
	);
}
```

## Source

### `components/ui/dominoes-scroll-indicator.tsx`

```tsx
'use client';

import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
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

  const rotateZ = useTransform(scrollProgress, [0, thisBarPosition, 1], [0, 0, 90]);

  return (
    <motion.div
      className="w-1 bg-zinc-200 h-10"
      style={{
        rotateZ: useTransform(rotateZ, (value) => `${value}deg`),
        transformOrigin: 'bottom'
      }}
    />
  );
};

const DominoesScrollBars = ({
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

  const { scrollYProgress, scrollXProgress } = useScroll({
    container: ref
  });

  return (
    <div className="flex items-end justify-center gap-1 relative">
      {Array.from({ length: BARS }).map((_, index) => {
        return (
          <ScrollBar
            key={`scroll-bar-${index}`}
            index={index}
            scrollProgress={direction === 'vertical' ? scrollYProgress : scrollXProgress}
          />
        );
      })}
    </div>
  );
};

const DominoesScroll = ({
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

  return <DominoesScrollBars container={container} direction={direction} />;
};

const DominoesScrollIndicator = ({
  scrollContainerId = 'scroll-target',
  direction = 'vertical'
}: {
  scrollContainerId?: string;
  direction?: 'vertical' | 'horizontal';
}) => {
  const pathname = usePathname();

  return (
    <DominoesScroll key={pathname} scrollContainerId={scrollContainerId} direction={direction} />
  );
};

export default DominoesScrollIndicator;
```

## Attribution

Source: StackBits · Author: Samit Kapoor · Original: https://stackbits.dev/docs/dominoesscrollindicator

Adapted from the original. Credit the original author when you ship this.
