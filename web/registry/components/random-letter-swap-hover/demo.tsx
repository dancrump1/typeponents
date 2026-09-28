"use client";

import React from "react";

import {
	RandomLetterSwapForward,
	RandomLetterSwapPingPong,
} from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="w-dvw h-dvh rounded-lg bg-background text-3xl md:text-5xl flex flex-col items-center justify-center font-overused-grotesk">
				<div className="h-full text-red-500 rounded-xl py-12  align-text-center gap-y-1 md:gap-y-2 flex flex-col justify-center items-center">
					<RandomLetterSwapForward
						label="Right here!"
						reverse={true}
						className=""
					/>
					<RandomLetterSwapForward
						label="Right now!"
						reverse={false}
						className="font-bold italic px-4"
					/>
					<RandomLetterSwapPingPong label="Right here!" className="" />
					<RandomLetterSwapPingPong
						label="Right now!"
						reverse={false}
						className=" font-bold"
					/>
				</div>
			</div>
		</div>
	);
}
