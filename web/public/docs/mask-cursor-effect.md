# Mask Cursor Effect

A component that reveals hidden content through a circular mask that follows your mouse. Perfect for creating interactive reveal effects.

**Interaction.** A circular mask follows the pointer and reveals hidden copy underneath.

- Categories: Cursor & Pointer Effects
- Tags: hover, cursor-tracking
- Import: `@/components/ui/mask-cursor-effect`
- Inspiration: StackBits (port) — https://stackbits.dev/docs/maskcursoreffect

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/mask-cursor-effect.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `framer-motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `hiddenComponent` | `React.ReactNode` | — | — |
| `className` | `string` | — | — |
| `compressedMaskSize` | `number` | `40` | — |
| `expandedMaskSize` | `number` | `350` | — |

## Usage

```tsx
"use client";

import MaskCursorEffect from "./component";

export default function Usage() {
	return (
		<div className="flex min-h-120 w-full items-center justify-center overflow-hidden p-8">
			<div className="h-full w-full flex flex-col gap-5 items-center justify-center overflow-y-auto relative p-10">
  <MaskCursorEffect
    hiddenComponent={
      <div className="max-w-4xl text-7xl font-bold">
        I'm a "full-stack developer" powered by Stack Overflow and prayer. My code is 10%
        genius, 90% duct tape.
      </div>
    }
  >
    <div className="max-w-4xl text-7xl font-bold">
      I'm a software engineer specializing in React, Next.js, and TypeScript. I build
      creative interfaces with solid backend logic.
    </div>
  </MaskCursorEffect>
</div>
		</div>
	);
}
```

## Source

### `components/ui/mask-cursor-effect.tsx`

```tsx
'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const getMaskDataUrl = () => {
  const svgString = `<svg width="526" height="526" viewBox="0 0 526 526" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="263" cy="263" r="263" fill="black" />
  </svg>`;
  return `data:image/svg+xml;base64,${btoa(svgString)}`;
};

const MaskCursorEffect = ({
  children,
  hiddenComponent,
  className,
  compressedMaskSize = 40,
  expandedMaskSize = 350
}: {
  children: React.ReactNode;
  hiddenComponent?: React.ReactNode;
  className?: string;
  compressedMaskSize?: number;
  expandedMaskSize?: number;
}) => {
  const [mousePosition, setMousePosition] = useState({ x: 20, y: 20 });
  const [isHovered, setIsHovered] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  const MASK_SIZE = isHovered ? expandedMaskSize : compressedMaskSize;

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { left, top } = wrapperRef.current?.getBoundingClientRect() || {
        left: 0,
        top: 0
      };
      setMousePosition({ x: e.clientX - left, y: e.clientY - top });
    };
    wrapperRef.current?.addEventListener('mousemove', handleMouseMove);
    return () => wrapperRef.current?.removeEventListener('mousemove', handleMouseMove);
  }, [wrapperRef]);

  return (
    <div ref={wrapperRef} className="h-full w-full relative flex flex-col">
      <motion.div
        animate={{
          WebkitMaskPosition: `${mousePosition.x - MASK_SIZE / 2}px ${
            mousePosition.y - MASK_SIZE / 2
          }px`,
          maskSize: `${MASK_SIZE}px ${MASK_SIZE}px`
        }}
        style={{
          maskImage: `url("${getMaskDataUrl()}")`,
          WebkitMaskImage: `url("${getMaskDataUrl()}")`,
          maskRepeat: 'no-repeat',
          WebkitMaskRepeat: 'no-repeat',
          backgroundColor: '#EA5A47',

          color: 'black'
        }}
        transition={{
          type: 'tween',
          ease: 'backOut'
        }}
        className={cn(
          'h-[800px] w-full flex items-center justify-center absolute z-10 ',
          className
        )}
      >
        <div onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
          {hiddenComponent}
        </div>
      </motion.div>
      <div
        className={cn('h-[800px] w-full flex items-center justify-center text-white/70', className)}
      >
        {children}
      </div>
    </div>
  );
};

export default MaskCursorEffect;
```

## Attribution

Source: StackBits · Author: Samit Kapoor · Original: https://stackbits.dev/docs/maskcursoreffect

Adapted from the original. Credit the original author when you ship this.
