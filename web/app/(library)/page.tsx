import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { buildFacets, visibleCatalog } from "@/lib/registry";

export default function Page() {
	const facets = buildFacets(visibleCatalog);
	const needsWork = visibleCatalog.filter((c) => c.status !== "stable").length;
	const withSource = visibleCatalog.filter((c) => c.inspiration?.url).length;

	return (
		<div className="mx-auto flex max-w-3xl flex-col gap-10 p-8 md:p-12">
			<header className="space-y-3">
				<h1 className="text-3xl font-semibold tracking-tight md:text-4xl">
					Component registry
				</h1>
				<p className="text-muted-foreground">
					{visibleCatalog.length} components across {facets.categories.length}{" "}
					categories, adapted from {facets.sources.length} sources. Every one
					installs with the shadcn CLI, which rewrites imports to match the target
					project.
				</p>
				<Link
					href="/library"
					className="inline-flex items-center gap-1.5 text-sm font-medium underline underline-offset-4"
				>
					Browse the library
					<ArrowRight className="size-3.5" aria-hidden />
				</Link>
			</header>

			<section className="grid gap-3 sm:grid-cols-3">
				<Stat label="Components" value={visibleCatalog.length} />
				<Stat label="With a recorded source" value={withSource} />
				<Stat label="Metadata incomplete" value={needsWork} />
			</section>

			<section className="space-y-2 rounded-lg border p-4 text-sm">
				<h2 className="font-medium">Install a component</h2>
				<pre className="overflow-x-auto rounded bg-muted p-3 text-xs">
					<code>
						npx shadcn@latest add
						https://components.drivedev.net/r/3d-card.json
					</code>
				</pre>
				<p className="text-muted-foreground">
					The CLI resolves <code className="rounded bg-muted px-1">cn</code>, hooks
					and primitives against the consuming project&apos;s{" "}
					<code className="rounded bg-muted px-1">components.json</code>, so nothing
					needs re-pathing by hand.
				</p>
			</section>

			<section className="space-y-2 rounded-lg border p-4 text-sm">
				<h2 className="font-medium">For agents</h2>
				<ul className="space-y-1 text-muted-foreground">
					<li>
						<code className="rounded bg-muted px-1">/llms.txt</code> — every
						component, grouped by category
					</li>
					<li>
						<code className="rounded bg-muted px-1">
							/docs/&#123;name&#125;.md
						</code>{" "}
						— description, props, full source and attribution for one component
					</li>
					<li>
						<code className="rounded bg-muted px-1">/r/&#123;name&#125;.json</code>{" "}
						— the installable registry item
					</li>
				</ul>
			</section>

			<section className="space-y-2 text-sm">
				<h2 className="font-medium">Top sources</h2>
				<ul className="flex flex-wrap gap-1.5">
					{facets.sources.slice(0, 12).map((source) => (
						<li key={source.value}>
							<Link
								href={`/library?source=${encodeURIComponent(source.value)}`}
								className="inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs text-muted-foreground hover:text-foreground"
							>
								{source.label}
								<span className="tabular-nums opacity-60">{source.count}</span>
							</Link>
						</li>
					))}
				</ul>
			</section>
		</div>
	);
}

function Stat({ label, value }: { label: string; value: number }) {
	return (
		<div className="rounded-lg border px-4 py-3">
			<p className="text-2xl font-semibold tabular-nums">{value}</p>
			<p className="text-xs text-muted-foreground">{label}</p>
		</div>
	);
}
