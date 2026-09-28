"use client";

import Lane, { ListCard } from "./component";

const cards = [
	{ id: "1", title: "Explore", image: "https://picsum.photos/300/400?1" },
	{ id: "2", title: "Discover", image: "https://picsum.photos/300/400?2" },
];

export default function Usage() {
	return (
		<div className="p-8">
			<Lane>
				{cards.map((card) => (
					<ListCard key={card.id} card={card} />
				))}
			</Lane>
		</div>
	);
}
