"use client";

import { useEffect, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";
import { useRouter } from "next/navigation";
import { Pencil } from "lucide-react";

import { authorizeEdit } from "@/app/(library)/library/unlock/actions";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { CATEGORIES } from "@/registry/schema";
import type { CatalogEntry } from "@/registry/types";
import type { StoredComponent } from "@/lib/stored-component";

const STATUSES = ["stable", "needs-review", "draft"] as const;
const RELATIONSHIPS = ["port", "adaptation", "inspired-by", "original"] as const;

type PropDraft = {
	name: string;
	type: string;
	defaultValue: string;
	description: string;
	required: boolean;
};

type Draft = {
	title: string;
	description: string;
	interaction: string;
	primaryCategory: string;
	categories: string[];
	tags: string;
	status: (typeof STATUSES)[number];
	rating: string;
	hidden: boolean;
	gated: boolean;
	heavy: boolean;
	fullscreen: boolean;
	clientOnly: boolean;
	source: string;
	url: string;
	author: string;
	authorUrl: string;
	relationship: (typeof RELATIONSHIPS)[number];
	note: string;
	license: string;
	dependencies: string;
	registryDependencies: string;
	importPath: string;
	registryUrl: string;
	files: string;
	props: PropDraft[];
};

export function EditComponentButton({
	entry,
	appearance = "card",
	canEdit = false,
}: {
	entry: CatalogEntry;
	appearance?: "card" | "page";
	/** True when this session already passed the library password. */
	canEdit?: boolean;
}) {
	const router = useRouter();
	const [open, setOpen] = useState(false);
	const [authorized, setAuthorized] = useState(canEdit);
	const [password, setPassword] = useState("");
	const [checking, setChecking] = useState(false);
	const [draft, setDraft] = useState<Draft>(() => draftFromEntry(entry));
	const [loading, setLoading] = useState(false);
	const [saving, setSaving] = useState(false);
	const [canSave, setCanSave] = useState(false);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		setAuthorized(canEdit);
	}, [canEdit]);

	useEffect(() => {
		if (!open || !authorized) return;
		const controller = new AbortController();
		setLoading(true);
		setError(null);
		setCanSave(false);
		setDraft(draftFromEntry(entry));

		fetch(`/api/components/${encodeURIComponent(entry.slug)}`, {
			signal: controller.signal,
		})
			.then(async (response) => {
				if (!response.ok) throw new Error(await readError(response));
				return (await response.json()) as StoredComponent;
			})
			.then((stored) => {
				setDraft(draftFromStored(stored, entry));
				setCanSave(true);
			})
			.catch((reason: unknown) => {
				if (controller.signal.aborted) return;
				setError(
					reason instanceof Error
						? reason.message
						: "Could not load this component from the database."
				);
			})
			.finally(() => {
				if (!controller.signal.aborted) setLoading(false);
			});

		return () => controller.abort();
	}, [open, authorized, entry]);

	const save = async () => {
		setSaving(true);
		setError(null);
		try {
			const response = await fetch(`/api/components/${encodeURIComponent(entry.slug)}`, {
				method: "PATCH",
				headers: { "content-type": "application/json" },
				body: JSON.stringify(toPayload(draft)),
			});
			if (response.status === 401) {
				setAuthorized(false);
				setError("Enter the library password before editing.");
				return;
			}
			if (!response.ok) throw new Error(await readError(response));
			setOpen(false);
			router.refresh();
		} catch (reason) {
			setError(reason instanceof Error ? reason.message : "Save failed");
		} finally {
			setSaving(false);
		}
	};

	return (
		<>
			{appearance === "page" ? (
				<Button
					type="button"
					variant="outline"
					size="sm"
					className="h-8 gap-1.5 text-xs"
					onClick={() => setOpen(true)}
				>
					<Pencil className="size-3.5" aria-hidden />
					Edit
				</Button>
			) : (
				<Button
					type="button"
					variant="outline"
					size="sm"
					className="h-7 gap-1 px-2 text-[11px]"
					aria-label={`Edit ${entry.title}`}
					onClick={() => setOpen(true)}
				>
					<Pencil className="size-3" aria-hidden />
					Edit
				</Button>
			)}

			<Dialog
				open={open}
				onOpenChange={(next) => {
					setOpen(next);
					if (!next) {
						setPassword("");
						setError(null);
					}
				}}
			>
				<DialogContent
					className={
						authorized
							? "max-h-[90vh] max-w-3xl overflow-y-auto"
							: "max-w-md"
					}
				>
					{authorized ? (
						<EditorHeader slug={entry.slug} />
					) : (
						<DialogHeader>
							<DialogTitle>Unlock editing</DialogTitle>
							<DialogDescription>
								Enter the library password to change component records.
							</DialogDescription>
						</DialogHeader>
					)}

					{error ? (
						<p className="rounded-md border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
							{error}
						</p>
					) : null}

					{authorized ? null : (
						<form
							className="grid gap-3"
							onSubmit={(event) => {
								event.preventDefault();
								setChecking(true);
								setError(null);
								void authorizeEdit(password)
									.then((result) => {
										if (result?.error) {
											setError(result.error);
											return;
										}
										setPassword("");
										setAuthorized(true);
										router.refresh();
									})
									.catch(() => {
										setError("Could not check that password.");
									})
									.finally(() => {
										setChecking(false);
									});
							}}
						>
							<label className="grid gap-1.5 text-xs font-medium" htmlFor={`edit-password-${entry.slug}`}>
								Password
								<Input
									id={`edit-password-${entry.slug}`}
									type="password"
									autoComplete="current-password"
									autoFocus
									required
									value={password}
									onChange={(event) => setPassword(event.target.value)}
								/>
							</label>
							<DialogFooter>
								<Button
									type="button"
									variant="outline"
									onClick={() => setOpen(false)}
									disabled={checking}
								>
									Cancel
								</Button>
								<Button type="submit" disabled={checking || password.length === 0}>
									{checking ? "Checking…" : "Unlock"}
								</Button>
							</DialogFooter>
						</form>
					)}

					{authorized ? (
					<fieldset disabled={loading || !canSave} className="grid gap-6">
						<section className="grid gap-3">
							<h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
								Details
							</h3>
							<Field label="Title">
								<Input
									value={draft.title}
									onChange={(event) =>
										setDraft({ ...draft, title: event.target.value })
									}
								/>
							</Field>
							<Field label="Description">
								<Textarea
									value={draft.description}
									onChange={(event) =>
										setDraft({ ...draft, description: event.target.value })
									}
								/>
							</Field>
							<Field label="Interaction">
								<Textarea
									value={draft.interaction}
									onChange={(event) =>
										setDraft({ ...draft, interaction: event.target.value })
									}
								/>
							</Field>
							<div className="grid gap-3 sm:grid-cols-2">
								<Field label="Status">
									<select
										className={selectClass}
										value={draft.status}
										onChange={(event) =>
											setDraft({
												...draft,
												status: event.target.value as Draft["status"],
											})
										}
									>
										{STATUSES.map((status) => (
											<option key={status} value={status}>
												{status}
											</option>
										))}
									</select>
								</Field>
								<Field label="Rating (1–10)">
									<Input
										type="number"
										min={1}
										max={10}
										step={1}
										value={draft.rating}
										onChange={(event) =>
											setDraft({ ...draft, rating: event.target.value })
										}
									/>
								</Field>
							</div>
							<div className="flex flex-wrap gap-6">
								<Toggle
									label="Hidden"
									checked={draft.hidden}
									onCheckedChange={(hidden) => setDraft({ ...draft, hidden })}
								/>
								<Toggle
									label="Gated"
									checked={draft.gated}
									onCheckedChange={(gated) => setDraft({ ...draft, gated })}
								/>
							</div>
						</section>

						<section className="grid gap-3">
							<h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
								Categories
							</h3>
							<Field label="Primary category">
								<select
									className={selectClass}
									value={draft.primaryCategory}
									onChange={(event) => {
										const primaryCategory = event.target.value;
										setDraft({
											...draft,
											primaryCategory,
											categories: draft.categories.includes(primaryCategory)
												? draft.categories
												: [...draft.categories, primaryCategory],
										});
									}}
								>
									{primaryOptions(draft).map((category) => (
										<option key={category} value={category}>
											{category}
										</option>
									))}
								</select>
							</Field>
							<ul className="grid gap-1.5 sm:grid-cols-2">
								{CATEGORIES.map((category) => {
									const checked =
										draft.categories.includes(category) ||
										draft.primaryCategory === category;
									return (
										<li key={category}>
											<label className="flex items-center gap-2 text-sm">
												<input
													type="checkbox"
													className="size-3.5"
													checked={checked}
													onChange={() => toggleCategory(setDraft, draft, category)}
												/>
												{category}
											</label>
										</li>
									);
								})}
							</ul>
							<Field label="Tags (one per line)">
								<Textarea
									value={draft.tags}
									onChange={(event) =>
										setDraft({ ...draft, tags: event.target.value })
									}
								/>
							</Field>
						</section>

						<section className="grid gap-3">
							<h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
								Preview risk
							</h3>
							<div className="flex flex-wrap gap-6">
								<Toggle
									label="Heavy"
									checked={draft.heavy}
									onCheckedChange={(heavy) => setDraft({ ...draft, heavy })}
								/>
								<Toggle
									label="Fullscreen"
									checked={draft.fullscreen}
									onCheckedChange={(fullscreen) =>
										setDraft({ ...draft, fullscreen })
									}
								/>
								<Toggle
									label="Client only"
									checked={draft.clientOnly}
									onCheckedChange={(clientOnly) =>
										setDraft({ ...draft, clientOnly })
									}
								/>
							</div>
						</section>

						<section className="grid gap-3">
							<h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
								Inspiration
							</h3>
							<div className="grid gap-3 sm:grid-cols-2">
								<Field label="Source">
									<Input
										value={draft.source}
										onChange={(event) =>
											setDraft({ ...draft, source: event.target.value })
										}
									/>
								</Field>
								<Field label="Relationship">
									<select
										className={selectClass}
										value={draft.relationship}
										onChange={(event) =>
											setDraft({
												...draft,
												relationship: event.target
													.value as Draft["relationship"],
											})
										}
									>
										{RELATIONSHIPS.map((relationship) => (
											<option key={relationship} value={relationship}>
												{relationship}
											</option>
										))}
									</select>
								</Field>
								<Field label="URL">
									<Input
										value={draft.url}
										onChange={(event) =>
											setDraft({ ...draft, url: event.target.value })
										}
									/>
								</Field>
								<Field label="Author">
									<Input
										value={draft.author}
										onChange={(event) =>
											setDraft({ ...draft, author: event.target.value })
										}
									/>
								</Field>
								<Field label="Author URL">
									<Input
										value={draft.authorUrl}
										onChange={(event) =>
											setDraft({ ...draft, authorUrl: event.target.value })
										}
									/>
								</Field>
								<Field label="License">
									<Input
										value={draft.license}
										onChange={(event) =>
											setDraft({ ...draft, license: event.target.value })
										}
									/>
								</Field>
							</div>
							<Field label="Note">
								<Textarea
									value={draft.note}
									onChange={(event) =>
										setDraft({ ...draft, note: event.target.value })
									}
								/>
							</Field>
						</section>

						<section className="grid gap-3">
							<h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
								Install
							</h3>
							<Field label="Import path">
								<Input
									value={draft.importPath}
									onChange={(event) =>
										setDraft({ ...draft, importPath: event.target.value })
									}
								/>
							</Field>
							<Field label="Registry URL">
								<Input
									value={draft.registryUrl}
									onChange={(event) =>
										setDraft({ ...draft, registryUrl: event.target.value })
									}
								/>
							</Field>
							<Field label="npm packages (one per line)">
								<Textarea
									value={draft.dependencies}
									onChange={(event) =>
										setDraft({ ...draft, dependencies: event.target.value })
									}
								/>
							</Field>
							<Field label="Registry dependencies (one per line)">
								<Textarea
									value={draft.registryDependencies}
									onChange={(event) =>
										setDraft({
											...draft,
											registryDependencies: event.target.value,
										})
									}
								/>
							</Field>
							<Field label="Installed files (one per line)">
								<Textarea
									value={draft.files}
									onChange={(event) =>
										setDraft({ ...draft, files: event.target.value })
									}
								/>
							</Field>
						</section>

						<section className="grid gap-3">
							<div className="flex items-center justify-between gap-3">
								<h3 className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
									Props
								</h3>
								<Button
									type="button"
									variant="outline"
									size="sm"
									className="h-7 text-xs"
									onClick={() =>
										setDraft({
											...draft,
											props: [
												...draft.props,
												{
													name: "",
													type: "",
													defaultValue: "",
													description: "",
													required: false,
												},
											],
										})
									}
								>
									Add prop
								</Button>
							</div>
							{draft.props.length === 0 ? (
								<p className="text-xs text-muted-foreground">No documented props.</p>
							) : (
								<ul className="grid gap-3">
									{draft.props.map((prop, index) => (
										<li
											key={index}
											className="grid gap-2 rounded-md border p-3"
										>
											<div className="grid gap-2 sm:grid-cols-2">
												<Field label="Name">
													<Input
														value={prop.name}
														onChange={(event) =>
															updateProp(setDraft, index, {
																name: event.target.value,
															})
														}
													/>
												</Field>
												<Field label="Type">
													<Input
														value={prop.type}
														onChange={(event) =>
															updateProp(setDraft, index, {
																type: event.target.value,
															})
														}
													/>
												</Field>
												<Field label="Default">
													<Input
														value={prop.defaultValue}
														onChange={(event) =>
															updateProp(setDraft, index, {
																defaultValue: event.target.value,
															})
														}
													/>
												</Field>
												<Field label="Description">
													<Input
														value={prop.description}
														onChange={(event) =>
															updateProp(setDraft, index, {
																description: event.target.value,
															})
														}
													/>
												</Field>
											</div>
											<div className="flex items-center justify-between">
												<Toggle
													label="Required"
													checked={prop.required}
													onCheckedChange={(required) =>
														updateProp(setDraft, index, { required })
													}
												/>
												<Button
													type="button"
													variant="ghost"
													size="sm"
													className="h-7 text-xs"
													onClick={() =>
														setDraft({
															...draft,
															props: draft.props.filter((_, item) => item !== index),
														})
													}
												>
													Remove
												</Button>
											</div>
										</li>
									))}
								</ul>
							)}
						</section>
					</fieldset>
					) : null}

					{authorized ? (
					<DialogFooter>
						<Button
							type="button"
							variant="outline"
							onClick={() => setOpen(false)}
							disabled={saving}
						>
							Cancel
						</Button>
						<Button type="button" onClick={save} disabled={!canSave || saving || loading}>
							{saving ? "Saving…" : "Save"}
						</Button>
					</DialogFooter>
					) : null}
				</DialogContent>
			</Dialog>
		</>
	);
}

