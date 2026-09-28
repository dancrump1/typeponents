"use client";

import React from "react";

import { HorizontalScrollCarousel } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="bg-background">
				<div className="flex h-48 items-center justify-center">
					<span className="font-semibold uppercase text-secondary">
						Scroll down
					</span>
				</div>
				<HorizontalScrollCarousel />
				<div className="flex h-48 items-center justify-center">
					<span className="font-semibold uppercase text-secondary">
						Scroll up
					</span>
				</div>
			</div>{" "}
		</div>
	);
}
