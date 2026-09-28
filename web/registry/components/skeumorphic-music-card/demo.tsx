"use client";

import SkeumorphicMusicCard from "./component";

export default function Usage() {
	return (
		<div className="flex min-h-120 w-full items-center justify-center overflow-hidden p-8">
			<SkeumorphicMusicCard
				title="Sideline"
				artist="David Dallas"
				cover="https://picsum.photos/seed/sideline/680/680"
			/>
		</div>
	);
}