function EditorHeader({ slug }: { slug: string }) {
	return (
		<DialogHeader>
			<DialogTitle>Edit {slug}</DialogTitle>
			<DialogDescription>
				Updates the component row in the library database. Registry source
				files are left unchanged.
			</DialogDescription>
		</DialogHeader>
	);
}

function primaryOptions(draft: Draft): string[] {
	const selected = new Set(draft.categories);
	selected.add(draft.primaryCategory);
	const known = CATEGORIES.filter((category) => selected.has(category));
	if (known.includes(draft.primaryCategory as (typeof CATEGORIES)[number])) {
		return known;
	}
	return [draft.primaryCategory, ...known];
}

function Field({
	label,
	children,
}: {
	label: string;
	children: ReactNode;
}) {
	return (
		<label className="grid gap-1.5 text-xs font-medium">
			<span>{label}</span>
			{children}
		</label>
	);
}

function Toggle({
	label,
	checked,
	onCheckedChange,
}: {
	label: string;
	checked: boolean;
	onCheckedChange: (checked: boolean) => void;
}) {
	return (
		<label className="flex items-center gap-2 text-sm">
			<Switch checked={checked} onCheckedChange={onCheckedChange} />
			{label}
		</label>
	);
}

const selectClass =
	"flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring";

