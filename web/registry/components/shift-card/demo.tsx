"use client";

import { ShiftCard } from "./component";

export default function Usage() {
	return (
		<div className="flex items-center justify-center p-8">
			<ShiftCard
				className="h-[320px] w-[280px]"
				topContent={<p className="text-sm text-muted-foreground">Featured</p>}
				middleContent={<h3 className="text-xl font-semibold">Shift Card</h3>}
				topAnimateContent={<span className="text-xs uppercase tracking-wide">New</span>}
				bottomContent={<p className="text-sm text-muted-foreground">Hover to reveal extra content.</p>}
			/>
		</div>
	);
}
