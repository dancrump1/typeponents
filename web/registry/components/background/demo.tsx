"use client";

import Background from "./component";

export default function Usage() {
	return (
		<div className="relative h-[400px] w-full overflow-hidden rounded-xl">
			<Background
				image={{ url: "https://picsum.photos/1200/800" }}
				position="center"
			/>
		</div>
	);
}