function toggleCategory(
	setDraft: Dispatch<SetStateAction<Draft>>,
	draft: Draft,
	category: string
) {
	const selected = new Set(draft.categories);
	selected.add(draft.primaryCategory);
	if (selected.has(category)) {
		if (selected.size === 1) return;
		selected.delete(category);
	} else {
		selected.add(category);
	}
	const known = CATEGORIES.filter((item) => selected.has(item));
	const extras = [...selected].filter(
		(item) => !CATEGORIES.includes(item as (typeof CATEGORIES)[number])
	);
	const categories = [...extras, ...known];
	const primaryCategory = categories.includes(draft.primaryCategory)
		? draft.primaryCategory
		: categories[0];
	setDraft({ ...draft, categories, primaryCategory });
}

function updateProp(
	setDraft: Dispatch<SetStateAction<Draft>>,
	index: number,
	patch: Partial<PropDraft>
) {
	setDraft((current) => ({
		...current,
		props: current.props.map((prop, item) =>
			item === index ? { ...prop, ...patch } : prop
		),
	}));
}

function lines(value: string): string[] {
	return value
		.split("\n")
		.map((item) => item.trim())
		.filter((item) => item !== "");
}

function joinLines(values: string[] | undefined): string {
	return (values ?? []).join("\n");
}

