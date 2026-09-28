"use client";

import React from "react";

import { PinContainer } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="h-160 w-full flex items-center justify-center ">
				<PinContainer
					title="/ui.aceternity.com"
					href="https://twitter.com/mannupaaji"
				>
					<div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-80 ">
						<h3 className="max-w-xs pb-2! m-0! font-bold  text-base text-slate-100">
							Aceternity UI
						</h3>
						<div className="text-base m-0! p-0! font-normal">
							<span className="text-slate-500 ">
								Customizable Tailwind CSS and Framer Motion Components.
							</span>
						</div>
						<div className="flex flex-1 w-full rounded-lg mt-4 bg-linear-to-br from-violet-500 via-purple-500 to-blue-500" />
					</div>
				</PinContainer>
			</div>
		</div>
	);
}
