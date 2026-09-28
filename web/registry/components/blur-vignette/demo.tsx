"use client";

import React from "react";

import Image from "next/image";

import {
	BlurVignette,
	BlurVignetteArticle,
} from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<BlurVignette
				radius="24px"
				inset="10px"
				transitionLength="80px"
				blur="15px"
			>
				<Image
					src="/itjustworks.jpg"
					alt="grid"
					width={600}
					className="mx-auto w-full relative h-full object-cover"
					height={600}
				/>
				<BlurVignetteArticle />
			</BlurVignette>
			<BlurVignette
				radius="24px"
				inset="10px"
				transitionLength="80px"
				blur="15px"
			>
				<Image
					src="/itjustworks.jpg"
					alt="grid"
					width={600}
					className="mx-auto w-full relative h-full object-cover"
					height={600}
				/>
				<BlurVignetteArticle />
			</BlurVignette>
		</div>
	);
}
