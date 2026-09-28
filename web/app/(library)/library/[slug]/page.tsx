import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { ArrowLeft, ArrowRight, ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { CodeViewer } from "@/components/library/code-viewer";
import { CopyForAgent } from "@/components/library/copy-for-agent";
import { DemoFrame } from "@/components/library/demo-frame";
import { InstallTabs } from "@/components/library/install-tabs";
import { PropsTable } from "@/components/library/props-table";
import { isLibraryUnlocked } from "@/lib/gate-server";
import { EditComponentButton } from "@/components/library/edit-component-button";
import { entryWithStoredValues } from "@/lib/library-db";
import {
	neighbours,
	readAgentDoc,
	readDemos,
	readRegistryItem,
	unlockedCatalog,
	visibleCatalog,
} from "@/lib/registry";

export function generateStaticParams() {
	return visibleCatalog.map((entry) => ({ slug: entry.slug }));
}

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const entry = await entryWithStoredValues(slug);
	if (!entry) return {};
	if (entry.gated && !(await isLibraryUnlocked())) {
		return { title: "Unlock", robots: { index: false, follow: false } };
	}
	return {
		title: entry.title,
		description: entry.description || `${entry.title} component`,
		...(entry.gated ? { robots: { index: false, follow: false } } : {}),
	};
}

