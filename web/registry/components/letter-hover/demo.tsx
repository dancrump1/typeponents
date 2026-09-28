"use client";

import React from "react";

import LetterSwapForward from "./component";
import { RandomLetterSwapPingPong } from "@/registry/components/random-letter-swap-hover/component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="w-dvw h-dvh rounded-lg bg-background text-xl md:text-3xl  flex flex-col items-center justify-center font-calendas">
				<div className=" p-12 text-secondary rounded-xl align-text-top  gap-y-1 md:gap-y-2 flex flex-col">
					<LetterSwapForward
						label="Hover me chief!"
						reverse={true}
						className="italic"
					/>
					<LetterSwapForward
						label="{awesome}"
						reverse={false}
						className="font-bold"
					/>
					<LetterSwapForward
						label="Good day!"
						staggerFrom={"center"}
						className="mono"
					/>
					<RandomLetterSwapPingPong
						label="More text?"
						staggerFrom={"center"}
						reverse={false}
						className="font-overused-grotesk font-bold"
					/>
					<RandomLetterSwapPingPong
						label="oh, seriously?!"
						staggerFrom={"last"}
					/>
				</div>
			</div>{" "}
		</div>
	);
}
