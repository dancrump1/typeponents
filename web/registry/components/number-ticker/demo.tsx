"use client";

import React from "react";

import NumberTicker from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<NumberTicker
				value={100}
				className="whitespace-pre-wrap text-8xl font-medium tracking-tighter text-secondary dark:text-secondary"
			/>
		</div>
	);
}
