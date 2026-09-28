"use client";

import OppoScroll from "./component";

export default function Usage() {
	return (
		<div className="relative h-full w-full overflow-auto bg-background">
			<OppoScroll containerRef={undefined} />
		</div>
	);
}
