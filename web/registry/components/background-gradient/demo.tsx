"use client";

import React from "react";

import { BackgroundGradient } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div>
				<BackgroundGradient className="rounded-[22px] max-w-sm p-4 sm:p-10 bg-background dark:bg-background">
					<img
						src={`/itjustworks.jpg`}
						alt="jordans"
						height="400"
						width="400"
						className="object-contain"
					/>
					<p className="text-base sm:text-xl text-secondary mt-4 mb-2 dark:text-secondary">
						Air Jordan 4 Retro Reimagined
					</p>

					<p className="text-sm text-secondary dark:text-secondary">
						The Air Jordan 4 Retro Reimagined Bred will release on
						Saturday, February 17, 2024. Your best opportunity to get
						these right now is by entering raffles and waiting for the
						official releases.
					</p>
					<button className="rounded-full pl-4 pr-1 py-1 text-secondary flex items-center space-x-1 bg-background mt-4 text-xs font-bold dark:bg-background">
						<span>Buy now </span>
						<span className="bg-background rounded-full text-[0.6rem] px-2 py-0 text-secondary">
							$100
						</span>
					</button>
				</BackgroundGradient>
			</div>
		</div>
	);
}
