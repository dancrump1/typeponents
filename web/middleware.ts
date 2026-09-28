import { NextResponse, type NextRequest } from "next/server";

import {
	GATE_COOKIE,
	gatedSlugFromPath,
	isValidGateCookie,
} from "@/lib/gate";

export async function middleware(request: NextRequest) {
	const slug = gatedSlugFromPath(request.nextUrl.pathname);
	if (!slug) return NextResponse.next();

	const unlocked = await isValidGateCookie(
		request.cookies.get(GATE_COOKIE)?.value,
		process.env.GATED_LIBRARY_PASSWORD
	);
	if (unlocked) return NextResponse.next();

	if (request.nextUrl.pathname.startsWith("/library/")) {
		const url = request.nextUrl.clone();
		url.pathname = "/library/unlock";
		url.searchParams.set("next", request.nextUrl.pathname);
		return NextResponse.redirect(url);
	}

	return new NextResponse(null, { status: 404 });
}

export const config = {
	matcher: [
		"/library/:slug",
		"/r/:file",
		"/docs/:file",
		"/registry/:name",
		"/api/registry/:component",
	],
};
