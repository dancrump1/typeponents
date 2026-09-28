# Magnet Tabs

MagnetTabs is a stylish tab navigation component for switching between sections in a user interface. It’s ideal for dashboards, settings pages, admin panels, or product views, anywhere content needs to be organized into tabs for better usability.

**Interaction.** The active tab's highlight slides to follow the selection like a magnet.

- Categories: Navigation
- Tags: spring, hover
- Import: `@/components/ui/magnet-tabs`
- Inspiration: StackBits (port) — https://stackbits.dev/docs/magnettabs

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/magnet-tabs.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `framer-motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `slug` *(required)* | `string` | — | — |
| `options` *(required)* | `string[]` | — | — |
| `onSelect` *(required)* | `(option: string) => void` | — | — |
| `activeTab` *(required)* | `string` | — | — |

## Usage

```tsx
'use client';

import React, { useState } from 'react';
import MagnetTabs from "./component";

const MagnetTabsDemo = () => {
  const [activeTab, setActiveTab] = useState('Tab 1');

  return (
    <MagnetTabs
      slug="magnet-tabs"
      options={[
        'Tab 1',
        'Tab 2',
        'Tab 3',
        'Tab 4',
        'Tab 5',
        'Tab 6',
        'Tab 7',
        'Tab 8',
        'Tab 9',
        'Tab 10'
      ]}
      onSelect={(option) => setActiveTab(option)}
      activeTab={activeTab}
    />
  );
};

export default MagnetTabsDemo;
```

## Source

### `components/ui/magnet-tabs.tsx`

```tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface MagnetTabsProps {
  slug: string;
  options: string[];
  onSelect: (option: string) => void;
  activeTab: string;
}

const MagnetTabs = ({ slug, options, onSelect, activeTab }: MagnetTabsProps) => {
  const [hovered, setHovered] = React.useState<string | undefined>(undefined);

  return (
    <div className="flex items-start justify-start">
      <ul className="flex border-[1px] border-black/10 border-b-0">
        {options.map((option) => {
          const isActive = activeTab === option;
          return (
            <li
              onMouseEnter={() => setHovered(option)}
              onMouseLeave={() => setHovered(undefined)}
              key={slug + option}
              onClick={() => onSelect(option)}
              className="relative cursor-pointer shrink-0"
            >
              <p
                className={`z-10 relative px-2 py-1 transition-all ${
                  isActive ? 'opacity-100' : 'opacity-50 hover:opacity-100'
                }`}
              >
                {option}
              </p>

              {isActive && (
                <motion.div
                  layout
                  layoutId={slug + 'magnet'}
                  transition={{ duration: 0.2, type: 'spring', bounce: 0.2 }}
                  className="w-full h-1 absolute bottom-full left-0 bg-red-500 rounded-sm"
                />
              )}

              {(hovered === option || (hovered === undefined && isActive)) && (
                <motion.div
                  layout
                  layoutId={slug + 'tab-bar-highlight'}
                  transition={{ duration: 0.2, type: 'spring', bounce: 0 }}
                  className="w-full h-full absolute bottom-0 left-0 bg-white/10 rounded-sm"
                />
              )}
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default MagnetTabs;
```

## Attribution

Source: StackBits · Author: Samit Kapoor · Original: https://stackbits.dev/docs/magnettabs

Adapted from the original. Credit the original author when you ship this.
