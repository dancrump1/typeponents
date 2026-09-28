# Sine Wave

An animated component that arranges items in a sine wave pattern with smooth spring animations. Perfect for creating dynamic, flowing layouts with customizable amplitude and frequency.

**Interaction.** Thumbnails settle onto a sine curve with a staggered spring.

- Categories: Images
- Tags: spring
- Import: `@/components/ui/sine-wave`
- Inspiration: StackBits (port) — https://stackbits.dev/docs/sineWave

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/sine-wave.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `framer-motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `items` *(required)* | `{ image: string; }[]` | — | — |
| `amplitude` | `number` | `100` | — |
| `frequency` | `number` | `5` | — |
| `shouldAnimate` | `boolean` | `true` | — |
| `itemClassName` | `string` | `''` | — |

## Usage

```tsx
"use client";

import SineWave from "./component";

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
			<SineWave items={images} />
		</div>
	);
}
```

## Source

### `components/ui/sine-wave.tsx`

```tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const SineWave = ({
  items,
  amplitude = 100,
  frequency = 5,
  shouldAnimate = true,
  itemClassName = ''
}: {
  items: { image: string }[];
  amplitude?: number;
  frequency?: number;
  shouldAnimate?: boolean;
  itemClassName?: string;
}) => {
  return (
    <div className="w-full h-96 flex items-center justify-center overflow-hidden">
      <div className="flex items-center justify-center gap-4 relative">
        {items.map((item, index) => {
          const yd = Math.sin((index * Math.PI) / frequency) * amplitude;

          return (
            <motion.div
              key={`sine-wave-${index}`}
              className="relative"
              initial={{
                opacity: shouldAnimate ? 0 : 1,
                y: shouldAnimate ? 0 : yd
              }}
              animate={{
                opacity: 1,
                y: yd
              }}
              transition={{
                duration: 0.8,
                type: 'spring',
                bounce: 0.5,
                delay: index * 0.05
              }}
            >
              <div className={cn(`w-20 h-20 rounded-xl overflow-hidden`, itemClassName)}>
                <Image
                  src={item.image}
                  alt={`Item ${index + 1}`}
                  width={64}
                  height={64}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default SineWave;
```

## Attribution

Source: StackBits · Author: Samit Kapoor · Original: https://stackbits.dev/docs/sineWave

Adapted from the original. Credit the original author when you ship this.
