# Ghost Label

Oversized faint word sitting behind content as a watermark-style background label.

**Interaction.** Static layout — the giant word is painted once behind the content at low opacity and does not respond to input.

- Categories: Text
- Import: `@/components/ui/ghost-label`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/ghost-label.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `text` *(required)* | `string` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import GhostLabel from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="w-full max-w-2xl mx-auto py-12 px-4">
				<div className="relative ml-[30px] mt-20">
					<GhostLabel text="1920" />
					<p className="w-full max-w-[600px] text-sm font-serif text-justify">
						The film 1920: Evil Returns follows poet Jaidev, who helps a
						woman with amnesia, only for her to become possessed by a
						malevolent spirit. As he struggles to save her, dark secrets
						unfold, intertwining love and horror in a chilling narrative.
						This supernatural horror film, released in 2012, is a
						quasi-sequel to 1920 and features themes of possession and
						redemption
					</p>
				</div>
			</div>{" "}
		</div>
	);
}
```

## Source

### `components/ui/ghost-label.tsx`

```tsx
import React from "react";

type GhostLabelProps = {
	text: string;
};

const GhostLabel: React.FC<GhostLabelProps> = ({ text }: GhostLabelProps) => {
	return (
		<p className="absolute -inset-y-[130px] -inset-x-[30px]  md:-inset-x-[50px] flex text-[150px] font-bold z-0 opacity-10 font-anton">
			{text}
		</p>
	);
};

export default GhostLabel;
```
