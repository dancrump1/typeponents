"use client";

import { useState } from "react";

import { PACKAGE_MANAGERS, type PackageManager } from "@/lib/registry-shared";
import { cn } from "@/lib/utils";

import { CopyButton } from "./copy-button";

/**
 * Install command with package-manager tabs. The command is the shadcn CLI,
 * which rewrites imports to match the *target* project's `components.json` —
 * that's what makes these components drop into any repo without hand-editing
 * where `cn` comes from.
 */
export function InstallTabs({ registryUrl }: { registryUrl: string }) {
	const [pm, setPm] = useState<PackageManager>("npm");

	const command = commandFor(pm, registryUrl);

	return (
		<div className="overflow-hidden rounded-lg border">
			<div className="flex items-center justify-between border-b bg-muted/40 px-2 py-1">
				<div className="flex items-center gap-0.5">
					{PACKAGE_MANAGERS.map((manager) => (
						<button
							key={manager}
							type="button"
							onClick={() => setPm(manager)}
							className={cn(
								"rounded px-2 py-1 text-xs transition-colors",
								pm === manager
									? "bg-background font-medium text-foreground shadow-sm"
									: "text-muted-foreground hover:text-foreground"
							)}
						>
							{manager}
						</button>
					))}
				</div>
				<CopyButton value={command} variant="ghost" size="icon" />
			</div>
			<pre className="overflow-x-auto px-3 py-2.5 text-xs">
				<code>{command}</code>
			</pre>
		</div>
	);
}

function commandFor(pm: PackageManager, registryUrl: string): string {
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
