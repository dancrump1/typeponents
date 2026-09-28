"use client";

import { useMemo } from "react";
import Link from "next/link";
import {
	parseAsArrayOf,
	parseAsBoolean,
	parseAsString,
	parseAsStringLiteral,
	useQueryStates,
} from "nuqs";
import { Search, X, Lock, LockOpen } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CATEGORIES } from "@/registry/schema";
import type { CatalogEntry } from "@/registry/types";
import { cn } from "@/lib/utils";

import { CatalogPreview } from "./demo-frame";
import { EditComponentButton } from "./edit-component-button";
import { SourceBadge } from "./source-badge";

type Facet = { value: string; label: string; count: number };

export type CatalogBrowserProps = {
	entries: CatalogEntry[];
	facets: {
		categories: Facet[];
		sources: Facet[];
		behaviours: Facet[];
		statuses: Facet[];
	};
	unlocked?: boolean;
	lockedCount?: number;
};

const SORTS = ["curated", "a-z"] as const;

/**
 * Filter state lives entirely in the URL, so a designer can send a colleague
 * "every Aceternity card with a drag interaction" as a link.
 */
const searchParams = {
	q: parseAsString.withDefault(""),
	category: parseAsArrayOf(parseAsString).withDefault([]),
	source: parseAsArrayOf(parseAsString).withDefault([]),
	behaviour: parseAsArrayOf(parseAsString).withDefault([]),
	needsWork: parseAsBoolean.withDefault(false),
	noSource: parseAsBoolean.withDefault(false),
	sort: parseAsStringLiteral(SORTS).withDefault("curated"),
};

