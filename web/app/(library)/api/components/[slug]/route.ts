import { NextResponse } from "next/server";

function apiBase(): string {
	return (
		process.env.API_URL ??
		process.env.NEXT_PUBLIC_API_URL ??
		"http://localhost:3000"
	);
}

type RouteContext = { params: Promise<{ slug: string }> };

export async function GET(_request: Request, context: RouteContext) {
	const { slug } = await context.params;
	return proxy(slug, { method: "GET" });
}

export async function PATCH(request: Request, context: RouteContext) {
	const { slug } = await context.params;
	const body = await request.text();
	return proxy(slug, {
		method: "PATCH",
		headers: { "content-type": "application/json" },
		body,
	});
}

async function proxy(slug: string, init: RequestInit) {
	try {
		const response = await fetch(
			`${apiBase()}/components/${encodeURIComponent(slug)}`,
			{ ...init, cache: "no-store" }
		);
		const text = await response.text();
		return new NextResponse(text, {
			status: response.status,
			headers: { "content-type": "application/json" },
		});
	} catch {
		return NextResponse.json(
			{ message: "Component API is not reachable. Start it with npm run dev." },
			{ status: 503 }
		);
	}
}
