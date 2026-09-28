"use client";

import MasonryGrid from "./component";

const items = [
	{
		title: "Urban Skyline",
		image: "https://picsum.photos/seed/skyline/600/800",
		description:
			"A breathtaking view of a modern cityscape with towering skyscrapers illuminated at dusk.",
	},
	{
		title: "Mountain Retreat",
		image: "https://picsum.photos/seed/cabin/600/500",
		description:
			"A serene cabin nestled in the heart of towering mountains, perfect for a peaceful getaway.",
	},
	{
		title: "Forest Wander",
		image: "https://picsum.photos/seed/forest/600/700",
		description:
			"A misty trail winding through a dense, enchanting forest filled with lush greenery.",
	},
	{
		title: "Serene Lake",
		image: "https://picsum.photos/seed/lake/600/450",
		description:
			"A tranquil lake reflecting the golden hues of the sunset, surrounded by peaceful nature.",
	},
	{
		title: "Golden Hour",
		image: "https://picsum.photos/seed/sunset/600/400",
		description:
			"A mesmerizing sunset casting a warm glow over the ocean, creating a dreamlike atmosphere.",
	},
	{
		title: "Coastal Vibes",
		image: "https://picsum.photos/seed/coast/600/550",
		description:
			"Crystal-clear waves crashing against a sandy shore, offering a perfect beach escape.",
	},
	{
		title: "Night Lights",
		image: "https://picsum.photos/seed/night/600/750",
		description:
			"A dazzling city skyline at night, with vibrant lights illuminating the urban landscape.",
	},
	{
		title: "Rustic Charm",
		image: "https://picsum.photos/seed/rustic/600/480",
		description:
			"A cozy wooden cabin with a warm, inviting atmosphere set in a countryside setting.",
	},
];

export default function Usage() {
	return (
		<div className="flex min-h-120 w-full items-center justify-center overflow-hidden p-8">
			<MasonryGrid items={items} />
		</div>
	);
}