export function CatalogBrowser({
	entries,
	facets,
	unlocked = false,
	lockedCount = 0,
}: CatalogBrowserProps) {
	const [filters, setFilters] = useQueryStates(searchParams, {
		history: "replace",
		shallow: true,
	});

	const toggle = (key: "category" | "source" | "behaviour", value: string) => {
		const current = filters[key];
		setFilters({
			[key]: current.includes(value)
				? current.filter((v) => v !== value)
				: [...current, value],
		});
	};

	const filtered = useMemo(() => {
		const q = filters.q.trim().toLowerCase();

		const result = entries.filter((entry) => {
			if (filters.category.length && !entry.categories.some((c) => filters.category.includes(c)))
				return false;
			if (
				filters.source.length &&
				!(entry.inspiration?.source && filters.source.includes(entry.inspiration.source))
			)
				return false;
			if (
				filters.behaviour.length &&
				!entry.tags.some((tag) => filters.behaviour.includes(tag))
			)
				return false;
			if (filters.needsWork && entry.status === "stable") return false;
			if (filters.noSource && entry.inspiration?.url) return false;

			if (q) {
				const haystack = [
					entry.title,
					entry.slug,
					entry.description,
					entry.interaction,
					entry.inspiration?.source ?? "",
					...entry.tags,
					...entry.categories,
					...entry.dependencies,
				]
					.join(" ")
					.toLowerCase();
				if (!haystack.includes(q)) return false;
			}
			return true;
		});

		if (filters.sort === "a-z") {
			return [...result].sort((a, b) => a.title.localeCompare(b.title));
		}
		return result;
	}, [entries, filters]);

	const grouped = useMemo(() => {
		const map = new Map<string, CatalogEntry[]>();
		for (const entry of filtered) {
			const primary = entry.categories[0];
			if (!map.has(primary)) map.set(primary, []);
			map.get(primary)!.push(entry);
		}
		return CATEGORIES.filter((c) => map.has(c)).map((category) => ({
			category,
			items: map.get(category)!,
		}));
	}, [filtered]);

	const activeCount =
		filters.category.length +
		filters.source.length +
		filters.behaviour.length +
		(filters.needsWork ? 1 : 0) +
		(filters.noSource ? 1 : 0) +
		(filters.q ? 1 : 0);

	const clearAll = () =>
		setFilters({
			q: "",
			category: [],
			source: [],
			behaviour: [],
			needsWork: false,
			noSource: false,
		});

	return (
		<div className="flex min-h-svh w-full">
			<aside className="sticky top-0 hidden h-svh w-72 shrink-0 flex-col overflow-y-auto border-r px-4 py-5 lg:flex">
				<Link href="/library" className="mb-4 block">
					<p className="text-sm font-semibold tracking-tight">Component library</p>
					<p className="text-xs text-muted-foreground">
						{entries.length} components
					</p>
				</Link>

				{lockedCount > 0 ? (
					<Link
						href="/library/unlock"
						className="mb-4 flex items-start gap-2 rounded-md border px-2.5 py-2 text-xs text-muted-foreground hover:border-foreground/30 hover:text-foreground"
					>
						{unlocked ? (
							<LockOpen className="mt-0.5 size-3.5 shrink-0" aria-hidden />
						) : (
							<Lock className="mt-0.5 size-3.5 shrink-0" aria-hidden />
						)}
						<span>
							{unlocked
								? "Internal collection unlocked"
								: `${lockedCount} internal component${lockedCount === 1 ? "" : "s"} — unlock`}
						</span>
					</Link>
				) : null}

				<div className="relative mb-4">
					<Search
						className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground"
						aria-hidden
					/>
					<Input
						value={filters.q}
						onChange={(event) => setFilters({ q: event.target.value })}
						placeholder="Search components"
						className="h-9 pl-8 text-sm"
					/>
				</div>

				{activeCount > 0 ? (
					<Button
						variant="ghost"
						size="sm"
						onClick={clearAll}
						className="mb-4 h-7 justify-start gap-1.5 px-2 text-xs text-muted-foreground"
					>
						<X className="size-3" aria-hidden />
						Clear {activeCount} filter{activeCount === 1 ? "" : "s"}
					</Button>
				) : null}

				<FilterGroup
					title="Needs attention"
					items={[
						{
							value: "needsWork",
							label: "Metadata incomplete",
							count: entries.filter((e) => e.status !== "stable").length,
							active: filters.needsWork,
							onToggle: () => setFilters({ needsWork: !filters.needsWork }),
						},
						{
							value: "noSource",
							label: "No recorded source",
							count: entries.filter((e) => !e.inspiration?.url).length,
							active: filters.noSource,
							onToggle: () => setFilters({ noSource: !filters.noSource }),
						},
					]}
				/>

				<FacetGroup
					title="Category"
					facets={facets.categories}
					selected={filters.category}
					onToggle={(v) => toggle("category", v)}
				/>
				<FacetGroup
					title="Source library"
					facets={facets.sources}
					selected={filters.source}
					onToggle={(v) => toggle("source", v)}
				/>
				<FacetGroup
					title="Behaviour"
					facets={facets.behaviours}
					selected={filters.behaviour}
					onToggle={(v) => toggle("behaviour", v)}
				/>
			</aside>

			<main className="min-w-0 flex-1">
				<header className="sticky top-0 z-20 flex items-center justify-between gap-4 border-b bg-background/80 px-6 py-3 backdrop-blur">
					<div>
						<h1 className="text-sm font-semibold">
							{filtered.length} component{filtered.length === 1 ? "" : "s"}
						</h1>
						<p className="text-xs text-muted-foreground">
							Previews play while they&apos;re on screen
						</p>
					</div>
					<div className="flex items-center gap-1 rounded-md border p-0.5">
						{SORTS.map((sort) => (
							<button
								key={sort}
								type="button"
								onClick={() => setFilters({ sort })}
								className={cn(
									"rounded px-2 py-1 text-xs capitalize transition-colors",
									filters.sort === sort
										? "bg-foreground text-background"
										: "text-muted-foreground hover:text-foreground"
								)}
							>
								{sort === "curated" ? "Curated" : "A–Z"}
							</button>
						))}
					</div>
				</header>

				{grouped.length === 0 ? (
					<div className="flex h-64 flex-col items-center justify-center gap-2 text-center">
						<p className="text-sm font-medium">Nothing matches those filters</p>
						<Button variant="outline" size="sm" onClick={clearAll}>
							Clear filters
						</Button>
					</div>
				) : (
					<div className="px-6 pb-24">
						{(() => {
							let n = 0;
							return grouped.map(({ category, items }) => (
								<section key={category} id={category} className="pt-10">
									<div className="mb-4 flex items-baseline gap-2">
										<h2 className="text-lg font-semibold tracking-tight">{category}</h2>
										<span className="text-xs text-muted-foreground">
											{items.length} component{items.length === 1 ? "" : "s"}
										</span>
									</div>
									<div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
										{items.map((entry) => {
											n += 1;
											return (
												<ComponentCard
													key={entry.slug}
													entry={entry}
													index={n}
													canEdit={unlocked}
												/>
											);
										})}
									</div>
								</section>
							));
						})()}
					</div>
				)}
			</main>
		</div>
	);
}

