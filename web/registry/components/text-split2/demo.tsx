"use client";

import { TextSplit } from "./component";

export default function Usage() {
	return (
		<div className="flex h-full min-h-[16rem] items-center justify-center p-8 text-3xl font-semibold">
			<TextSplit splitBy="letters">Split into letters</TextSplit>
		</div>
	);
}