function draftFromEntry(entry: CatalogEntry): Draft {
	return {
		title: entry.title,
		description: entry.description,
		interaction: entry.interaction,
		primaryCategory: entry.categories[0] ?? "Uncategorized",
		categories: entry.categories,
		tags: joinLines(entry.tags),
		status: entry.status,
		rating: String(entry.rating),
		hidden: entry.hidden,
		gated: entry.gated,
		heavy: entry.risk.heavy,
		fullscreen: entry.risk.fullscreen,
		clientOnly: entry.risk.clientOnly,
		source: entry.inspiration?.source ?? "",
		url: entry.inspiration?.url ?? "",
		author: entry.inspiration?.author ?? "",
		authorUrl: entry.inspiration?.authorUrl ?? "",
		relationship: entry.inspiration?.relationship ?? "inspired-by",
		note: entry.inspiration?.note ?? "",
		license: entry.inspiration?.license ?? "",
		dependencies: joinLines(entry.dependencies),
		registryDependencies: joinLines(entry.registryDependencies),
		importPath: entry.importPath,
		registryUrl: entry.registryUrl,
		files: joinLines(entry.files),
		props: entry.props.map((prop) => ({
			name: prop.name,
			type: prop.type,
			defaultValue: prop.default ?? "",
			description: prop.description,
			required: prop.required,
		})),
	};
}