function FilterGroup({
	title,
	items,
}: {
	title: string;
	items: Array<{
		value: string;
		label: string;
		count: number;
		active: boolean;
		onToggle: () => void;
	}>;
}) {
	return (
		<div className="mb-5">
			<p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
				{title}
			</p>
			<ul className="space-y-0.5">
				{items.map((item) => (
					<li key={item.value}>
						<button
							type="button"
							onClick={item.onToggle}
							className={cn(
								"flex w-full items-center justify-between rounded px-2 py-1 text-left text-xs transition-colors",
								item.active
									? "bg-foreground text-background"
									: "text-muted-foreground hover:bg-muted hover:text-foreground"
							)}
						>
							<span className="truncate">{item.label}</span>
							<span className="ml-2 shrink-0 tabular-nums opacity-60">{item.count}</span>
						</button>
					</li>
				))}
			</ul>
		</div>
	);
}

function FacetGroup({
	title,
	facets,
	selected,
	onToggle,
}: {
	title: string;
	facets: Facet[];
	selected: string[];
	onToggle: (value: string) => void;
}) {
	if (!facets.length) return null;

	return (
		<div className="mb-5">
			<p className="mb-1.5 text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
				{title}
			</p>
			<ul className="space-y-0.5">
				{facets.map((facet) => {
					const active = selected.includes(facet.value);
					return (
						<li key={facet.value}>
							<button
								type="button"
								onClick={() => onToggle(facet.value)}
								className={cn(
									"flex w-full items-center justify-between rounded px-2 py-1 text-left text-xs transition-colors",
									active
										? "bg-foreground text-background"
										: "text-muted-foreground hover:bg-muted hover:text-foreground"
								)}
							>
								<span className="truncate">{facet.label}</span>
								<span className="ml-2 shrink-0 tabular-nums opacity-60">{facet.count}</span>
							</button>
						</li>
					);
				})}
			</ul>
		</div>
	);
}

function ComponentCard({
	entry,
	index,
	canEdit,
}: {
	entry: CatalogEntry;
	index: number;
	canEdit: boolean;
}) {
	const href = `/library/${entry.slug}`;
	return (
		<article className="group relative flex flex-col overflow-hidden rounded-lg border bg-card transition-colors hover:border-foreground/30">
			<Link href={href} className="block">
				<div className="relative h-64 overflow-hidden border-b bg-muted/20">
					{/*
					  Demos must not receive pointer events here: the card is a link,
					  and many demos capture wheel/touch which is what made scrolling
					  the catalog feel like wading through treacle.
					*/}
					<CatalogPreview
						slug={entry.slug}
						title={entry.title}
						risk={entry.risk}
					/>
				</div>
			</Link>

			<div className="flex flex-1 flex-col gap-1.5 p-3">
				<div className="flex items-start justify-between gap-2">
					<Link href={href} className="min-w-0">
						<h3 className="text-sm font-medium leading-tight">
							<span className="mr-1.5 tabular-nums text-muted-foreground/60">
								{String(index).padStart(2, "0")}
							</span>
							{entry.title}
						</h3>
					</Link>
					<span className="flex shrink-0 items-center gap-1">
						{entry.status !== "stable" ? (
							<Badge variant="outline" className="shrink-0 text-[10px] font-normal">
								{entry.status === "draft" ? "draft" : "review"}
							</Badge>
						) : null}
						<EditComponentButton entry={entry} canEdit={canEdit} />
					</span>
				</div>

				<Link href={href} className="flex flex-1 flex-col gap-1.5">
					{entry.description ? (
						<p className="line-clamp-2 text-xs text-muted-foreground">{entry.description}</p>
					) : (
						<p className="text-xs italic text-muted-foreground/60">
							No description yet
						</p>
					)}

					<div className="mt-auto flex flex-wrap items-center gap-1 pt-1.5">
						<SourceBadge inspiration={entry.inspiration} />
						{entry.gated ? (
							<span className="inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground">
								<Lock className="size-2.5" aria-hidden />
								Internal
							</span>
						) : null}
						{entry.tags.slice(0, 2).map((tag) => (
							<span
								key={tag}
								className="rounded-full bg-muted px-2 py-0.5 text-[11px] text-muted-foreground"
							>
								{tag}
							</span>
						))}
					</div>
				</Link>
			</div>
		</article>
	);
}
