"use client";

import EagleVision, { Target } from "./component";

export default function Usage() {
	return (
		<div className="relative flex min-h-120 w-full flex-col items-center justify-center gap-8 overflow-hidden p-8">
			<EagleVision />
			<p className="text-muted-foreground">Can you find the target?</p>
			<Target>
				<div className="rounded-xl border border-white/20 bg-white/5 px-4 py-2">
					Secret
				</div>
			</Target>
		</div>
	);
}
