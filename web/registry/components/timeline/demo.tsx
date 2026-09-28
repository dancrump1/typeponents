"use client";

import React from "react";

import { Timeline } from "./component";

export default function TimelineUsage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<Timeline
				data={[
					{
						title: "test ",
						decade: "1233",
						images: [{ url: "/itjustworks.jpg" }],
						copy: "asdfdsafdsafdsaf",
					},
					{
						title: "test stete",
						decade: "3456",
						images: [{ url: "/itjustworks.jpg" }],
						copy: "asdfsdfdsafd",
					},
					{
						title: "test etst tewts test",
						decade: "566",
						images: [{ url: "/itjustworks.jpg" }],
						copy: "zzzzzzzzzzzzzzzzzzzzzzz",
					},
					{
						title: "sdafgdg",
						decade: "768",
						images: [{ url: "/itjustworks.jpg" }],
						copy: "asdfsdaf",
					},
				]}
			/>
		</div>
	);
}
