"use client";

import { AvatarCircles } from "./component";

export default function Usage() {
	return (
		<div className="flex min-h-120 w-full items-center justify-center overflow-hidden p-8">
			<AvatarCircles avatarUrls={[
				{
					imageUrl: "https://avatars.githubusercontent.com/u/16860528",
					profileUrl: "https://github.com/dancrump1",
				},
			]} />
		</div>
	);
}
