"use client";

import { useActionState, useEffect, useState } from "react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { IntakeResult, PublishStatus } from "@/lib/intake-job";
import { CATEGORIES } from "@/registry/schema";

import { retryPublish, submitIntake } from "./actions";

const fieldClass =
	"flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm ring-offset-background focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50";

export function IntakeForm({
	initialPublish,
}: {
	initialPublish: PublishStatus;
}) {
	const [result, action, pending] = useActionState<IntakeResult | null, FormData>(
		submitIntake,
		null
	);
	const [publish, setPublish] = useState(initialPublish);
	const [seenResult, setSeenResult] = useState<IntakeResult | null>(null);
	const [retryError, setRetryError] = useState<string | null>(null);
	const [retrying, setRetrying] = useState(false);

	if (result !== seenResult) {
		setSeenResult(result);
		if (result?.ok && result.restart !== "dev") {
			setPublish({ state: "running" });
		}
	}

	useEffect(() => {
		if (publish.state !== "running") return;
		let cancelled = false;

		async function poll() {
			try {
				const response = await fetch("/library/intake/status", { cache: "no-store" });
				if (!response.ok) return;
				const next = (await response.json()) as PublishStatus;
				if (!cancelled && next.state !== "idle") setPublish(next);
			} catch {
				// The site restarts when a hosted rebuild finishes. Keep polling.
			}
		}

		const timer = setInterval(poll, 3000);
		void poll();
		return () => {
			cancelled = true;
			clearInterval(timer);
		};
	}, [publish.state]);

	async function onRetry() {
		setRetrying(true);
		setRetryError(null);
		const outcome = await retryPublish();
		setRetrying(false);
		if (!outcome.ok) {
			setRetryError(outcome.error);
			return;
		}
		setPublish({ state: "running" });
	}

	return (
		<div className="space-y-8">
			<form action={action} className="space-y-4">
				<div className="space-y-2">
					<Label htmlFor="url">Registry URL</Label>
					<Input
						id="url"
						name="url"
						type="url"
						required
						placeholder="https://ui.aceternity.com/r/3d-card.json"
						autoFocus
					/>
					<p className="text-xs text-muted-foreground">
						The installable JSON for one component, the same URL{" "}
						<code className="text-foreground">registry:intake</code> accepts.
					</p>
				</div>

				<div className="space-y-2">
					<Label htmlFor="category">Category</Label>
					<select
						id="category"
						name="category"
						required
						defaultValue=""
						className={fieldClass}
					>
						<option value="" disabled>
							Choose a category
						</option>
						{CATEGORIES.map((category) => (
							<option key={category} value={category}>
								{category === "Uncategorized" ? "Not sure yet" : category}
							</option>
						))}
					</select>
				</div>

				<details className="text-sm">
					<summary className="cursor-pointer text-muted-foreground">
						Optional slug
					</summary>
					<div className="mt-3 space-y-2">
						<Label htmlFor="slug">Slug</Label>
						<Input
							id="slug"
							name="slug"
							placeholder="vinyl-album-card"
							pattern="[a-z0-9]+(-[a-z0-9]+)*"
						/>
					</div>
				</details>

				{result && !result.ok ? (
					<p className="text-sm text-destructive">{result.error}</p>
				) : null}

				<Button type="submit" disabled={pending} className="w-full">
					{pending ? "Importing…" : "Import component"}
				</Button>
			</form>

			{result?.ok ? (
				<Result result={result} publish={publish} />
			) : publish.state === "running" ? (
				<p className="rounded-md border px-4 py-3 text-sm text-muted-foreground">
					A site rebuild is already running. The library updates when it finishes
					and the server restarts.
				</p>
			) : null}

			{publish.state === "error" ? (
				<div className="space-y-3">
					{retryError ? (
						<p className="text-sm text-destructive">{retryError}</p>
					) : null}
					<Button
						type="button"
						variant="outline"
						disabled={retrying}
						onClick={onRetry}
					>
						{retrying ? "Starting…" : "Try the site rebuild again"}
					</Button>
				</div>
			) : null}

			{result?.log ? <Log log={result.log} /> : null}
			{publish.log && result?.ok && result.restart !== "dev" ? (
				<Log log={publish.log} title="Site rebuild" />
			) : null}
		</div>
	);
}

function Result({
	result,
	publish,
}: {
	result: Extract<IntakeResult, { ok: true }>;
	publish: PublishStatus;
}) {
	if (result.restart === "dev") {
		return (
			<div className="space-y-2 rounded-md border px-4 py-3 text-sm">
				<p>
					Imported{" "}
					<Link href={`/library/${result.slug}`} className="font-medium underline">
						{result.slug}
					</Link>
					. The dev server recompiles the catalog from the new files, so this
					machine does not need a separate production build.
				</p>
			</div>
		);
	}

	const href = `/library/${result.slug}`;

	if (publish.state === "error") {
		return (
			<div className="space-y-2 rounded-md border border-destructive/40 px-4 py-3 text-sm">
				<p>
					<code>{result.slug}</code> was saved, but the live site was not updated.
				</p>
				<p className="text-destructive">{publish.error}</p>
			</div>
		);
	}

	if (publish.state === "ready") {
		return (
			<div className="space-y-2 rounded-md border px-4 py-3 text-sm">
				<p>
					{result.restart === "automatic"
						? "Rebuild finished. The site is restarting so the new preview can load."
						: "Rebuild finished. This process cannot swap in the new build. Stop it and start the site with npm run host from the web folder."}
				</p>
				<p>
					Then open{" "}
					<Link href={href} className="font-medium underline">
						{result.slug}
					</Link>
					.
				</p>
			</div>
		);
	}

	return (
		<div className="space-y-2 rounded-md border px-4 py-3 text-sm">
			<p>
				Imported <code>{result.slug}</code>. This server is serving a compiled
				site, so the catalog and preview stay on the previous version until Next
				rebuilds and the process restarts.
			</p>
			<p className="text-muted-foreground">
				{publish.state === "running"
					? "Rebuilding the site now. This usually takes a few minutes."
					: "Starting the site rebuild."}
				{result.restart === "manual"
					? " When it finishes, stop this server and start it again with npm run host from the web folder so the new build is what designers see."
					: " The site will restart itself when the build finishes."}
			</p>
		</div>
	);
}

function Log({ log, title = "Import log" }: { log: string; title?: string }) {
	return (
		<details className="text-sm">
			<summary className="cursor-pointer text-muted-foreground">{title}</summary>
			<pre className="mt-3 max-h-80 overflow-auto rounded-md border bg-muted/40 p-3 text-xs whitespace-pre-wrap">
				{log}
			</pre>
		</details>
	);
}
