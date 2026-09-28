"use client";

import React, { Fragment, useEffect, useRef, useState } from "react";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
// @ts-expect-error no modules for typescript
import splitting from "splitting";

const dishes = ["Fish and Chips", "Sunday Roast", "Shepherd's Pie"];
const navigationLinks = ["Contact", "Recruitment", "Privacy"];

const FlippedMenu = () => {
	const scope = useRef<HTMLDivElement>(null);
	const [isOpen, setIsOpen] = useState(false);
	const timelineRef = useRef<gsap.core.Timeline | null>(null);
	const btnWord1 = useRef<HTMLSpanElement>(null);
	const btnWord2 = useRef<HTMLSpanElement>(null);
	const menu = useRef<HTMLDivElement>(null);

	useGSAP(
		async () => {
			if (!splitting && !scope.current) return;
			await splitting({ target: scope.current });

			const chars1 = btnWord1.current?.querySelectorAll(".char");
			const chars2 = btnWord2.current?.querySelectorAll(".char");

			gsap.set([btnWord2.current, menu.current], { opacity: 1 });

			if (!chars1?.length || !chars2?.length) return;

			timelineRef.current = gsap.timeline({
				paused: true,
				defaults: { duration: 0.4, ease: "power1.out", stagger: 0.05 },
			});

			timelineRef.current
				.to(chars1, { transformOrigin: "top", rotateX: 90 })
				.fromTo(
					chars2,
					{ rotateX: 90, transformOrigin: "bottom" },
					{ rotateX: 0 },
					0
				)
				.fromTo(
					menu.current,
					{
						rotateX: 20,
						rotateY: -30,
						xPercent: -120,
						yPercent: -80,
					},
					{
						xPercent: 0,
						yPercent: 0,
						rotateX: 0,
						rotateY: 0,
						ease: "expo.out",
						duration: 0.6,
					},
					0
				);
		},
		{ scope, dependencies: [splitting] }
	);

	const handleToggle = () => {
		if (!timelineRef.current) return;

		if (isOpen) {
			timelineRef.current.reverse();
		} else {
			timelineRef.current.play();
		}

		setIsOpen(!isOpen);
	};

	return (
		<article
			ref={scope}
			className="relative min-h-96 h-full overflow-hidden bg-background font-herbik text-foreground/90 sm:aspect-3/2 sm:min-h-0"
		>
			<div className="absolute left-10 top-10 z-10">
				<button
					aria-expanded={isOpen}
					aria-controls="menu"
					onClick={handleToggle}
					className="group relative -rotate-10 rounded-[50%] border border-white bg-background px-7 py-3 text-sm font-bold uppercase shadow-xs shadow-white/30 transition-transform duration-300 ease-out hover:-rotate-14 hover:scale-110 sm:text-base [&_.char]:inline-grid"
				>
					<span
						ref={btnWord1}
						data-splitting
						className="absolute left-1/2 top-1/2 inline-grid -translate-x-1/2 -translate-y-1/2 overflow-hidden whitespace-nowrap px-1"
					>
						Open
					</span>
					<span
						ref={btnWord2}
						data-splitting
						className="inline-grid overflow-hidden whitespace-nowrap px-1 opacity-0"
					>
						Close
					</span>
					<span className="absolute left-4 top-1/2 size-1 -translate-y-1/2 rounded-full bg-current transition-[left] duration-300 ease-out group-hover:left-5"></span>
					<span className="absolute right-4 top-1/2 size-1 -translate-y-1/2 rounded-full bg-current transition-[right] duration-300 ease-out group-hover:right-5"></span>
				</button>
			</div>

			<div className="absolute left-1/2 top-1/2 size-[95%] -translate-x-1/2 -translate-y-1/2 perspective-normal sm:h-[70%] sm:w-4/5">
				<div
					ref={menu}
					id="menu"
					className="h-full w-full bg-background p-4 opacity-0 shadow-xs shadow-black/80"
				>
					<div className="h-full w-full border-2 border-white p-1">
						<div className="flex h-full w-full flex-col justify-between border border-white p-5 pt-16 sm:p-10 sm:pb-5">
							<div className="flex flex-col">
								{dishes.map((dish) => {
									return (
										<button
											key={dish}
											className="group flex items-center justify-between border-b border-white pl-2 text-lg text-foreground transition duration-300 first-of-type:border-t hover:bg-background hover:text-foreground"
										>
											<span>{dish}</span>
											<span className="inline-block border-l border-white p-3">
												<svg
													xmlns="http://www.w3.org/2000/svg"
													fill="none"
													viewBox="0 0 24 24"
													strokeWidth={1.5}
													stroke="currentColor"
													className="size-4"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
													/>
												</svg>
											</span>
										</button>
									);
								})}
							</div>
							<nav className="flex items-center justify-end gap-x-2">
								{navigationLinks.map((link) => {
									return (
										<Fragment key={link}>
											<button className="font-poppins text-sm transition duration-300 hover:text-foreground/70">
												{link}
											</button>
											<span className="inline-block size-1 rounded-full bg-background last-of-type:hidden"></span>
										</Fragment>
									);
								})}
							</nav>
						</div>
					</div>
				</div>
			</div>
		</article>
	);
};

export default FlippedMenu;
