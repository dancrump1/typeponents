"use client";

import { GlowingEffect } from "./component";

export default function Usage() {
	return (
		<div className="relative flex w-full items-center justify-center p-8">
			<div className="relative w-full max-w-md rounded-2xl border p-8">
				<GlowingEffect disabled={false} proximity={64} spread={40} />
				<h3 className="text-lg font-semibold">Glowing Effect</h3>
				<p className="mt-2 text-sm text-muted-foreground">
					Move your cursor near the card border to see the glow follow.
				</p>
			</div>
		</div>
	);
}
