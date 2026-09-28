# Movie Gallery

- Categories: Grids & Layouts
- Tags: spring, hover
- Import: `@/components/ui/movie-gallery`
- Inspiration: pro.bossadizenith.me (adaptation) — https://pro.bossadizenith.me/

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/movie-gallery.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `lucide-react`
- `motion`

## Usage

```tsx
"use client";

import MovieGallery from "./component";

export default function Usage() {
	return (
		<div className="relative flex w-full items-center justify-center p-8">
			<MovieGallery />
		</div>
	);
}
```

## Source

### `components/ui/movie-gallery.tsx`

```tsx
import React, { SetStateAction, useState } from "react";

import { Bookmark, ChevronRight } from "lucide-react";
import {
	AnimatePresence,
	motion,
	MotionConfig,
	useAnimate,
} from "motion/react";

// Credit:
// https://pro.bossadizenith.me/

const transition = {
	type: "spring",
	bounce: 0.1,
	duration: 0.5,
};

type Movie = {
	item: number;
	name: string;
	preview: string;
};

const movies: Movie[] = [
	{ item: 1, name: "Succession", preview: "/itjustworks.jpg" },
	{ item: 2, name: "Black Mirror", preview: "/itjustworks.jpg" },
	{ item: 3, name: "Dune", preview: "/itjustworks.jpg" },
];

const MovieGallery = () => {
	const [hover, setHover] = useState<Movie | null>(null);

	return (
		<MotionConfig transition={transition}>
			<div className="size-full  flex items-center justify-center">
				<div className="flex gap-5">
					{movies.map((movie, index) => (
						<Movie
							key={index + "movie-gallery"}
							setHover={setHover}
							hover={hover}
							movie={movie}
						/>
					))}
				</div>
			</div>
		</MotionConfig>
	);
};

interface MovieProps {
	hover: Movie | null;
	movie: Movie;
	setHover: React.Dispatch<SetStateAction<Movie | null>>;
}

const Movie = ({ setHover, hover, movie }: MovieProps) => {
	const [scope, animate] = useAnimate();
	const [isBookmarked, setIsBookmarked] = useState(false);

	const handleClick = () => {
		animate(scope.current, { rotate: [0, 20, -20, 0] }, { duration: 0.5 });
		setIsBookmarked((prev) => !prev);
	};

	return (
		<motion.div
			className="border bg-background flex items-center justify-center rounded-3xl overflow-clip relative group"
			animate={{
				width: hover && hover.item === movie.item ? 300 : 160,
				height: 200,
				backgroundImage: `url(${movie.preview})`,
				backgroundSize: "cover",
				backgroundPosition: "center",
			}}
			onMouseEnter={() => setHover(movie)}
			onMouseLeave={() => setHover(null)}
		>
			<div className="absolute flex items-end justify-center top-0 left-0 size-full bg-primary/20 transition-opacity duration-300 opacity-0 group-hover:opacity-100 text-foreground">
				<AnimatePresence>
					{hover && hover.item === movie.item && (
						<motion.div
							className="w-full h-3/4 p-5 space-y-2"
							initial={{ x: 100, opacity: 0 }}
							animate={{ x: 0, opacity: 1 }}
							exit={{ x: 100, opacity: 0 }}
						>
							<motion.h1
								layoutId={`movie-${movie.item}-title`}
								className="font-semibold text-xl"
							>
								{movie.name}
							</motion.h1>
							<motion.p
								className="min-w-80"
								layoutId={`movie-${movie.item}-description`}
							>
								nothing . {movie.item} . graound
							</motion.p>
							<motion.button className="bg-primary/80 dark:bg-background text-sm flex gap-2 text-foreground items-center rounded-full px-3 py-1.5">
								Watch{" "}
								<span>
									<ChevronRight className="size-4" />
								</span>
							</motion.button>{" "}
						</motion.div>
					)}
				</AnimatePresence>
				<button
					ref={scope}
					onClick={handleClick}
					className="absolute top-3 right-3 size-10 flex items-center justify-center outline-hidden"
				>
					<Bookmark
						className={`${
							isBookmarked ? "fill-white" : "fill-transparent"
						}`}
					/>
				</button>
			</div>
		</motion.div>
	);
};

export default MovieGallery;
```

## Attribution

Source: pro.bossadizenith.me · Original: https://pro.bossadizenith.me/

Adapted from the original. Credit the original author when you ship this.
