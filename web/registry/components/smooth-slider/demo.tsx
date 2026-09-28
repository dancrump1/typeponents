"use client";

import React from "react";



import { AnimatedCard, AnimatedSlider, CardContent, DefaultView, OnHover } from "./component";
import { Bookmark } from "lucide-react";





export const animeData = [
	{
		id: "1",
		title: "Solo Leveling",
		image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=1000",
		year: "2024",
		seasons: "1 season",
		platform: "Crunchyroll",
	},
	{
		id: "2",
		title: "Ishura",
		image: "https://images.unsplash.com/photo-1580477667995-2b94f01c9516?q=80&w=1000",
		year: "2024",
		seasons: "1 season",
		platform: "Crunchyroll",
	},
	{
		id: "3",
		title: "The Apothecary Diaries",
		image: "https://images.unsplash.com/photo-1541562232579-512a21360020?q=80&w=1000",
		year: "2023",
		seasons: "2 seasons",
		platform: "Crunchyroll",
	},
	{
		id: "4",
		title: "Zenshu",
		image: "https://images.unsplash.com/photo-1560972550-aba3456b5564?q=80&w=1000",
		year: "2023",
		seasons: "1 season",
		platform: "Netflix",
	},
	{
		id: "5",
		title: "Sakamoto Days",
		image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?q=80&w=1000",
		year: "2024",
		seasons: "1 season",
		platform: "Crunchyroll",
	},
	{
		id: "6",
		title: "Dr. Stone",
		image: "https://images.unsplash.com/photo-1618336753974-aae8e04506aa?q=80&w=1000",
		year: "2019",
		seasons: "3 seasons",
		platform: "Crunchyroll",
	},
	{
		id: "7",
		title: "Unnamed Memory",
		image: "https://images.unsplash.com/photo-1705831156575-a5294d295a31?q=80&w=1000",
		year: "2024",
		seasons: "1 season",
		platform: "Crunchyroll",
	},
	{
		id: "8",
		title: "I Got Married to the Male Lead",
		image: "https://images.unsplash.com/photo-1601850494422-3cf14624b0b3?q=80&w=1000",
		year: "2024",
		seasons: "1 season",
		platform: "Crunchyroll",
	},
];


export default function Usage() {
	return (
		<div className="relative w-full flex items-center justify-center">
			<div className="w-full p-4">
				<AnimatedSlider title="Popular Anime">
					{animeData.map((anime) => (
						<AnimatedCard key={anime.id}>
							<CardContent>
								<img
									src={anime.image}
									alt={anime.title}
									className="h-full w-full object-cover"
									style={{ transition: "all 0.4s ease" }}
								/>
								<div className="absolute top-2 right-2 z-10">
									<button className="text-secondary transition-colors hover:text-secondary">
										<Bookmark className="h-5 w-5" />
									</button>
								</div>
								<OnHover fadeInDuration="0.5s">
									<div className="space-y-1">
										<h3 className="text-xl font-bold text-secondary">
											{anime.title}
										</h3>
										<p className="text-sm text-secondary">
											{anime.year} · {anime.seasons} ·{" "}
											{anime.platform}
										</p>
										<button className="mt-3 flex items-center gap-1 rounded bg-background/20 px-3 py-1 text-sm text-secondary backdrop-blur-xs transition-colors hover:bg-background/30">
											Watch options
										</button>
									</div>
								</OnHover>
								<DefaultView>{anime.title}</DefaultView>
							</CardContent>
						</AnimatedCard>
					))}
				</AnimatedSlider>
			</div>
		</div>
	);
}