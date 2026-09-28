"use client";

import ScrollRevealParagraph from "./component";

export default function Usage() {
	return (
		<div className="flex min-h-[28rem] items-center justify-center p-8">
			<ScrollRevealParagraph
				className="max-w-xl text-center text-xl"
				paragraph="Each word lights up as you scroll, so a long line of copy can still feel like it is arriving one beat at a time."
			/>
		</div>
	);
}
