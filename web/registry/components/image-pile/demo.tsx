"use client";

import ImagePile from "./component";

const images = [
	"https://picsum.photos/seed/pile1/1200/800",
	"https://picsum.photos/seed/pile2/1200/800",
	"https://picsum.photos/seed/pile3/1200/800",
	"https://picsum.photos/seed/pile4/1200/800",
];

export default function Usage() {
	return (
		<div className="flex min-h-120 w-full items-center justify-center overflow-hidden p-8">
			<ImagePile images={images} />
		</div>
	);
}
