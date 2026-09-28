"use client";

import { MasonryRoot, MasonryItem } from "./component";

const items = [
	{ id: "1", height: 180, content: "Card one" },
	{ id: "2", height: 240, content: "Card two" },
	{ id: "3", height: 200, content: "Card three" },
	{ id: "4", height: 160, content: "Card four" },
];

export default function Usage() {
	return (
		<div className="p-8">
			<MasonryRoot columns={2} gap={16}>
				{items.map((item) => (
					<MasonryItem key={item.id} height={item.height}>
						<div className="flex h-full items-center justify-center rounded-xl border bg-muted/30 p-4">
							{item.content}
						</div>
					</MasonryItem>
				))}
			</MasonryRoot>
		</div>
	);
}
