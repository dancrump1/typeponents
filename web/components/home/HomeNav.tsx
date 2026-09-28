"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { LibraryNavSection } from "@/lib/library-nav";
import { ChevronDown } from "lucide-react";

const primaryLinkClass =
	"inline-flex items-center justify-center rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90";

export function HomeNav({ sections }: { sections: LibraryNavSection[] }) {
	return (
		<nav className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
			<Link href="/library" className={primaryLinkClass}>
				Browse the library
			</Link>
			<Link href="/playground" className={primaryLinkClass}>
				Playground
			</Link>

			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" className="gap-1.5">
						Other
						<ChevronDown className="size-4 opacity-60" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent
					align="start"
					className="max-h-[min(70vh,32rem)] w-64 overflow-y-auto"
				>
					{sections.map((section, index) => (
						<div key={section.title}>
							{index > 0 && <DropdownMenuSeparator />}
							<DropdownMenuLabel className="text-[11px] uppercase tracking-wide text-muted-foreground">
								{section.title}
							</DropdownMenuLabel>
							{section.links.map((link) => (
								<DropdownMenuItem key={link.href} asChild>
									<Link href={link.href}>{link.label}</Link>
								</DropdownMenuItem>
							))}
						</div>
					))}
				</DropdownMenuContent>
			</DropdownMenu>
		</nav>
	);
}
