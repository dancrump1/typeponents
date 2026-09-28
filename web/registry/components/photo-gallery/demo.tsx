"use client";

import PhotoGallery from "./component";

const photos = Array.from({ length: 24 }, (_, index) => ({
	url: `https://picsum.photos/seed/gallery${index + 1}/400/400`,
	title: `Photo ${index + 1}`,
}));

export default function Usage() {
	return (
		<div className="relative flex h-[600px] w-full items-center justify-center overflow-hidden p-6">
			<PhotoGallery photos={photos} rows={4} />
		</div>
	);
}
