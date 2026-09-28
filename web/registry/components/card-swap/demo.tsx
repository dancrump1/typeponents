"use client";

import React from "react";

import CardSwap, { SwapCard } from "./component";

export default function Usage() {
	return (
		<div className="relative w-full flex items-center justify-center">
			<CardSwap
				cardDistance={60}
				verticalDistance={70}
				delay={5000}
				pauseOnHover={false}
			>
				<SwapCard>
					<h3>Card 1</h3>
					<p>Your content here</p>
				</SwapCard>
				<SwapCard>
					<h3>Card 2</h3>
					<p>Your content here</p>
				</SwapCard>
				<SwapCard>
					<h3>Card 3</h3>
					<p>Your content here</p>
				</SwapCard>
			</CardSwap>
		</div>
	);
}
