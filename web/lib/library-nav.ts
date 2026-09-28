export type LibraryNavLink = {
	href: string;
	label: string;
};

export type LibraryNavSection = {
	title: string;
	links: LibraryNavLink[];
};

export function getLibraryNavSections(): LibraryNavSection[] {
	return [
		{
			title: "Library",
			links: [
				{ href: "/library", label: "Browse components" },
				{ href: "/ui", label: "UI primitives" },
				{ href: "/credits", label: "Credits" },
			],
		},
		{
			title: "Tools",
			links: [
				{ href: "/generate", label: "Generate (v0 chat)" },
				{ href: "/experiments", label: "Experiments hub" },
			],
		},
	];
}
