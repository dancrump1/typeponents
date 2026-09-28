import { promises as fs } from "node:fs";
import path from "node:path";

import { NextResponse } from "next/server";

import { canReadSlug } from "@/lib/gate-server";
import { visibleCatalog } from "@/lib/registry";

/**
 * Serves the built registry item for `shadcn add`.
 *
 * Public components are read from public/r/<name>.json. License-gated
 * components live under registry/__generated__/private and 404 unless the
 * request carries the unlock cookie.
 */
export function generateStaticParams() {
	return visibleCatalog.map((entry) => ({ name: entry.slug }));
}

export async function GET(
	_request: Request,
	{ params }: { params: Promise<{ name: string }> }
) {
	const { name } = await params;
	const slug = name.replace(/\.json$/, "").replace(/[^a-zA-Z0-9_-]/g, "");

	if (!(await canReadSlug(slug))) {
		return NextResponse.json({ error: "Component not found." }, { status: 404 });
	}

	const publicPath = path.join(process.cwd(), "public", "r", `${slug}.json`);
	const privatePath = path.join(
		process.cwd(),
		"registry",
		"__generated__",
		"private",
		"r",
		`${slug}.json`
	);

	try {
		const raw = await fs
			.readFile(publicPath, "utf8")
			.catch(() => fs.readFile(privatePath, "utf8"));
		return new NextResponse(raw, {
			status: 200,
			headers: { "Content-Type": "application/json" },
		});
	} catch {
		return NextResponse.json(
			{
				error: "Component not found.",
				hint: "Run `npm run registry:build` to regenerate public/r/.",
			},
			{ status: 404 }
		);
	}
}
