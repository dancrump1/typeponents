"use client";

import { FloatingDockMenu } from "./component";

export default function Usage() {
	return (
		<div className="flex min-h-120 w-full items-end justify-center overflow-hidden p-8">
			{/* The component defaults to `fixed`, which would escape the preview. */}
			<FloatingDockMenu isFixed={false} />
		</div>
	);
}
