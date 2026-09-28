# Avatar Circles

Overlapping circles of avatars.

- Categories: Images
- Import: `@/components/ui/magic-avatar-circles`
- Inspiration: Magic UI (port) — https://magicui.design/docs/components/avatar-circles

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/magic-avatar-circles.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Usage

```tsx
"use client";

import { AvatarCircles } from "./component";

export default function Usage() {
	return (
		<div className="flex min-h-120 w-full items-center justify-center overflow-hidden p-8">
			<AvatarCircles avatarUrls={[
				{
					imageUrl: "https://avatars.githubusercontent.com/u/16860528",
					profileUrl: "https://github.com/dancrump1",
				},
			]} />
		</div>
	);
}
```

## Source

### `components/ui/magic-avatar-circles.tsx`

```tsx
"use client"

import { cn } from "@/lib/utils"

interface Avatar {
  imageUrl: string
  profileUrl: string
}
interface AvatarCirclesProps {
  className?: string
  numPeople?: number
  avatarUrls: Avatar[]
}

export const AvatarCircles = ({
  numPeople,
  className,
  avatarUrls,
}: AvatarCirclesProps) => {
  return (
    <div className={cn("z-10 flex -space-x-4 rtl:space-x-reverse", className)}>
      {avatarUrls.map((url, index) => (
        <a
          key={index}
          href={url.profileUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            key={index}
            className="h-10 w-10 rounded-full border-2 border-white dark:border-gray-800"
            src={url.imageUrl}
            width={40}
            height={40}
            alt={`Avatar ${index + 1}`}
          />
        </a>
      ))}
      {(numPeople ?? 0) > 0 && (
        <a
          className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-white bg-black text-center text-xs font-medium text-white hover:bg-gray-600 dark:border-gray-800 dark:bg-white dark:text-black"
          href=""
        >
          +{numPeople}
        </a>
      )}
    </div>
  )
}
```

## Attribution

Source: Magic UI · Original: https://magicui.design/docs/components/avatar-circles

Adapted from the original. Credit the original author when you ship this.
