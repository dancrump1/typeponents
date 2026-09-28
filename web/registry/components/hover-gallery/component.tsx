"use client";

import { useCallback, useRef, useState } from "react";

// Credit:
// https://starui.link/docs/components/hover-gallery

// Add to CSS
// @theme {
//   --ease-spring: linear(
//     0,
//     0.009,
//     0.035 2.1%,
//     0.141,
//     0.281 6.7%,
//     0.723 12.9%,
//     0.938 16.7%,
//     1.017,
//     1.077,
//     1.121,
//     1.149 24.3%,
//     1.159,
//     1.163,
//     1.161,
//     1.154 29.9%,
//     1.129 32.8%,
//     1.051 39.6%,
//     1.017 43.1%,
//     0.991,
//     0.977 51%,
//     0.974 53.8%,
//     0.975 57.1%,
//     0.997 69.8%,
//     1.003 76.9%,
//     1.004 83.8%,
//     1
//   );
//   --ease-bounce: linear(
//     0,
//     0.004,
//     0.016,
//     0.035,
//     0.063,
//     0.098,
//     0.141 13.6%,
//     0.25,
//     0.391,
//     0.563,
//     0.765,
//     1,
//     0.891 40.9%,
//     0.848,
//     0.813,
//     0.785,
//     0.766,
//     0.754,
//     0.75,
//     0.754,
//     0.766,
//     0.785,
//     0.813,
//     0.848,
//     0.891 68.2%,
//     1 72.7%,
//     0.973,
//     0.953,
//     0.941,
//     0.938,
//     0.941,
//     0.953,
//     0.973,
//     1,
//     0.988,
//     0.984,
//     0.988,
//     1
//   );
// }

export interface HoverCardProps {
	cards: { name: string; left: string; top: string; right: string }[];
}

function HoverCard({ cards }: HoverCardProps) {
	const ulRef = useRef<HTMLUListElement | null>(null);
	const [index, setIndex] = useState(0);
	const [coordinates, setCoordinates] = useState<{
		top: { x: number; y: number; angle: number };
		left: { x: number; y: number; angle: number };
		right: { x: number; y: number; angle: number };
	}>();

	const handlePointerEnter = useCallback(
		(e: React.PointerEvent<HTMLParagraphElement>, index: number) => {
			if (!ulRef.current) return;
			const ulRect = ulRef.current.getBoundingClientRect();
			const rect = e.currentTarget.getBoundingClientRect();

			const y = rect.top - ulRect.top;
			const coordinates = {
				top: {
					y,
					x: Math.floor(Math.random() * 61) - 30,
					angle: getRandomAngle(),
				},
				left: {
					x: rect.left - ulRect.left,
					y,
					angle: getRandomAngle(),
				},
				right: {
					x: rect.right - ulRect.right,
					y,
					angle: getRandomAngle(),
				},
			};

			setIndex(index);
			setCoordinates(coordinates);
		},
		[cards]
	);

	return (
		<div className="h-full flex items-center justify-center text-5xl">
			<ul
				ref={ulRef}
				className="flex flex-col pointer-events-none items-center font-bold relative group"
			>
				{cards.map((card, index) => (
					<li key={card.name}>
						<p
							className="cursor-pointer pointer-events-auto w-fit uppercase opacity-25 hover:opacity-100 [transition:opacity_0.15s_var(--ease-in-out),scale_0.5s_var(--ease-bounce)] hover:scale-y-110"
							onPointerEnter={(e) => handlePointerEnter(e, index)}
						>
							{card.name}
						</p>
					</li>
				))}

				<img
					src={cards[index].top}
					className="absolute w-40 pointer-events-none scale-0 group-hover:scale-100 group-hover:[transition:scale_0.5s_var(--ease-spring),translate_0.5s_var(--ease-spring),rotate_1s_var(--ease-spring)] [transition:scale_0.2s_var(--ease-in-out)] rounded-md overflow-hidden shadow-xl shadow-black/25"
					style={{
						translate: `calc(${
							coordinates?.top?.x ?? 0
						}px) calc(-100% + ${(coordinates?.top?.y ?? 0) - 40}px)`,
						rotate: `${coordinates?.top?.angle}deg`,
					}}
					alt=""
				/>

				<img
					src={cards[index].left}
					className="absolute left-0 w-40 pointer-events-none scale-0 group-hover:scale-100 group-hover:[transition:scale_0.5s_var(--ease-spring),translate_0.5s_var(--ease-spring),rotate_1s_var(--ease-spring)] [transition:scale_0.2s_var(--ease-in-out)] rounded-md overflow-hidden shadow-xl shadow-black/25"
					style={{
						translate: `calc(-100% + ${
							coordinates?.left?.x ?? 0
						}px - 100px) calc(-50% + ${coordinates?.top?.y ?? 0}px)`,
						rotate: `${coordinates?.left?.angle}deg`,
					}}
					alt=""
				/>

				<img
					src={cards[index].right}
					className="absolute right-0 w-40 pointer-events-none scale-0 group-hover:scale-100 group-hover:[transition:scale_0.5s_var(--ease-spring),translate_0.5s_var(--ease-spring),rotate_1s_var(--ease-spring)] [transition:scale_0.2s_var(--ease-in-out)] rounded-md overflow-hidden shadow-xl shadow-black/25"
					style={{
						translate: `calc(100% + ${
							coordinates?.right?.x ?? 0
						}px + 100px) calc(-50% + ${coordinates?.top?.y ?? 0}px)`,
						rotate: `${coordinates?.right?.angle}deg`,
					}}
					alt=""
				/>
			</ul>
		</div>
	);
}

function getRandomAngle() {
	return Math.floor(Math.random() * 21) - 20;
}

export { HoverCard };
