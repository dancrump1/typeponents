/**
 * Node can enable experimental `globalThis.localStorage` via `--localstorage-file`.
 * If that flag is wrong or empty, the object may exist without working getItem/setItem,
 * which breaks SSR and libraries that probe localStorage (e.g. nuqs debug helper).
 */
export async function register() {
	if (process.env.NEXT_RUNTIME !== "nodejs") return;

	for (const key of ["localStorage", "sessionStorage"] as const) {
		const storage = (globalThis as unknown as Record<string, unknown>)[key] as
			| Storage
			| undefined;
		if (
			storage != null &&
			(typeof storage.getItem !== "function" ||
				typeof storage.setItem !== "function")
		) {
			try {
				Reflect.deleteProperty(globalThis, key);
			} catch {
				/* non-configurable — nothing safe to do */
			}
		}
	}
}
