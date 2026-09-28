"use client";

import React from "react";

import FilmReel from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<FilmReel
				videos={[
					{
						name: "Instagram",
						image: "/itjustworks.jpg",
					},
					{
						name: "LinkedIn",
						image: "/itjustworks.jpg",
					},
					{
						name: "Spotify",
						image: "/itjustworks.jpg",
					},
					{
						name: "TikTok",
						image: "/itjustworks.jpg",
					},
				].map((social) => social.image)}
			/>
		</div>
	);
}
