"use client";

import { SphereGallery } from "./component";

const ITEMS = Array.from({ length: 12 }, (_, index) => ({
	src: `https://picsum.photos/seed/sphere-${index}/640/640`,
	alt: `Sphere gallery image ${index + 1}`,
}));

export default function Usage() {
	return (
		<div className="h-[28rem] w-full">
			<SphereGallery items={ITEMS} className="h-full w-full" />
		</div>
	);
}
