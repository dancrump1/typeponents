"use client";

import React, { useEffect, useRef, useState } from "react";

import Image from "next/image";

import { motion, useScroll, useTransform } from "motion/react";

//ui.aceternity.com/components/timeline

interface TimelineEntry {
	title: string;
	decade: string;
	copy: string;
	images: {
		url: string;
		alt: string;
	};
}

const decades = [
	"1800s",
	"1900s",
	"1910s",
	"1920s",
	"1930s",
	"1940s",
	"1950s",
	"1960s",
	"1970s",
	"1980s",
	"1990s",
	"2000s",
	"2010s",
	"2020s",
	"2030s",
];

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
	const ref = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [height, setHeight] = useState(0);

	const mungedDecadeData = [
		{
			year: decades[0],
			data: data.filter((entry) => entry.decade === decades[0]),
		},
		{
			year: decades[1],
			data: data.filter((entry) => entry.decade === decades[1]),
		},
		{
			year: decades[2],
			data: data.filter((entry) => entry.decade === decades[2]),
		},
		{
			year: decades[2],
			data: data.filter((entry) => entry.decade === decades[2]),
		},
		{
			year: decades[3],
			data: data.filter((entry) => entry.decade === decades[3]),
		},
		{
			year: decades[4],
			data: data.filter((entry) => entry.decade === decades[4]),
		},
		{
			year: decades[5],
			data: data.filter((entry) => entry.decade === decades[5]),
		},
		{
			year: decades[6],
			data: data.filter((entry) => entry.decade === decades[6]),
		},
		{
			year: decades[7],
			data: data.filter((entry) => entry.decade === decades[7]),
		},
		{
			year: decades[8],
			data: data.filter((entry) => entry.decade === decades[8]),
		},
		{
			year: decades[9],
			data: data.filter((entry) => entry.decade === decades[9]),
		},
		{
			year: decades[10],
			data: data.filter((entry) => entry.decade === decades[10]),
		},
		{
			year: decades[11],
			data: data.filter((entry) => entry.decade === decades[11]),
		},
		{
			year: decades[12],
			data: data.filter((entry) => entry.decade === decades[12]),
		},
		{
			year: decades[13],
			data: data.filter((entry) => entry.decade === decades[13]),
		},
		{
			year: decades[14],
			data: data.filter((entry) => entry.decade === decades[14]),
		},
	];

	useEffect(() => {
		if (ref.current) {
			const rect = ref.current.getBoundingClientRect();
			setHeight(rect.height);
		}
	}, [ref]);

	const { scrollYProgress } = useScroll({
		target: containerRef,
		offset: ["start 10%", "end 50%"],
	});

	const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
	const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

	return (
		<div className="w-full" ref={containerRef}>
			<div ref={ref} className="relative">
				{decades
					.filter(
						(decade) =>
							mungedDecadeData.find((data) => data.year === decade)
								?.data[0]?.title
					)
					.map((item, index) => (
						<div
							key={index + "timeline-item"}
							className="flex justify-start md:gap-16 md:mr-[5%]"
						>
							<div className="pt-28 min-w-16 max-w-xs md:w-full bg-backgroundSecondary">
								<div className="sticky flex flex-col md:flex-row z-40 items-center top-40 self-start">
									<div className="h-10 absolute left-3 md:left-6 w-10 rounded-full bg-background border-4 ring-2 ring-white flex items-center justify-center"></div>
									<h2 className="hidden md:block text-xl md:pl-20 md:text-5xl font-swiss-black text-foreground lowercase">
										{item}
									</h2>
								</div>
							</div>

							<div className="relative w-full pl-8 pt-16 mr-8">
								<h2 className="md:hidden block text-2xl mb-4 text-left font-swiss-black lowercase">
									{item}
								</h2>
								{mungedDecadeData.map((decadeData, index) => {
									if (decadeData.year !== item) return null;

									return (
										<div className="my-3">
											{decadeData.data.map((data) => (
												<div className="flex justify-between flex-col gap-3 md:gap-20 mb-16 md:flex-row lg:mx-auto">
													<div className="max-w-xl">
														<h3>{data.title}</h3>
													</div>
													<div className="flex flex-col gap-6">
														{data?.images?.map((image) => (
															<Image
																src={image.url}
																alt={image?.alt || image.title}
																width={350}
																height={290}
																className="max-h-[75vh] object-cover"
																style={
																	image.focalPoint
																		? {
																				objectPosition: `${
																					image
																						.focalPoint[0] *
																					100
																				}% ${
																					image
																						.focalPoint[1] *
																					100
																				}%`,
																			}
																		: {}
																}
															/>
														))}
													</div>
												</div>
											))}
										</div>
									);
								})}
							</div>
						</div>
					))}
				<div
					style={{
						height: height + "px",
					}}
					className="absolute left-8 md:left-11 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-0% via-background dark:via-background to-transparent to-99%  mask-[linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)] "
				>
					<motion.div
						style={{
							height: heightTransform,
							opacity: opacityTransform,
						}}
						className="absolute inset-x-0 top-0 w-[2px] bg-linear-to-t from-background via-background to-transparent from-0% via-10% rounded-full"
					/>
				</div>
			</div>
		</div>
	);
};
