"use client";

import React from "react";

import OppositeScroll from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<OppositeScroll
				works={[
					{
						id: 1,
						title: "first entry",
						image: "/itjustworks.jpg",
						uri: "/#",
					},

					{
						id: 2,
						title: "first entry",
						image: "/itjustworks.jpg",
						uri: "/#",
					},
					{
						id: 3,
						title: "first entry",
						image: "/itjustworks.jpg",
						uri: "/#",
					},
					{
						id: 4,
						title: "first entry",
						image: "/itjustworks.jpg",
						uri: "/#",
					},
					{
						id: 5,
						title: "first entry",
						image: "/itjustworks.jpg",
						uri: "/#",
					},
					{
						id: 6,
						title: "first entry",
						image: "/itjustworks.jpg",
						uri: "/#",
					},
				]}
			/>
		</div>
	);
}
