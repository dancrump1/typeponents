"use client";

import SocialMediaCard from "./component";

export default function Usage() {
	return (
		<div className="flex min-h-120 w-full items-center justify-center overflow-hidden p-8">
			<SocialMediaCard
	post={{
		name: "Samit Kapoor",
		isVerified: true,
		username: "samitkapoorr",
		comment: "sometimes the best background is no background at all",
		platform: "x",
		pfp: "https://picsum.photos/seed/samitpfp/400/400",
	}}
	className="w-[420px]"
/>
		</div>
	);
}
