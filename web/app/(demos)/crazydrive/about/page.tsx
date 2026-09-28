"use client";

import React, { useEffect, useRef, useState } from "react";

import Ballpit from "@/registry/components/ballpit/component";
import CircularText from "@/registry/components/circle-text/component";
import Gravity, { MatterBody } from "@/registry/components/gravity/component";
import SpringModal from "@/registry/components/spring-modal/component";
import { cn } from "@/lib/utils";

const colors = ["bg-blue-500", "bg-green-500", "bg-pink-500", "bg-yellow-500"];

const useAnimateCarousel = (activeItem: number) => {
	const wrapperRef = useRef<HTMLUListElement | null>(null);
	const timeoutRef = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		if (!wrapperRef.current) {
			return;
		}
		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}

		wrapperRef.current.style.setProperty(
			"--transition",
			"600ms cubic-bezier(0.22, 0.61, 0.36, 1)"
		);

		timeoutRef.current = setTimeout(() => {
			wrapperRef.current?.style.removeProperty("--transition");
		}, 900);

		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, [activeItem]);

	return wrapperRef;
};

const images = [
	{
		firstName: "dan",
		lastName: "crump",
		jobTitle: "webdeveloper",
		img: "itjustworks.jpg",
		email: "dan@dan.dan",
		hoverImg: "itjustworks.jpg",
		description: "he does things and stuff",
	},
	{
		firstName: "cahtah",
		lastName: "davidson",
		jobTitle: "webdeveloper",
		img: "itjustworks.jpg",
		email: "dan@dan.dan",
		hoverImg: "itjustworks.jpg",
		description: "he does things and stuff",
	},
	{
		firstName: "nancy",
		lastName: "clark",
		jobTitle: "webdeveloper",
		img: "itjustworks.jpg",
		hoverImg: "itjustworks.jpg",
		email: "dan@dan.dan",
		description: "he does things and stuff",
	},
	{
		firstName: "laura",
		lastName: "bennett",
		jobTitle: "webdeveloper",
		img: "itjustworks.jpg",
		hoverImg: "itjustworks.jpg",
		email: "dan@dan.dan",
		description: "he does things and stuff",
	},
];
function About() {
	const [activeItem, setActiveItem] = useState(5);
	const wrapperRef = useAnimateCarousel(activeItem);
	const [isOpen, setIsOpen] = useState(false);

	return (
		<main className="">
			<section className="h-[90vh] w-full relative overflow-hidden">
				<Gravity gravity={{ x: 0, y: 1 }}>
					{[
						"Audience",
						"Ad Ninjas",
						"Pixel Punch",
						"Buzz Hoppers",
						"Quirk Works",
						"Brand Bandits",
						"Vibe Tribe",
						"Click Circus",
						"Idea Sparks",
						"Snappy Snails",
						"Funky Funnels",
						"Meme Machine",
						"Slogan Squad",
						"Trend Pirates",
						"Zap Labs",
						"Hype Hive",
						"Quirkit",
						"Buzzlet",
						"Snaptik",
						"Brandle",
						"Zestify",
						"Huzzle",
						"Sparklio",
						"Vibbly",
						"Funnelo",
						"Adwizzle",
						"Trendish",
						"Blinksy",
						"Slogify",
						"Zapster",
						"Pufflet",
					].map((item) => {
						const x = `${Math.random() * 80}%`;
						const y = `${Math.random() * 80}%`;
						const colorClass =
							colors[Math.floor(Math.random() * colors.length)];

						return (
							<MatterBody
								matterBodyOptions={{
									friction: 0.5,
									restitution: 0.2,
								}}
								x={x}
								y={y}
								key={item}
							>
								<div
									className={`text-xl sm:text-2xl md:text-3xl ${colorClass} text-white rounded-full hover:cursor-pointer px-8 py-4`}
								>
									{" "}
									{item}
								</div>
							</MatterBody>
						);
					})}
					<MatterBody
						matterBodyOptions={{
							friction: 0.5,
							restitution: 0.2,
						}}
						x="30%"
						y="10%"
					>
						<div className="text-xl sm:text-2xl md:text-3xl bg-blue-500 text-white rounded-full hover:cursor-pointer px-8 py-4">
							Audience
						</div>
					</MatterBody>
					<MatterBody
						matterBodyOptions={{
							friction: 0.5,
							restitution: 0.2,
						}}
						x="30%"
						y="10%"
					>
						<div className="text-xl sm:text-2xl md:text-3xl bg-blue-500 text-white rounded-full hover:cursor-pointer px-8 py-4">
							20+ years of experience
						</div>
					</MatterBody>
					<MatterBody
						matterBodyOptions={{
							friction: 0.5,
							restitution: 0.2,
						}}
						x="30%"
						y="30%"
					>
						<div className="text-xl sm:text-2xl md:text-3xl bg-pink-500 text-white rounded-full hover:cursor-grab px-8 py-4 ">
							Under-Promise <br />
							Over-Deliver
						</div>
					</MatterBody>
					<MatterBody
						matterBodyOptions={{
							friction: 0.5,
							restitution: 0.2,
						}}
						x="40%"
						y="20%"
						angle={10}
					>
						<div className="text-xl sm:text-2xl md:text-3xl bg-teal-400 text-white rounded-full hover:cursor-grab px-8 py-4 ">
							Outcome
						</div>
					</MatterBody>
					<MatterBody
						matterBodyOptions={{
							friction: 0.5,
							restitution: 0.2,
						}}
						x="75%"
						y="10%"
					>
						<div className="text-xl sm:text-2xl md:text-3xl bg-red-400 text-white rounded-full hover:cursor-grab px-8 py-4 ">
							Research
						</div>
					</MatterBody>
					<MatterBody
						matterBodyOptions={{
							friction: 0.5,
							restitution: 0.2,
						}}
						x="80%"
						y="20%"
					>
						<div className="text-xl sm:text-2xl md:text-3xl bg-orange-400 text-white rounded-full hover:cursor-grab px-8 py-4 ">
							Activate
						</div>
					</MatterBody>
					<MatterBody
						matterBodyOptions={{
							friction: 0.5,
							restitution: 0.2,
						}}
						x="50%"
						y="10%"
					>
						<div className="text-xl sm:text-2xl md:text-3xl bg-yellow-400 text-white rounded-full hover:cursor-grab px-8 py-4 ">
							Your Brand
						</div>
					</MatterBody>
				</Gravity>
				<h1 className="absolute inset-0 z-0 content-center text-center pointer-events-none">
					DRIVE BRAND STUDIO
				</h1>
			</section>

			<section className="flex overflow-hidden my-32">
				<CircularText text={"Quality"} onHover="goBonkers" />
				<CircularText text={"Comfort"} />
				<CircularText text={"Price"} onHover="slowDown" />
			</section>

			<section className="h-screen">
				<div className="flex overflow-x-auto h-full w-full items-center justify-center">
					<div className="w-[1200px] max-w-full">
						<ul
							ref={wrapperRef}
							className="group flex flex-col gap-3 md:h-[640px] md:flex-row md:gap-[1.5%] justify-center"
						>
							{/* Placeholder {} at front and end to take place of stripes off the edge */}
							{[{}, ...images, {}].map((person, index) => {
								return (
									<li
										onClick={() => setActiveItem(index)}
										onKeyUp={(e) => {
											if (e.key === "Enter" || e.key === " ") {
												setActiveItem(index);
											}
										}}
										onKeyDown={(e) => {
											if (e.key === "Enter" || e.key === " ") {
												setActiveItem(index);
											}
										}}
										onKeyPress={(e) => {
											if (e.key === "Enter" || e.key === " ") {
												setActiveItem(index);
											}
										}}
										aria-current={activeItem === index}
										className={cn(
											"relative cursor-pointer md:w-[8%] md:first:w-[1%] md:last:w-[1%] md:aria-current:w-[48%]",
											"md:[transition:width_var(--transition,200ms_ease-in)]",
											"md:before-block before:absolute before:bottom-0 before:left-[-10px] before:right-[-10px] before:top-0 before:hidden before:bg-white",
											"md:group-hover:[&:not(:hover),&:not(:first),&:not(:last)]:w-[7%] md:hover:w-[12%]",
											"first:pointer-events-none last:pointer-events-none md:first:[&_img]:opacity-0 md:last:[&_img]:opacity-0"
										)}
										key={person.name}
									>
										<div className="relative h-full w-full overflow-hidden rounded-2xl bg-[#c9c6c7]">
											<img
												className="absolute right-0 top-1/2 h-auto w-24 max-w-none -translate-y-1/2 object-cover grayscale md:left-1/2 md:h-[640px] md:w-[590px] md:-translate-x-1/2"
												src={
													activeItem === index
														? person.img
														: person.hoverImg
												}
												alt={person.name}
												width="590px"
												height="640px"
											/>
											<div
												className={cn(
													"before:bg-texture after:bg-texture inset-0 opacity-25 duration-300 before:absolute before:bottom-0 before:left-[-546px] before:right-0 before:top-[-148px]  before:z-10 after:bottom-[28px] after:left-0 after:right-[-434px] after:top-0 after:z-10 md:absolute md:transition-opacity",
													activeItem === index
														? "md:opacity-25"
														: "md:opacity-0"
												)}
											/>
											<div
												className={cn(
													"left-8 top-8 w-[590px] p-4 transition-[transform,opacity] md:absolute md:p-0",
													activeItem === index
														? "md:translate-x-0 md:opacity-100"
														: "md:translate-x-4 md:opacity-0"
												)}
											>
												<p className="text-sm uppercase text-primary md:text-lg">
													{person.title}
												</p>
												<p className="text-lg font-bold md:text-4xl">
													{person.name}
												</p>
											</div>
											{activeItem === index && (
												<div className="absolute bottom-0 right-0 left-0 block">
													<button
														onClick={() => setIsOpen(true)}
														className="bg-linear-to-r from-violet-600 w-fit to-indigo-600 text-white font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
													>
														Learn more about {person.name}
													</button>
													<SpringModal
														isOpen={isOpen}
														setIsOpen={setIsOpen}
														data={{ ...person }}
													/>
												</div>
											)}
										</div>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</section>
			<section className="h-[300px]">
				<Ballpit />
			</section>
		</main>
	);
}

export default About;
