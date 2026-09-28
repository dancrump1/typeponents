import { cookies, draftMode } from "next/headers";
import { redirect } from "next/navigation";

import cmsClient from "@/lib/cmsClient";
import { gql } from "graphql-request";

// This matches GET /api/preview
export async function GET(request: Request) {
	const { searchParams } = new URL(request.url);
	const entryUid = searchParams.get("entryUid");

	// Optionally validate token
	// if (!token) {
	//   return NextResponse.json({ message: 'Token missing' }, { status: 401 })
	// }

	// Check the secret and next parameters
	// This secret should only be known to this Route Handler and the CMS
	//   if (secret !== 'secretsecret123') {
	//     return new Response('Invalid token', { status: 401 })
	//   }

	const client = cmsClient(false, "");

	const pageQuery = gql`
		query ($uid: [String]) {
			entry(uid: $uid) {
				id
				uri
				typeHandle
			}
		}
	`;

	const data = await client.request(pageQuery, { uid: entryUid });

	const { uri } = data.entry;
	const isHome = uri === "__home__" || uri === "home";
	const location = `/${isHome ? "drive25" : "drive25/" + uri}`;

	// In App Router, setPreviewData is still available but only in *pages router*
	// Instead, use draftMode()
	const draft = await draftMode();
	draft.enable();

	// Store extra data in cookies if needed
	redirect(location);
}
