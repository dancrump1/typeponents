# Image Pile

A stack of images that shuffle and change positions automatically. Perfect for creating dynamic image galleries and portfolios.

**Interaction.** A stack of photos shuffles which one sits on top on a timer.

- Categories: Images
- Tags: autoplay
- Import: `@/components/ui/image-pile`
- Inspiration: StackBits (port) — https://stackbits.dev/docs/imagepile

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/image-pile.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `framer-motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `images` *(required)* | `string[]` | — | — |
| `speed` | `number` | `2` | — |

## Usage

```tsx
"use client";

import ImagePile from "./component";

const images = [
	"https://picsum.photos/seed/pile1/1200/800",
	"https://picsum.photos/seed/pile2/1200/800",
	"https://picsum.photos/seed/pile3/1200/800",
	"https://picsum.photos/seed/pile4/1200/800",
];

export default function Usage() {
	return (
		<div className="flex min-h-120 w-full items-center justify-center overflow-hidden p-8">
			<ImagePile images={images} />
		</div>
	);
}
```

## Source

### `components/ui/image-pile.tsx`

```tsx
'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';

const ImagePile = ({ images, speed = 2 }: { images: string[]; speed?: number }) => {
  const [topIndex, setTopIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setTopIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, speed * 1000);

    return () => {
      clearInterval(id);
    };
  }, [images.length]);

  return (
    <div className="relative h-[200px] sm:h-[260px] md:h-[390px] lg:h-[450px] xl:h-[500px] w-[310px] sm:w-[500px] md:w-[725px] lg:w-[900px] xl:w-[1200px] overflow-visible">
      {images.map((image, i) => {
        const key = `stacked-card-${i}`;
        const isTop = topIndex === i;
        const secondTopIndex = (topIndex + 2) % images.length;
        const zIndex = isTop ? 100 : secondTopIndex ? 99 : images.length - i;
        const y: number = Math.random() * 20;
        const x: number = Math.random() * 20;
        const rotation = i * (Math.random() * 1 + 2) - 2;

        return (
          <motion.div
            key={key}
            className="absolute w-full h-full"
            style={{
              zIndex,
              transformOrigin: 'center center'
            }}
            animate={{
              rotateZ: isTop ? 0 : rotation,
              translateX: Math.random() < 0.5 ? x : -x,
              opacity: isTop ? [0, 1] : 0.8,
              translateY: isTop ? [30, Math.random() < 0.5 ? y : -y] : Math.random() < 0.5 ? y : -y,
              transition: {
                duration: 0.5
              }
            }}
            initial={isTop ? { rotateZ: 0 } : { rotateZ: rotation }}
          >
            <div className="relative h-full w-full overflow-hidden rounded-3xl">
              <Image
                src={image}
                alt={`stacked-card-${i}`}
                height={1080}
                width={1920}
                className="h-full w-full object-cover"
                priority={isTop}
              />
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ImagePile;
```

## Attribution

Source: StackBits · Author: Samit Kapoor · Original: https://stackbits.dev/docs/imagepile

Adapted from the original. Credit the original author when you ship this.
