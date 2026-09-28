# Sticker Peel

A round sticker with a message hidden underneath, drawn with a mirrored curl so the peeled part looks like it is folding over.

**Interaction.** Hovering rotates the sticker upright and peels the lower half back over itself, uncovering the message underneath; moving away rolls the sticker back down flat.

- Categories: Images, Cursor & Pointer Effects, Special Effects & FX
- Tags: hover
- Import: `@/components/ui/sticker-peel`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/sticker-peel.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `stickerImage` *(required)* | `string` | — | — |
| `message` *(required)* | `string` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import PeelableSticker from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<PeelableSticker message="test" stickerImage="/itjustworks.jpg" />
		</div>
	);
}
```

## Source

### `components/ui/sticker-peel.tsx`

```tsx
import React, { useState } from "react";

import { motion } from "motion/react";

interface PeelableStickerProps {
	stickerImage: string;
	message: string;
}

const PeelableSticker: React.FC<PeelableStickerProps> = ({
	stickerImage,
	message,
}) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<motion.div
			className="relative w-[180px] h-[180px] mx-auto cursor-pointer"
			onHoverStart={() => setIsHovered(true)}
			onHoverEnd={() => setIsHovered(false)}
		>
			<div className="absolute top-0 left-0 w-full h-full overflow-hidden">
				<div className="bg-background w-[140px] h-[140px] m-[20px] rounded-full shadow-lg flex items-center justify-center font-thin">
					{message}
				</div>
			</div>

			<motion.div
				className="absolute top-0 left-0 w-full h-full"
				initial={false}
				animate={{ rotate: isHovered ? 10 : 45 }}
				transition={{ duration: 0.75, ease: "easeInOut" }}
			>
				<motion.div
					className="absolute bottom-0 w-full overflow-hidden"
					initial={false}
					animate={{ height: isHovered ? 70 : 150 }}
					transition={{ duration: 0.75, ease: "easeInOut" }}
				>
					<motion.div
						className="w-[140px] h-[140px] mx-[20px] rounded-full bg-cover bg-center"
						initial={false}
						animate={{ marginTop: isHovered ? -90 : -10 }}
						transition={{ duration: 0.75, ease: "easeInOut" }}
						style={{
							backgroundImage: `url(${stickerImage})`,
							boxShadow:
								"inset 0 8px 20px -5px rgba(0, 0, 0, 0.5), 0 8px 15px -3px rgba(0, 0, 0, 0.3), 0 0 0 10px rgba(0, 0, 0, 0.1)",
						}}
					/>
				</motion.div>
			</motion.div>

			<motion.div
				className="absolute top-0 left-0 w-full h-full"
				initial={false}
				animate={{ rotate: isHovered ? 10 : 45 }}
				transition={{ duration: 0.75, ease: "easeInOut" }}
			>
				<motion.div
					className="absolute top-[30px] w-full overflow-hidden"
					initial={false}
					animate={{
						height: isHovered ? 90 : 10,
						top: isHovered ? 110 : 30,
					}}
					transition={{ duration: 0.75, ease: "easeInOut" }}
				>
					<motion.div
						className="w-[140px] h-[140px] mx-[20px] rounded-full bg-cover bg-center relative overflow-hidden"
						initial={false}
						animate={{ marginTop: isHovered ? -60 : -130 }}
						transition={{ duration: 0.75, ease: "easeInOut" }}
						style={{
							backgroundImage: `url(${stickerImage})`,
							transform: "scaleY(-1)",
							filter: "brightness(1.1) contrast(0.7)",
							boxShadow:
								"inset 0 -8px 10px -5px rgba(0, 0, 0, 0.2), 0 -8px 15px -3px rgba(0, 0, 0, 0.3), 0 0 0 10px rgba(0, 0, 0, 0.1)",
						}}
					/>
				</motion.div>
			</motion.div>
		</motion.div>
	);
};

export default PeelableSticker;
```
