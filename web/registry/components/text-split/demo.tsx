"use client";

import TextSplit from "./component";

export default function TextRotateUsage() {
	return (
		<div className="w-dvw h-dvh text-2xl sm:text-3xl md:text-5xl flex flex-row items-center justify-center font-overused-grotesk bg-background dark:text-muted text-foreground font-light overflow-hidden p-12 sm:p-20 md:p-24">
			<TextSplit
				className="text-9xl font-semibold uppercase"
				topClassName="text-red-500"
				bottomClassName="text-secondary dark:text-secondary"
			>
				Berlix UI
			</TextSplit>
			;{" "}
		</div>
	);
}
