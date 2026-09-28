"use client";

import React from "react";

import { Boxes } from "./component";
import { cn } from "@/lib/utils";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="h-96 relative w-full overflow-hidden bg-slate-900 flex flex-col items-center justify-center rounded-lg">
				<div className="absolute inset-0 w-full h-full bg-slate-900 z-20 mask-[radial-gradient(transparent,white)] pointer-events-none" />

				<Boxes />
				<h1 className={cn("md:text-4xl text-xl text-secondary relative z-20")}>
					Tailwind is Awesome
				</h1>
				<p className="text-center mt-2 text-secondary relative z-20">
					Framer motion is the best animation library ngl
				</p>
			</div>
		</div>
	);
}
