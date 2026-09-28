"use client";

import React from "react";

import { Spotlight } from "./component";
import { cn } from "@/lib/utils";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="relative flex h-160 w-full overflow-hidden rounded-md bg-background/96 antialiased md:items-center md:justify-center">
				<div
					className={cn(
						"pointer-events-none absolute inset-0 bg-size-[40px_40px] select-none",
						"bg-[linear-gradient(to_right,#171717_1px,transparent_1px),linear-gradient(to_bottom,#171717_1px,transparent_1px)]"
					)}
				/>

				<Spotlight
					className="-top-40 left-0 md:-top-20 md:left-60"
					fill="white"
				/>
				<div className="relative z-10 mx-auto w-full max-w-7xl p-4 pt-20 md:pt-0">
					<h1 className="bg-opacity-50 bg-linear-to-b from-background to-background bg-clip-text text-center text-4xl font-bold text-transparent md:text-7xl">
						Spotlight <br /> is the new trend.
					</h1>
					<p className="mx-auto mt-4 max-w-lg text-center text-base font-normal text-secondary">
						Spotlight effect is a great way to draw attention to a
						specific part of the page. Here, we are drawing the attention
						towards the text section of the page. I don&apos;t know why
						but I&apos;m running out of copy.
					</p>
				</div>
			</div>{" "}
		</div>
	);
}
