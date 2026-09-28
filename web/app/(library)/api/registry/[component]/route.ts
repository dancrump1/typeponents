import { NextResponse, type NextRequest } from "next/server";

import { canReadSlug } from "@/lib/gate-server";
import { catalogBySlug, readRegistryItem } from "@/lib/registry";

/**
 * Plain-text source for one component. Returns the primary file by default;
 * `?file=<consumer path>` selects any other file the install would write.
 */
export async function GET(
	request: NextRequest,
	{ params }: { params: Promise<{ component: string }> }
) {
	const { component } = await params;
	const slug = component.replace(/[^a-zA-Z0-9_-]/g, "").toLowerCase();

	if (!catalogBySlug.has(slug) || !(await canReadSlug(slug))) {
		return NextResponse.json({ error: "Component not found." }, { status: 404 });
	}

	const item = readRegistryItem(slug);
	if (!item?.files.length) {
		return NextResponse.json(
			{ error: "No built source for this component. Run `npm run registry:build`." },
			{ status: 404 }
		);
	}

	const requested = request.nextUrl.searchParams.get("file");
	const file = requested
		? item.files.find((f) => f.path === requested)
		: item.files[0];

	if (!file) {
		return NextResponse.json(
			{ error: "File not found.", available: item.files.map((f) => f.path) },
			{ status: 404 }
		);
	}

	return new NextResponse(file.content, {
		status: 200,
		headers: { "Content-Type": "text/plain; charset=utf-8" },
	});
}
