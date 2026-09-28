"use client";

import React from "react";

import Gravity, { MatterBody } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="w-full h-full flex flex-col relative font-azeretMono bg-background">
				<div className="pt-20 text-6xl sm:text-7xl md:text-8xl text-foreground dark:text-muted w-full text-center font-calendas italic">
					fancy
				</div>
				<p className="pt-4 text-base sm:text-xl md:text-2xl text-foreground dark:text-muted w-full text-center">
					components made with:
				</p>
				<Gravity gravity={{ x: 0, y: 1 }} className="w-full h-full">
					<MatterBody
						matterBodyOptions={{
							friction: 0.5,
							restitution: 0.2,
						}}
						x="30%"
						y="10%"
					>
						<div className="text-xl sm:text-2xl md:text-3xl bg-blue-500 text-secondary rounded-full hover:cursor-pointer px-8 py-4">
							react
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
						<div className="text-xl sm:text-2xl md:text-3xl bg-pink-500 text-secondary rounded-full hover:cursor-grab px-8 py-4 ">
							typescript
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
						<div className="text-xl sm:text-2xl md:text-3xl bg-teal-400 text-secondary rounded-full hover:cursor-grab px-8 py-4 ">
							motion
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
						<div className="text-xl sm:text-2xl md:text-3xl bg-red-400 text-secondary rounded-full hover:cursor-grab px-8 py-4 ">
							tailwind
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
						<div className="text-xl sm:text-2xl md:text-3xl bg-orange-400 text-secondary rounded-full hover:cursor-grab px-8 py-4 ">
							drei
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
						<div className="text-xl sm:text-2xl md:text-3xl bg-yellow-400 text-secondary rounded-full hover:cursor-grab px-8 py-4 ">
							matter-js
						</div>
					</MatterBody>
				</Gravity>
			</div>{" "}
		</div>
	);
}
