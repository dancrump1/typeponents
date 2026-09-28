import { cookies } from "next/headers";

import { GATE_COOKIE, gatedSlugSet, isValidGateCookie } from "@/lib/gate";

export async function isLibraryUnlocked(): Promise<boolean> {
	const store = await cookies();
	return isValidGateCookie(
		store.get(GATE_COOKIE)?.value,
		process.env.GATED_LIBRARY_PASSWORD
	);
}

export async function canReadSlug(slug: string): Promise<boolean> {
	if (!gatedSlugSet.has(slug)) return true;
	return isLibraryUnlocked();
}
