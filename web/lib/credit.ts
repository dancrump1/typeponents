/** Short, readable label for a credit URL — e.g. "fancycomponents.dev". */
export function creditLabel(url: string) {
	try {
		return new URL(url).hostname.replace(/^www\./, "");
	} catch {
		return url.replace(/^https?:\/\//, "").replace(/^www\./, "");
	}
}

/** Stable group key for a credited source (person or design site). */
export function creditEngineerKey(url: string) {
	try {
		const parsed = new URL(url);
		const host = parsed.hostname.replace(/^www\./, "");

		if (host === "github.com") {
			const [user] = parsed.pathname.split("/").filter(Boolean);
			if (user) return `github:${user.toLowerCase()}`;
		}

		if (host === "codepen.io") {
			const [user] = parsed.pathname.split("/").filter(Boolean);
			if (user) return `codepen:${user.toLowerCase()}`;
		}

		return host;
	} catch {
		return url;
	}
}

/** Human-readable name for a credited design engineer or source. */
export function creditEngineerLabel(url: string) {
	try {
		const parsed = new URL(url);
		const host = parsed.hostname.replace(/^www\./, "");

		if (host === "github.com" || host === "codepen.io") {
			const [user] = parsed.pathname.split("/").filter(Boolean);
			if (user) return user;
		}

		return creditLabel(url);
	} catch {
		return creditLabel(url);
	}
}
