"use client";

import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface ShareLink {
	icon: LucideIcon;
	href?: string;
	onClick?: () => void;
	label?: string;
}

interface ShareButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	links: ShareLink[];
	children: React.ReactNode;
}

const ShareButton = ({
	className,
	links,
	children,
	...props
}: ShareButtonProps) => {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<div
			className="relative"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<Button
				className={cn(
					"relative min-w-40  rounded-3xl ",
					"bg-background dark:bg-background",
					"hover:bg-background dark:hover:bg-background",
					"text-foreground dark:text-foreground",
					"border border-black/10 dark:border-white/10",
					"transition-[opacity,background-color,color,border-color] duration-300",
					isHovered ? "opacity-0" : "opacity-100",
					className
				)}
				{...props}
			>
				<span className="flex items-center gap-2">{children}</span>
			</Button>

			<div className="absolute left-0 top-0 flex h-10">
				{links.map((link, index) => {
					const Icon = link.icon;
					return (
						<button
							type="button"
							key={index + "share-button"}
							onClick={link.onClick}
							className={cn(
								"h-10",
								"w-10",
								"flex items-center justify-center",
								"bg-background dark:bg-background",
								"text-foreground dark:text-foreground",
								"transition-all duration-300",
								index === 0 && "rounded-l-3xl",
								index === links.length - 1 && "rounded-r-3xl",
								"border-r border-white/10 last:border-r-0 dark:border-black/10",
								"hover:bg-background dark:hover:bg-background",
								"",
								isHovered
									? "translate-x-0 opacity-100"
									: "-translate-x-full opacity-0",
								index === 0 && "duration-200",
								index === 1 && "delay-50 duration-200",
								index === 2 && "delay-100 duration-200",
								index === 3 && "delay-150 duration-200"
							)}
						>
							<Icon className="size-4" />
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default ShareButton;
