# Simple Footer

- Categories: Footers
- Tags: hover
- Import: `@/components/ui/simple-footer`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/simple-footer.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `lucide-react`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `brandName` | `string` | — | — |
| `navigationLinks` | `SimpleFooterLink[]` | — | — |
| `socialLinks` | `SimpleFooterSocialLink[]` | — | — |

## Usage

```tsx
"use client";

import React from "react";

import FooterThird from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<FooterThird />
		</div>
	);
}
```

## Source

### `components/ui/simple-footer.tsx`

```tsx
import React from "react";

import Link from "next/link";

import { Facebook, Github, Linkedin, Twitter } from "lucide-react";

/** Default content, inlined so this component ships standalone. */
const componentDefaults = {
	props: {
		brandName: "BrandName",
		navigationLinks: [
			{
				href: "/about",
				label: "About Us",
			},
			{
				href: "/services",
				label: "Services",
			},
			{
				href: "/blog",
				label: "Blog",
			},
			{
				href: "/contact",
				label: "Contact",
			},
		],
		socialLinks: [
			{
				href: "https://facebook.com",
				icon: "Facebook",
				hoverColor: "text-foreground",
			},
			{
				href: "https://x.com/ayushmxxn",
				icon: "Twitter",
				hoverColor: "text-foreground",
			},
			{
				href: "https://linkedin.com",
				icon: "Linkedin",
				hoverColor: "text-foreground",
			},
			{
				href: "https://github.com/ayushmxxn",
				icon: "Github",
				hoverColor: "text-foreground",
			},
		],
	},
};

const ICONS = {
	Facebook,
	Twitter,
	Linkedin,
	Github,
} as const;

export type SimpleFooterLink = {
	href: string;
	label: string;
};

export type SimpleFooterSocialLink = {
	href: string;
	icon: keyof typeof ICONS;
	hoverColor?: string;
};

export type SimpleFooterProps = {
	brandName?: string;
	navigationLinks?: SimpleFooterLink[];
	socialLinks?: SimpleFooterSocialLink[];
};

const FooterThird = (props: Partial<SimpleFooterProps> = {}) => {
	const resolved = { ...componentDefaults.props, ...props } as SimpleFooterProps;
	const {
		brandName = "BrandName",
		navigationLinks = [],
		socialLinks = [],
	} = resolved;

	return (
		<footer className="bg-background text-foreground">
			<div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
				<div className="flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0">
					<div className="text-xl font-bold">
						<Link href="/" className="text-foreground hover:text-foreground">
							{brandName}
						</Link>
					</div>
					<div className="flex flex-wrap justify-center space-x-6 text-sm">
						{navigationLinks.map((link) => (
							<Link
								key={link.href}
								href={link.href}
								className="hover:text-foreground"
							>
								{link.label}
							</Link>
						))}
					</div>
					<div className="flex flex-wrap justify-center space-x-4 text-foreground">
						{socialLinks.map((social) => {
							const Icon = ICONS[social.icon] ?? Github;
							return (
								<a
									key={social.href}
									href={social.href}
									target="_blank"
									rel="noopener noreferrer"
									className={`hover:${social.hoverColor || "text-foreground"}`}
								>
									<Icon size={24} />
								</a>
							);
						})}
					</div>
				</div>
				<div className="border-t border-gray-200 mt-5">
					<div className="mt-5 text-center text-sm text-foreground">
						<p>
							&copy; {new Date().getFullYear()} {brandName}. All rights
							reserved.
						</p>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default FooterThird;
```
