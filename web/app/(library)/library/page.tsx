import { Suspense } from "react";
import type { Metadata } from "next";

import { CatalogBrowser } from "@/components/library/catalog-browser";
import { catalogWithStoredValues } from "@/lib/library-db";
import { buildFacets, gatedCount } from "@/lib/registry";
import { isLibraryUnlocked } from "@/lib/gate-server";

export const metadata: Metadata = {
	title: "Component library",
	description:
		"Browse every component with a live preview, its source library and install command.",
};

export default async function LibraryPage() {
	const unlocked = await isLibraryUnlocked();
	const entries = await catalogWithStoredValues(unlocked);
	const facets = buildFacets(entries);

	return (
		// Filter state is read from the URL, so the browser suspends on first render.
		<Suspense fallback={<CatalogSkeleton />}>
			<CatalogBrowser
				entries={entries}
				facets={facets}
				unlocked={unlocked}
				lockedCount={gatedCount}
			/>
		</Suspense>
	);
}

function CatalogSkeleton() {
	return (
		<div className="flex min-h-svh w-full">
			<div className="hidden w-72 shrink-0 border-r lg:block" />
			<div className="flex flex-1 items-center justify-center">
				<p className="text-sm text-muted-foreground">Loading catalog…</p>
			</div>
		</div>
	);
}
