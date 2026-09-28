# Icon Wheel

A rotating wheel that displays your tech stack icons in continuous motion. Perfect for showcasing programming languages and frameworks on your portfolio with smooth animations and hover effects.

**Interaction.** Icons orbit in a slowly rotating wheel; hover scales the one under the pointer.

- Categories: Special Effects & FX
- Tags: hover
- Import: `@/components/ui/icon-wheel`
- Inspiration: StackBits (port) — https://stackbits.dev/docs/iconwheel

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/icon-wheel.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `framer-motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `icons` *(required)* | `string[]` | — | — |
| `radius` | `number` | `200` | — |
| `className` | `string` | — | — |

## Usage

```tsx
"use client";

import IconWheel from "./component";

export default function Usage() {
	return (
		<div className="flex min-h-120 w-full items-center justify-center overflow-hidden p-8">
			<IconWheel
	icons={[
		"/stackbits/css.svg",
		"/stackbits/javascript.svg",
		"/stackbits/nextjs.svg",
		"/stackbits/nodejs.svg",
		"/stackbits/react.svg",
		"/stackbits/tailwindcss.svg",
		"/stackbits/typescript.svg",
		"/stackbits/threejs.svg",
	]}
	radius={75}
	className="!h-[32px] !w-[32px]"
/>
		</div>
	);
}
```

## Source

### `components/ui/icon-wheel.tsx`

```tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { cn } from '@/lib/utils';

type IconWheelProps = {
  icons: Array<string>;
  radius?: number;
  className?: string;
};

const IconWheel = ({ icons, radius = 200, className }: IconWheelProps) => {
  const centerX = 32; // Center of the wheel (half of the container width)
  const centerY = 32; // Center of the wheel (half of the container height)
  const angleStep = (2 * Math.PI) / icons.length; // Angle between each item

  return (
    <motion.div
      initial={{
        opacity: 0
      }}
      whileInView={{
        opacity: 1,
        transition: {
          delay: 0.5,
          duration: 0.5
        }
      }}
      viewport={{
        once: true
      }}
      animate={{
        rotateZ: 360,
        transition: { duration: 10, ease: 'linear', repeat: Infinity }
      }}
      className={cn(
        'relative h-[250px] sm:h-[500px] w-[250px] sm:w-[500px] flex items-center justify-center my-10',
        className
      )}
    >
      {icons.map((url, i) => {
        const angle = i * angleStep; // Angle for the current icon
        const x = centerX + radius * Math.cos(angle) - 32; // Subtract half of img width (64/2)
        const y = centerY + radius * Math.sin(angle) - 32; // Subtract half of img height (64/2)

        return (
          <motion.div
            animate={{
              rotateZ: -360,
              transition: { duration: 10, ease: 'linear', repeat: Infinity }
            }}
            whileHover={{
              scale: 1.2
            }}
            key={`techstackwheel${i}`}
            initial={{ x, y }}
            className="absolute rounded-full"
          >
            <Image src={url} height={64} width={64} alt="techstackwheel" />
          </motion.div>
        );
      })}
    </motion.div>
  );
};

export default IconWheel;
```

## Attribution

Source: StackBits · Author: Samit Kapoor · Original: https://stackbits.dev/docs/iconwheel

Adapted from the original. Credit the original author when you ship this.