export default async function ComponentPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	const entry = await entryWithStoredValues(slug);
	if (!entry || entry.hidden) notFound();

	const unlocked = await isLibraryUnlocked();
	if (entry.gated && !unlocked) notFound();

	const browse = unlocked ? unlockedCatalog : visibleCatalog;
	const item = readRegistryItem(slug);
	const demos = readDemos(slug);
	const doc = readAgentDoc(slug) ?? "";
	const { previous, next, index, total } = neighbours(slug, browse);

	const agentPrompt = buildAgentPrompt(entry);

	return (
		<div className="mx-auto w-full max-w-5xl px-6 py-8">
			<nav className="mb-6 flex items-center justify-between gap-4 text-xs text-muted-foreground">
				<Link href="/library" className="inline-flex items-center gap-1 hover:text-foreground">
					<ArrowLeft className="size-3" aria-hidden />
					All components
				</Link>
				<span className="tabular-nums">
					{index + 1} of {total}
				</span>
			</nav>

			<header className="mb-6">
				<div className="mb-2 flex flex-wrap items-center gap-2">
					{entry.categories.map((category) => (
						<Link
							key={category}
							href={`/library?category=${encodeURIComponent(category)}`}
							className="rounded-full border px-2 py-0.5 text-[11px] text-muted-foreground hover:text-foreground"
						>
							{category}
						</Link>
					))}
					{entry.status !== "stable" ? (
						<Badge variant="outline" className="text-[10px] font-normal">
							{entry.status}
						</Badge>
					) : null}
				</div>

				<div className="flex items-start justify-between gap-4">
					<h1 className="text-2xl font-semibold tracking-tight">{entry.title}</h1>
					<EditComponentButton entry={entry} appearance="page" />
				</div>

				{entry.description ? (
					<p className="mt-1.5 max-w-2xl text-sm text-muted-foreground">
						{entry.description}
					</p>
				) : (
					<p className="mt-1.5 text-sm italic text-muted-foreground/70">
						No description yet — add one to{" "}
						<code className="rounded bg-muted px-1 py-0.5 not-italic">
							registry/components/{slug}/meta.ts
						</code>
					</p>
				)}

				<div className="mt-4">
					<CopyForAgent doc={doc} prompt={agentPrompt} />
				</div>
			</header>

			<section className="mb-8">
				<div className="relative h-[28rem] overflow-hidden rounded-lg border bg-gradient-to-b from-muted/30 to-background">
					<DemoFrame
						slug={slug}
						title={entry.title}
						risk={entry.risk}
						trigger="eager"
					/>
				</div>
			</section>

			{entry.interaction ? (
				<Section title="Interaction">
					<p className="text-sm text-muted-foreground">{entry.interaction}</p>
				</Section>
			) : null}

			<Section title="Install">
				{entry.gated ? (
					<p className="text-sm text-muted-foreground">
						This component is licensed for internal use only and is not published
						to the public registry. Copy the source below rather than installing
						it with the shadcn CLI.
					</p>
				) : (
					<>
						<InstallTabs registryUrl={entry.registryUrl} />
						<p className="mt-2 text-xs text-muted-foreground">
							The shadcn CLI rewrites imports to match the target project&apos;s{" "}
							<code className="rounded bg-muted px-1 py-0.5">components.json</code>, so{" "}
							<code className="rounded bg-muted px-1 py-0.5">cn</code> and any hooks resolve
							to wherever that project keeps them.
						</p>
					</>
				)}
				<p className="mt-3 text-sm">
					Import it with{" "}
					<code className="rounded bg-muted px-1.5 py-0.5 text-xs">
						{entry.importPath}
					</code>
				</p>
			</Section>

			{(entry.dependencies.length > 0 || entry.registryDependencies.length > 0) && (
				<Section title="Dependencies">
					<div className="grid gap-4 sm:grid-cols-2">
						{entry.dependencies.length > 0 && (
							<div>
								<p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
									npm packages
								</p>
								<ul className="flex flex-wrap gap-1.5">
									{entry.dependencies.map((dep) => (
										<li
											key={dep}
											className="rounded bg-muted px-2 py-0.5 font-mono text-xs"
										>
											{dep}
										</li>
									))}
								</ul>
							</div>
						)}
						{entry.registryDependencies.length > 0 && (
							<div>
								<p className="mb-1.5 text-xs font-medium uppercase tracking-wide text-muted-foreground">
									Registry dependencies
								</p>
								<ul className="flex flex-wrap gap-1.5">
									{entry.registryDependencies.map((dep) => (
										<li
											key={dep}
											className="max-w-full truncate rounded bg-muted px-2 py-0.5 font-mono text-xs"
										>
											{dep.replace(/^https?:\/\/[^/]+\/r\//, "").replace(/\.json$/, "")}
										</li>
									))}
								</ul>
							</div>
						)}
					</div>
				</Section>
			)}

			{demos.length > 0 && (
				<Section
					title={demos.length > 1 ? `Usage (${demos.length} demos)` : "Usage"}
				>
					<CodeViewer files={demos} />
				</Section>
			)}

			<Section title="Props">
				<PropsTable props={entry.props} />
			</Section>

			{item && (
				<Section title="Source">
					<CodeViewer files={item.files} />
				</Section>
			)}

			<Section title="Inspiration & attribution">
				{entry.inspiration ? (
					<div className="rounded-lg border bg-muted/20 p-4">
						<dl className="grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[auto_1fr]">
							{entry.inspiration.source && (
								<>
									<dt className="text-muted-foreground">Source</dt>
									<dd className="font-medium">{entry.inspiration.source}</dd>
								</>
							)}
							{entry.inspiration.author && (
								<>
									<dt className="text-muted-foreground">Author</dt>
									<dd>
										{entry.inspiration.authorUrl ? (
											<a
												href={entry.inspiration.authorUrl}
												target="_blank"
												rel="noreferrer noopener"
												className="inline-flex items-center gap-1 underline underline-offset-2"
											>
												{entry.inspiration.author}
												<ExternalLink className="size-3" aria-hidden />
											</a>
										) : (
											entry.inspiration.author
										)}
									</dd>
								</>
							)}
							<dt className="text-muted-foreground">Relationship</dt>
							<dd className="capitalize">
								{entry.inspiration.relationship.replace(/-/g, " ")}
							</dd>
							{entry.inspiration.url && (
								<>
									<dt className="text-muted-foreground">Original</dt>
									<dd>
										<a
											href={entry.inspiration.url}
											target="_blank"
											rel="noreferrer noopener"
											className="inline-flex items-center gap-1 break-all underline underline-offset-2"
										>
											{entry.inspiration.url}
											<ExternalLink className="size-3 shrink-0" aria-hidden />
										</a>
									</dd>
								</>
							)}
							{entry.inspiration.note && (
								<>
									<dt className="text-muted-foreground">Note</dt>
									<dd>{entry.inspiration.note}</dd>
								</>
							)}
						</dl>
					</div>
				) : (
					<div className="rounded-lg border border-dashed p-4">
						<p className="text-sm text-muted-foreground">
							No source recorded for this component. If it was adapted from another
							library, add an{" "}
							<code className="rounded bg-muted px-1 py-0.5 text-xs">inspiration</code>{" "}
							block to{" "}
							<code className="rounded bg-muted px-1 py-0.5 text-xs">
								registry/components/{slug}/meta.ts
							</code>
							.
						</p>
					</div>
				)}
				<p className="mt-3 text-xs text-muted-foreground">
					Many components here are adaptations of designs from across the web. We credit
					the original authors where we know them — if something is miscredited or
					missing, it should be corrected in that component&apos;s{" "}
					<code className="rounded bg-muted px-1 py-0.5">meta.ts</code>.
				</p>
			</Section>

			<nav className="mt-10 flex items-center justify-between gap-4 border-t pt-6 text-sm">
				{previous ? (
					<Link
						href={`/library/${previous.slug}`}
						className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-foreground"
					>
						<ArrowLeft className="size-3.5" aria-hidden />
						{previous.title}
					</Link>
				) : (
					<span />
				)}
				{next ? (
					<Link
						href={`/library/${next.slug}`}
						className="inline-flex items-center gap-1.5 text-right text-muted-foreground hover:text-foreground"
					>
						{next.title}
						<ArrowRight className="size-3.5" aria-hidden />
					</Link>
				) : (
					<span />
				)}
			</nav>
		</div>
	);
}

function Section({
	title,
	children,
}: {
	title: string;
	children: React.ReactNode;
}) {
	return (
		<section className="mb-8">
			<h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
				{title}
			</h2>
			{children}
		</section>
	);
}

/**
 * A short instruction an agent can act on directly, as opposed to the full
 * markdown page. Keeps the install command first because that is the step that
 * resolves the target project's own aliases.
 */
function buildAgentPrompt(entry: {
	title: string;
	slug: string;
	registryUrl: string;
	importPath: string;
	dependencies: string[];
	gated?: boolean;
}): string {
	if (entry.gated) {
		return [
			`Add the "${entry.title}" component to this project.`,
			"",
			"This component is licensed for internal use only and is not in the public registry. Copy the source from the detail page rather than running shadcn add.",
			"",
			`Import it with: import ${toIdentifier(entry.slug)} from "${entry.importPath}";`,
		].join("\n");
	}

	const lines = [
		`Add the "${entry.title}" component to this project.`,
		"",
		"1. Run:",
		`   npx shadcn@latest add ${entry.registryUrl}`,
		"   This writes the component and rewrites its imports to match this project's components.json aliases — do not hand-edit where `cn` is imported from.",
		"",
	];

	if (entry.dependencies.length) {
		lines.push(
			`2. Make sure these npm packages are installed: ${entry.dependencies.join(", ")}.`,
			""
		);
	}

	lines.push(
		`${entry.dependencies.length ? "3" : "2"}. Import it with: import ${toIdentifier(entry.slug)} from "${entry.importPath}";`,
		"",
		`Full documentation, props and source: https://components.drivedev.net/docs/${entry.slug}.md`
	);

	return lines.join("\n");
}

function toIdentifier(slug: string): string {
	const pascal = slug
		.split("-")
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join("");
	return /^\d/.test(pascal) ? `Component${pascal}` : pascal;
}
