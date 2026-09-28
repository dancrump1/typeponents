"use client";

import React from "react";

import Letter3DSwap from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="flex flex-col items-center max-w-2xl ">
				<Letter3DSwap
					text="SET YOUR MIND TO IT"
					mainClassName="text-7xl bg-background lowercase"
					frontFaceClassName={`bg-background  text-secondary`}
					secondFaceClassName={`bg-background  text-secondary`}
					rotateDirection="top"
					paddingX={0}
					paddingY={0}
					staggerDuration={0.03}
					staggerFrom="first"
					transition={{
						type: "spring",
						damping: 25,
						stiffness: 160,
					}}
				/>
			</div>
		</div>
	);
}
