"use server";

import { isLibraryUnlocked } from "@/lib/gate-server";
import {
	importRegistryItem,
	parseCategory,
	parseRegistryUrl,
	parseSlug,
	republishSite,
	type IntakeResult,
} from "@/lib/intake-job";

export async function submitIntake(
	_prev: IntakeResult | null,
	formData: FormData
): Promise<IntakeResult> {
	if (!(await isLibraryUnlocked())) {
		return {
			ok: false,
			error: "Unlock the library before importing a component.",
			log: "",
		};
	}

	const url = parseRegistryUrl(String(formData.get("url") ?? ""));
	if (!url) {
		return {
			ok: false,
			error: "Paste a registry item URL, including https://.",
			log: "",
		};
	}

	const category = parseCategory(String(formData.get("category") ?? ""));
	if (!category) {
		return { ok: false, error: "Choose a category.", log: "" };
	}

	const slug = parseSlug(String(formData.get("slug") ?? ""));
	if (slug === null) {
		return {
			ok: false,
			error: "A slug is lowercase words separated by hyphens.",
			log: "",
		};
	}

	try {
		return await importRegistryItem({ url, category, slug });
	} catch (error) {
		return {
			ok: false,
			error: error instanceof Error ? error.message : "Import failed.",
			log: "",
		};
	}
}

export async function retryPublish(): Promise<{ ok: true } | { ok: false; error: string }> {
	if (!(await isLibraryUnlocked())) {
		return { ok: false, error: "Unlock the library before publishing." };
	}
	try {
		republishSite();
		return { ok: true };
	} catch (error) {
		return {
			ok: false,
			error: error instanceof Error ? error.message : "Could not start the rebuild.",
		};
	}
}
