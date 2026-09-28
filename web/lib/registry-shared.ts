/**
 * Registry helpers that are safe in both server and client components.
 * Anything touching the filesystem belongs in `lib/registry.ts` instead.
 */

export const PACKAGE_MANAGERS = ["pnpm", "npm", "yarn", "bun"] as const;
export type PackageManager = (typeof PACKAGE_MANAGERS)[number];

export function installCommand(pm: PackageManager, registryUrl: string): string {
	switch (pm) {
		case "pnpm":
			return `pnpm dlx shadcn@latest add ${registryUrl}`;
		case "yarn":
			return `yarn dlx shadcn@latest add ${registryUrl}`;
		case "bun":
			return `bunx shadcn@latest add ${registryUrl}`;
		default:
			return `npx shadcn@latest add ${registryUrl}`;
	}
}

/** Human label for a bare hostname or library name. */
export function sourceLabel(value: string): string {
	return value.replace(/^https?:\/\//, "").replace(/^www\./, "");
}