function draftFromStored(stored: StoredComponent, entry: CatalogEntry): Draft {
	const categories =
		stored.categories?.length > 0 ? stored.categories : entry.categories;
	const relationship = RELATIONSHIPS.includes(
		stored.inspiration?.relationship as (typeof RELATIONSHIPS)[number]
	)
		? (stored.inspiration?.relationship as Draft["relationship"])
		: "inspired-by";

	return {
		...draftFromEntry(entry),
		title: stored.title,
		description: stored.description ?? "",
		interaction: stored.interaction ?? "",
		primaryCategory: stored.primaryCategory || categories[0],
		categories,
		tags: joinLines(stored.tags),
		status: stored.status,
		rating: String(stored.rating),
		hidden: stored.hidden,
		gated: stored.gated,
		heavy: Boolean(stored.risk?.heavy),
		fullscreen: Boolean(stored.risk?.fullscreen),
		clientOnly: Boolean(stored.risk?.clientOnly),
		source: stored.inspiration?.source ?? "",
		url: stored.inspiration?.url ?? "",
		author: stored.inspiration?.author ?? "",
		authorUrl: stored.inspiration?.authorUrl ?? "",
		relationship,
		note: stored.inspiration?.note ?? "",
		license: stored.inspiration?.license ?? "",
		dependencies: joinLines(stored.dependencies),
		registryDependencies: joinLines(stored.registryDependencies),
		importPath: stored.importPath,
		registryUrl: stored.registryUrl,
		files: joinLines(stored.files),
		props: (stored.props ?? []).map((prop) => ({
			name: prop.name,
			type: prop.type,
			defaultValue: prop.default ?? "",
			description: prop.description ?? "",
			required: Boolean(prop.required),
		})),
	};
}

