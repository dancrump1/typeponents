import { NextResponse } from "next/server";

import { isLibraryUnlocked } from "@/lib/gate-server";
import { readPublishStatus } from "@/lib/intake-job";

export const dynamic = "force-dynamic";

export async function GET() {
	if (!(await isLibraryUnlocked())) {
		return NextResponse.json({ error: "Locked" }, { status: 401 });
	}
	return NextResponse.json(readPublishStatus());
}
