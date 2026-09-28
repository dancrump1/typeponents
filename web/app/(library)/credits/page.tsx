import Link from "next/link";

import { buildFacets, visibleCatalog } from "@/lib/registry";

export default function CreditsPage() {
	const { sources } = buildFacets(visibleCatalog);

	return (
		<div className="mx-auto max-w-3xl px-6 py-12">
			<Link href="/library" className="text-xs text-muted-foreground hover:text-foreground">
				← Library
			</Link>
			<h1 className="mt-4 text-2xl font-semibold tracking-tight">Credits</h1>
			<p className="mt-2 text-sm text-muted-foreground">
				{sources.length} source libraries recorded on {visibleCatalog.length}{" "}
				components. Each component&apos;s{" "}
				<code className="rounded bg-muted px-1 py-0.5 text-xs">meta.ts</code> is
				the source of truth — this list is derived from it.
			</p>
			<ul className="mt-8 flex flex-wrap gap-2">
				{sources.map((source) => (
					<li key={source.value}>
						<Link
							href={`/library?source=${encodeURIComponent(source.value)}`}
							className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm hover:bg-muted"
						>
							{source.label}
							<span className="tabular-nums text-muted-foreground">{source.count}</span>
						</Link>
					</li>
				))}
			</ul>
		</div>
	);
}
