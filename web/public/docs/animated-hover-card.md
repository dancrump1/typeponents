# Animated Hover Card

Tall gradient card with a title and a subtitle that stays hidden until you hover.

**Interaction.** Hovering the card reveals the subtitle one character at a time, each letter dropping into place a beat after the one before it.

- Categories: Cards
- Tags: hover
- Import: `@/components/ui/animated-hover-card`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/animated-hover-card.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Usage

```tsx
"use client";

import React from "react";

import AnimatedCard from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<AnimatedCard
				title="Hover to see the wizardry"
				subtitle="You hovered"
			/>
		</div>
	);
}
```

## Source

### `components/ui/animated-hover-card.tsx`

```tsx
// .card {
//     aspect-ratio: 1 / 1.6;
//     border: 0.2vmin solid rgb(109, 0, 252);
//     cursor: pointer;
//     position: relative;
//     width: 45vmin;
//     overflow: hidden;
//   }

//   .card:hover:before {
//     background-position: 100% 100%;
//     transform: scale(1.08, 1.03);
//   }

//   .card:hover > .content {
//     background-position: -10% 0%;
//   }

//   .card:hover > .card-icon {
//     color: white;
//   }

//   .card:hover > .content > .cardsubtitle > .cardsubtitle-word {
//     opacity: 1;
//     transform: translateY(0%);
//     transition: opacity 0ms, transform 200ms cubic-bezier(.90, .06, .15, .90);
//   }

//   .card:before {
//     background: linear-gradient(
//       130deg,
//       transparent 0% 33%,
//       var(--g1) 66%,
//       var(--g2) 83.5%,
//       var(--g3) 100%
//     );
//     background-position: 0% 0%;
//     background-size: 300% 300%;
//     content: "";
//     height: 100%;
//     left: 0px;
//     pointer-events: none;
//     position: absolute;
//     top: 0px;
//     transition: background-position 350ms ease, transform 350ms ease;
//     width: 100%;
//     z-index: 1;
//   }

//   .content {
//     background-image: radial-gradient(
//       rgba(255, 255, 255, 0.2) 8%,
//       transparent 8%
//     );
//     background-position: 0% 0%;
//     background-size: 5vmin 5vmin;
//     height: 100%;
//     padding: 5vmin;
//     position: relative;
//     transition: background-position 350ms ease;
//     z-index: 2;
//   }

//   .content:hover {
//     opacity: 75%;
//   }

//   .cardtitle,
//   .cardsubtitle {
//     color: white;
//     font-family: "Anek Latin", sans-serif;
//     font-weight: 400;
//     margin: 0px;
//   }

//   .cardtitle {
//     font-size: 4vmin;
//     font-weight: bold;
//     transition: opacity 350ms ease;
//   }

//   .cardsubtitle {
//     font-size: 3vmin;
//     margin-top: 2vmin;
//   }

//   .cardsubtitle-word {
//     display: inline-block;
//     margin: 0vmin 0.3vmin;
//     opacity: 0;
//     position: relative;
//     transform: translateY(40%);
//     transition: none;
//   }

//   .card-icon {
//     bottom: 0px;
//     color: rgba(255, 255, 255, 0.5);
//     font-size: 7vmin;
//     left: 0px;
//     margin: 5vmin;
//     position: absolute;
//     transition: color 250ms ease;
//     z-index: 2;
//   }

import React from "react";

import { motion } from "motion/react";

// Credit:
// https://ui.noxhd.com/components/animated-card/

const AnimatedCard = ({ title, subtitle }) => {
	const textVariants = {
		initial: {
			opacity: 0,
			y: -20,
		},
		animate: {
			opacity: 1,
			y: 0,
		},
	};

	return (
		<div className="flex justify-center content-center m-10">
			<motion.div
				initial="initial"
				whileHover="animate"
				transition={{ staggerChildren: 0.05 }}
				className={"card"}
			>
				<div className={"content"}>
					<h3 className={"cardtitle"}>{title}</h3>
					<div className={"cardsubtitle"}>
						{subtitle.split("").map((char, i) => {
							return (
								<motion.span
									style={{
										marginRight: char === " " ? "0.4rem" : "0.1",
									}}
									key={"hover-card" + i}
									className="inline-block relative"
									variants={textVariants}
								>
									{char}
								</motion.span>
							);
						})}
					</div>
				</div>
			</motion.div>
		</div>
	);
};

export default AnimatedCard;
```
