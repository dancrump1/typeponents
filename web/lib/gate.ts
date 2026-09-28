import { gatedSlugs } from "@/registry/__generated__/gated";

/** httpOnly cookie set after a successful unlock. */
export const GATE_COOKIE = "library-gate";

export const gatedSlugSet = new Set<string>(gatedSlugs);

const GATE_PREFIX = "library-gate.v1:";

function bytesToHex(buffer: ArrayBuffer): string {
	return [...new Uint8Array(buffer)]
		.map((byte) => byte.toString(16).padStart(2, "0"))
		.join("");
}

function timingSafeEqual(a: string, b: string): boolean {
	if (a.length !== b.length) return false;
	let out = 0;
	for (let i = 0; i < a.length; i++) {
		out |= a.charCodeAt(i) ^ b.charCodeAt(i);
	}
	return out === 0;
}

/** Stable token derived from the password; this is what the cookie stores. */
export async function gateToken(password: string): Promise<string> {
	const data = new TextEncoder().encode(`${GATE_PREFIX}${password}`);
	const digest = await crypto.subtle.digest("SHA-256", data);
	return bytesToHex(digest);
}

export async function isValidGateCookie(
	cookie: string | undefined,
	password: string | undefined
): Promise<boolean> {
	if (!cookie || !password) return false;
	return timingSafeEqual(cookie, await gateToken(password));
}

/**
 * If this request path is a gated component (detail page, install JSON, agent
 * doc, or source API), return its slug; otherwise null.
 */
export function gatedSlugFromPath(pathname: string): string | null {
	const match =
		pathname.match(/^\/library\/([a-z0-9]+(?:-[a-z0-9]+)*)$/) ??
		pathname.match(/^\/r\/([a-z0-9]+(?:-[a-z0-9]+)*)\.json$/) ??
		pathname.match(/^\/docs\/([a-z0-9]+(?:-[a-z0-9]+)*)\.md$/) ??
		pathname.match(/^\/registry\/([a-z0-9]+(?:-[a-z0-9]+)*?)(?:\.json)?$/) ??
		pathname.match(/^\/api\/registry\/([a-z0-9]+(?:-[a-z0-9]+)*)$/);

	if (!match) return null;
	const slug = match[1];
	if (slug === "unlock") return null;
	return gatedSlugSet.has(slug) ? slug : null;
}

/** Reject open redirects; only same-origin library paths are allowed. */
export function safeNextPath(raw: unknown): string {
	if (typeof raw !== "string") return "/library";
	if (!raw.startsWith("/") || raw.startsWith("//") || raw.includes("://")) {
		return "/library";
	}
	return raw;
}
