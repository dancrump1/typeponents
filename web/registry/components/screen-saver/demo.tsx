"use client";

import React, { useRef } from "react";

import Image from "next/image";

import Screensaver from "./component";

export default function Usage() {
	const screensaverRef = useRef<HTMLDivElement>(null);

	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div
				className="w-dvw h-dvh bg-background overflow-hidden flex items-center justify-center relative text-foreground dark:text-muted"
				ref={screensaverRef}
			>
				<h1 className="z-30 text-3xl md:text-6xl font-overused-grotesk">
					page not found
				</h1>
				{[
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
					"/itjustworks.jpg",
				].map((image, index) => (
					<Screensaver
						key={index + "screensaver-example"}
						speed={1}
						startPosition={{
							x: index * 3,
							y: index * 3,
						}}
						startAngle={40}
					>
						<div className="w-20 h-20 md:w-48 md:h-48 overflow-hidden">
							<Image
								{...image}
								width={100}
								height={100}
								src={image}
								alt={`Usage ${index + 1}`}
								className="w-full h-full object-cover"
							/>
						</div>
					</Screensaver>
				))}
			</div>{" "}
		</div>
	);
}
