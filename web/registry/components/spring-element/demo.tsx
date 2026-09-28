"use client";

import React from "react";

import { SpringElement } from "./component";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<SpringElement>
				<Avatar className="size-12">
					<AvatarImage draggable={false} src={"/itjustworks.jpg"} />
					<AvatarFallback>{"/itjustworks.jpg"}</AvatarFallback>
				</Avatar>
			</SpringElement>
		</div>
	);
}
