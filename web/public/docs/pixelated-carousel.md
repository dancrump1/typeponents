# Pixelated Carousel

A carousel that shows images with a pixelated effect. Images change with a grid animation that makes them look blocky.

**Interaction.** Images dissolve into a pixel grid before resolving into the next slide.

- Categories: Carousels
- Tags: autoplay
- Import: `@/components/ui/pixelated-carousel`
- Inspiration: StackBits (port) — https://stackbits.dev/docs/pixelatedcarousel

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/pixelated-carousel.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `framer-motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `images` *(required)* | `string[]` | — | — |
| `pixelSize` | `number` | `100` | — |
| `animationDelayStep` | `number` | `0.02` | — |
| `pixelTransitionDuration` | `number` | `0.1` | — |

## Usage

```tsx
"use client";

import PixelatedCarousel from "./component";

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
			<div className="h-[1000px] w-full flex items-center justify-center">
  <div className="h-[500px] w-[800px]">
    <PixelatedCarousel
      pixelSize={50}
      pixelTransitionDuration={0.01}
      images={["https://picsum.photos/seed/godofwar/800/500", "https://picsum.photos/seed/lastofus/800/500", "https://picsum.photos/seed/rdr2/800/500", "https://picsum.photos/seed/uncharted/800/500"]}
    />
  </div>
</div>
		</div>
	);
}
```

## Source

### `components/ui/pixelated-carousel.tsx`

```tsx
'use client';

import Image from 'next/image';
import React, { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';

const PixelatedCarousel = ({
  pixelSize = 100,
  animationDelayStep = 0.02,
  images,
  pixelTransitionDuration = 0.1
}: {
  pixelSize?: number;
  animationDelayStep?: number;
  images: string[];
  pixelTransitionDuration?: number;
}) => {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [grid, setGrid] = useState<{ rows: number; cols: number }>({ rows: 0, cols: 0 });
  const [isInitialized, setIsInitialized] = useState(false);
  const [isFirstCycle, setIsFirstCycle] = useState(true);

  const SIZE = pixelSize;
  const ANIMATION_DELAY_STEP = animationDelayStep;
  const PIXEL_TRANSITION_DURATION = pixelTransitionDuration;

  const sizeOfBox = useMemo(() => {
    if (!ref.current || grid.rows === 0 || grid.cols === 0) {
      return { h: 0, w: 0 };
    }
    const height = ref.current.clientHeight;
    const width = ref.current.clientWidth;
    return {
      h: height / grid.rows,
      w: width / grid.cols
    };
  }, [grid.rows, grid.cols]);

  const shuffledDelays = useMemo(() => {
    const totalBoxes = grid.rows * grid.cols;
    if (totalBoxes === 0) return [];

    const delays = Array.from({ length: totalBoxes }, (_, i) => i * PIXEL_TRANSITION_DURATION);

    for (let i = delays.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [delays[i], delays[j]] = [delays[j], delays[i]];
    }

    return delays;
  }, [grid.rows, grid.cols, PIXEL_TRANSITION_DURATION]);

  const boxState = useMemo(() => {
    if (shuffledDelays.length === 0) return [];

    return shuffledDelays.map((delay) => {
      const baseShade = 20 - Math.floor(Math.random() * 20);
      return {
        delay,
        color: `rgb(${baseShade}, ${baseShade}, ${baseShade})`
      };
    });
  }, [shuffledDelays]);

  const calculateGrid = useCallback(() => {
    if (!ref.current) return { rows: 0, cols: 0 };

    const height = ref.current.clientHeight;
    const width = ref.current.clientWidth;
    const rows = Math.floor(height / SIZE);
    const cols = Math.floor(width / SIZE);

    return { rows, cols };
  }, [SIZE]);

  const initialize = useCallback(() => {
    const newGrid = calculateGrid();

    setGrid((prev) => {
      if (prev.rows === newGrid.rows && prev.cols === newGrid.cols) {
        return prev;
      }
      return newGrid;
    });

    setIsInitialized(true);
  }, [calculateGrid]);

  useEffect(() => {
    initialize();

    const handleResize = () => initialize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initialize]);

  useEffect(() => {
    if (!isInitialized || grid.rows === 0 || grid.cols === 0) return;

    const allBoxesBlackTime =
      ANIMATION_DELAY_STEP * (grid.rows * grid.cols - 1) + PIXEL_TRANSITION_DURATION;

    if (isFirstCycle) {
      const firstTimeout = setTimeout(() => {
        setActiveImageIndex((prev) => (prev + 1) % images.length);
        setIsFirstCycle(false);
      }, allBoxesBlackTime * 1000);

      return () => clearTimeout(firstTimeout);
    } else {
      const id = setInterval(() => {
        setActiveImageIndex((prev) => (prev + 1) % images.length);
      }, allBoxesBlackTime * 1000 * 2);

      return () => clearInterval(id);
    }
  }, [
    images.length,
    grid.rows,
    grid.cols,
    isInitialized,
    isFirstCycle,
    ANIMATION_DELAY_STEP,
    PIXEL_TRANSITION_DURATION
  ]);

  const gridElements = useMemo(() => {
    if (!isInitialized || grid.rows === 0 || grid.cols === 0) return null;

    return Array.from({ length: grid.rows }).map((_, row) => (
      <span key={row} className="flex">
        {Array.from({ length: grid.cols }).map((_, col) => {
          const boxIndex = row * grid.cols + col;
          const box = boxState[boxIndex];

          if (!box) return null;

          return (
            <motion.span
              key={col}
              style={{
                height: sizeOfBox.h,
                width: sizeOfBox.w,
                backgroundColor: box.color
              }}
              initial={{
                opacity: 0
              }}
              animate={{
                opacity: 1
              }}
              transition={{
                duration: PIXEL_TRANSITION_DURATION,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: box.delay,
                repeatDelay: grid.rows * grid.cols * ANIMATION_DELAY_STEP
              }}
            />
          );
        })}
      </span>
    ));
  }, [
    isInitialized,
    grid.rows,
    grid.cols,
    boxState,
    sizeOfBox,
    PIXEL_TRANSITION_DURATION,
    ANIMATION_DELAY_STEP
  ]);

  return (
    <div ref={ref} className="h-full w-full relative">
      {isInitialized && (
        <span className="h-full w-full absolute top-0 left-0 z-10">{gridElements}</span>
      )}
      <div className="h-full w-full z-0 relative">
        {images.map((image, index) => (
          <Image
            src={image}
            key={image + index}
            alt="pixelated carousel"
            fill
            className="object-cover absolute top-0 left-0 h-full w-full"
            style={{
              zIndex: activeImageIndex === index ? 10 : 0
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default PixelatedCarousel;
```

## Attribution

Source: StackBits · Author: Samit Kapoor · Original: https://stackbits.dev/docs/pixelatedcarousel

Adapted from the original. Credit the original author when you ship this.
