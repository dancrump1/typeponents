"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import {
	GATE_COOKIE,
	gateToken,
	isValidGateCookie,
	safeNextPath,
} from "@/lib/gate";

export type UnlockState = { error: string } | null;

export async function unlockGate(
	_prev: UnlockState,
	formData: FormData
): Promise<UnlockState> {
	const expected = process.env.GATED_LIBRARY_PASSWORD;
	if (!expected) {
		return { error: "This collection is locked and no password is configured." };
	}

	const attempt = String(formData.get("password") ?? "");
	const token = await gateToken(attempt);
	const ok = await isValidGateCookie(token, expected);
	if (!ok) {
		return { error: "That password is not right." };
	}

	const store = await cookies();
	store.set(GATE_COOKIE, token, {
		httpOnly: true,
		secure: process.env.NODE_ENV === "production",
		sameSite: "lax",
		path: "/",
		maxAge: 60 * 60 * 24 * 30,
	});

	redirect(safeNextPath(formData.get("next")));
}
