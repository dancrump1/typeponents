import type { Metadata } from "next";

import { CopyButton } from "@/components/library/copy-button";
import { getRegistryBaseUrl, loadUiBasicCatalogIndex } from "@/lib/registry-catalog";

export const metadata: Metadata = {
	title: "UI primitives",
	description:
		"Static shadcn-style primitives — buttons, cards, tables — installable from the r-ui registry.",
};

/**
 * The unanimated primitives registry. Deliberately a plain list: these are
 * standard shadcn components, so a live preview adds nothing that the shadcn
 * docs don't already show. The animated catalog lives at /library.
 */
export default function UiBasicCatalogPage() {
	const entries = loadUiBasicCatalogIndex();
	const baseUrl = getRegistryBaseUrl();

	const grouped = new Map<string, typeof entries>();
	for (const entry of entries) {
		const key = entry.category || "Uncategorised";
		if (!grouped.has(key)) grouped.set(key, []);
		grouped.get(key)!.push(entry);
	}

	return (
		<div className="mx-auto w-full max-w-4xl px-6 py-10">
			<header className="mb-8">
				<h1 className="text-2xl font-semibold tracking-tight">UI primitives</h1>
				<p className="mt-1.5 text-sm text-muted-foreground">
					{entries.length} unanimated shadcn-style components. For the animated
					catalog with live previews, see{" "}
					<a href="/library" className="underline underline-offset-2">
						/library
					</a>
					.
				</p>
			</header>

			{entries.length === 0 ? (
				<p className="text-sm text-muted-foreground">
					No index found. Run{" "}
					<code className="rounded bg-muted px-1 py-0.5 text-xs">npm run build</code>{" "}
					to generate <code className="rounded bg-muted px-1 py-0.5 text-xs">public/r-ui/index.json</code>.
				</p>
			) : (
				[...grouped.keys()].sort().map((category) => (
					<section key={category} className="mb-8">
						<h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
							{category}
						</h2>
						<ul className="divide-y rounded-lg border">
							{grouped.get(category)!.map((entry) => {
								const command = `npx shadcn@latest add ${baseUrl}/r-ui/${entry.name}.json`;
								return (
									<li
										key={entry.name}
										className="flex items-center justify-between gap-4 px-3 py-2"
									>
										<div className="min-w-0">
											<p className="truncate text-sm font-medium">{entry.title}</p>
											{entry.description ? (
												<p className="truncate text-xs text-muted-foreground">
													{entry.description}
												</p>
											) : null}
										</div>
										<CopyButton value={command} variant="ghost" size="icon" />
									</li>
								);
							})}
						</ul>
					</section>
				))
			)}
		</div>
	);
}
