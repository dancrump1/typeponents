import { spawnSync } from "node:child_process";

export function runShadcnAdd(registryItemUrl: string): {
	ok: boolean;
	stdout: string;
	stderr: string;
	exitCode: number | null;
} {
	const result = spawnSync("npx", ["shadcn@latest", "add", registryItemUrl, "-y"], {
		cwd: process.cwd(),
		encoding: "utf-8",
		shell: process.platform === "win32",
		stdio: ["ignore", "pipe", "pipe"],
	});

	return {
		ok: result.status === 0,
		stdout: result.stdout ?? "",
		stderr: result.stderr ?? "",
		exitCode: result.status,
	};
}