function toPayload(draft: Draft) {
	const categories = [
		draft.primaryCategory,
		...draft.categories.filter((category) => category !== draft.primaryCategory),
	];
	const rating = Number.parseInt(draft.rating, 10);
	const props = draft.props
		.filter((prop) => prop.name.trim() || prop.type.trim())
		.map((prop) => ({
			name: prop.name.trim(),
			type: prop.type.trim(),
			description: prop.description,
			required: prop.required,
			...(prop.defaultValue.trim()
				? { default: prop.defaultValue.trim() }
				: {}),
		}));

	const inspirationFields = {
		source: draft.source.trim(),
		url: draft.url.trim(),
		author: draft.author.trim(),
		authorUrl: draft.authorUrl.trim(),
		note: draft.note.trim(),
		license: draft.license.trim(),
	};
	const hasInspiration = Object.values(inspirationFields).some(Boolean);

	return {
		title: draft.title.trim(),
		description: draft.description,
		interaction: draft.interaction,
		categories,
		tags: lines(draft.tags),
		status: draft.status,
		rating: Number.isNaN(rating) ? draft.rating : rating,
		hidden: draft.hidden,
		gated: draft.gated,
		risk: {
			heavy: draft.heavy,
			fullscreen: draft.fullscreen,
			clientOnly: draft.clientOnly,
		},
		inspiration: hasInspiration
			? {
					...(inspirationFields.source
						? { source: inspirationFields.source }
						: {}),
					...(inspirationFields.url ? { url: inspirationFields.url } : {}),
					...(inspirationFields.author
						? { author: inspirationFields.author }
						: {}),
					...(inspirationFields.authorUrl
						? { authorUrl: inspirationFields.authorUrl }
						: {}),
					relationship: draft.relationship,
					...(inspirationFields.note ? { note: inspirationFields.note } : {}),
					...(inspirationFields.license
						? { license: inspirationFields.license }
						: {}),
				}
			: null,
		dependencies: lines(draft.dependencies),
		registryDependencies: lines(draft.registryDependencies),
		importPath: draft.importPath.trim(),
		registryUrl: draft.registryUrl.trim(),
		files: lines(draft.files),
		props,
	};
}

async function readError(response: Response): Promise<string> {
	try {
		const body = (await response.json()) as { message?: unknown };
		if (typeof body.message === "string") return body.message;
		if (Array.isArray(body.message)) return body.message.join(", ");
	} catch {
		// Fall through to the status line.
	}
	if (response.status === 404) {
		return "This component is not in the database yet. Run npm run seed, then try again.";
	}
	return `Request failed (${response.status})`;
}
