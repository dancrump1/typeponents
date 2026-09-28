# Masonry Grid

A grid layout that arranges items like Pinterest, automatically fitting them together without gaps. Perfect for image galleries and portfolios.

**Interaction.** Items pack into a Pinterest-style masonry; hover lifts the card.

- Categories: Grids & Layouts
- Tags: hover
- Import: `@/components/ui/masonry-grid`
- Inspiration: StackBits (port) — https://stackbits.dev/docs/masonrygrid

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/masonry-grid.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `framer-motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `items` *(required)* | `{ image: string; title: string; description: string; }[]` | — | — |
| `columns` | `number` | `undefined` | — |

## Usage

```tsx
"use client";

import MasonryGrid from "./component";

const items = [
	{
		title: "Urban Skyline",
		image: "https://picsum.photos/seed/skyline/600/800",
		description:
			"A breathtaking view of a modern cityscape with towering skyscrapers illuminated at dusk.",
	},
	{
		title: "Mountain Retreat",
		image: "https://picsum.photos/seed/cabin/600/500",
		description:
			"A serene cabin nestled in the heart of towering mountains, perfect for a peaceful getaway.",
	},
	{
		title: "Forest Wander",
		image: "https://picsum.photos/seed/forest/600/700",
		description:
			"A misty trail winding through a dense, enchanting forest filled with lush greenery.",
	},
	{
		title: "Serene Lake",
		image: "https://picsum.photos/seed/lake/600/450",
		description:
			"A tranquil lake reflecting the golden hues of the sunset, surrounded by peaceful nature.",
	},
	{
		title: "Golden Hour",
		image: "https://picsum.photos/seed/sunset/600/400",
		description:
			"A mesmerizing sunset casting a warm glow over the ocean, creating a dreamlike atmosphere.",
	},
	{
		title: "Coastal Vibes",
		image: "https://picsum.photos/seed/coast/600/550",
		description:
			"Crystal-clear waves crashing against a sandy shore, offering a perfect beach escape.",
	},
	{
		title: "Night Lights",
		image: "https://picsum.photos/seed/night/600/750",
		description:
			"A dazzling city skyline at night, with vibrant lights illuminating the urban landscape.",
	},
	{
		title: "Rustic Charm",
		image: "https://picsum.photos/seed/rustic/600/480",
		description:
			"A cozy wooden cabin with a warm, inviting atmosphere set in a countryside setting.",
	},
];

export default function Usage() {
	return (
		<div className="flex min-h-120 w-full items-center justify-center overflow-hidden p-8">
			<MasonryGrid items={items} />
		</div>
	);
}
```

## Source

### `components/ui/masonry-grid.tsx`

```tsx
'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';

interface MasonryGridProps {
  items: { image: string; title: string; description: string }[];
  columns?: number | undefined;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ items, columns = undefined }) => {
  const [imagesLoaded, setImagesLoaded] = useState<{ [key: string]: boolean }>({});

  if (!items || items.length === 0) {
    return <div className="text-center p-4">No items to display</div>;
  }

  return (
    <div
      style={{
        columns: columns
      }}
      className={`${
        !columns && 'columns-1 sm:columns-2 md:columns-3 lg:columns-4'
      } gap-2 overflow-y-auto p-3 w-full max-w-4xl hide-scrollbar`}
    >
      {items.map((item, index) => {
        // Calculate row number based on screen size and index
        const getColumnCount = () => {
          if (typeof window === 'undefined') return 1;
          const width = window.innerWidth;
          if (width >= 1024) return 4; // lg
          if (width >= 768) return 3; // md
          if (width >= 640) return 2; // sm
          return 1;
        };

        const columnCount = getColumnCount();
        const rowIndex = Math.floor(index / columnCount);

        return (
          <motion.div
            key={index}
            className="break-inside-avoid mb-4 relative group rounded-xl overflow-hidden p-1 border-[1px] border-transparent hover:border-[1px] hover:border-neutral-800"
            initial={{ opacity: 0, y: 20 }}
            animate={{
              opacity: 1,
              y: 0,
              transition: {
                duration: 0.5,
                delay: rowIndex * 0.1,
                ease: 'easeOut'
              }
            }}
            whileHover={{ scale: 1.05 }}
          >
            <div className="relative">
              <div className="relative w-full flex gap-1 flex-col items-start justify-start">
                {!imagesLoaded[item.image] && (
                  <div className="absolute inset-0 w-full h-[300px] bg-neutral-500/50 animate-pulse rounded-lg" />
                )}
                <Image
                  src={item.image}
                  alt={item.title}
                  width={400}
                  height={300}
                  className={`w-full h-auto transition-transform duration-300 rounded-lg ${
                    !imagesLoaded[item.image] ? 'opacity-0' : 'opacity-100'
                  }`}
                  sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  onLoad={() => {
                    setImagesLoaded((prev) => ({ ...prev, [item.image]: true }));
                  }}
                  onError={() => {
                    console.error(`Error loading image: ${item.image}`);
                    setImagesLoaded((prev) => ({ ...prev, [item.image]: true }));
                  }}
                />
                {imagesLoaded[item.image] && (
                  <div className="w-full">
                    <h3 className="text-sm font-medium">{item.title}</h3>
                    <p className="mt-0 text-xs text-neutral-500 line-clamp-2 overflow-hidden">
                      {item.description}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
};

export default MasonryGrid;
```

## Attribution

Source: StackBits · Author: Samit Kapoor · Original: https://stackbits.dev/docs/masonrygrid

Adapted from the original. Credit the original author when you ship this.
