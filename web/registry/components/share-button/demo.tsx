"use client";

import React from "react";

import ShareButton from "./component";
import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<ShareButton
				links={[
					{
						icon: Facebook,
						onClick: () => null,
					},
					{
						icon: Twitter,
						onClick: () => null,
					},
					{
						icon: Instagram,
						onClick: () => null,
					},
					{
						icon: Linkedin,
						onClick: () => null,
					},
				]}
			>
				Share this link!
			</ShareButton>
		</div>
	);
}
