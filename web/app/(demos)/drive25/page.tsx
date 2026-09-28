"use server";

import { cookies, draftMode } from "next/headers";

import Home from "@/components/layouts/drive25";
import cmsClient from "@/lib/cmsClient";
import { gql } from "graphql-request";
import { catalogAsCategoryMap } from "@/lib/registry";

async function getData() {
	const { isEnabled } = await draftMode();
	const cookieStore = await cookies();
	const entryUid = cookieStore.get("entryUid");
	const token = cookieStore.get("token");

	const client = cmsClient(isEnabled, token?.value);

	const data = await client.request(
		gql`
			{
				assets(folderId: 24) {
					url
					uid
					alt
					height
					width
					title
					focalPoint
					mimeType
				}
				homeEntries {
					... on home_home_Entry {
						id
						callToAction {
							customText
							title
						}
						image {
							url
							uid
							alt
							height
							width
							title
							focalPoint
							mimeType
							embeddedAsset {
								height
								html
								iframeCode
								iframeSrc(params: "")
								image
								images
								title
							}
						}
						headline
						workSpotlight {
							title
							image {
								url
								uid
								alt
								height
								width
								title
								focalPoint
								mimeType
								embeddedAsset {
									height
									html
									iframeCode
									iframeSrc(params: "")
									image
									images
									title
								}
							}
						}
						contentBlocks {
							... on contentBlock_cta_BlockType {
								images {
									url
									uid
									alt
									height
									width
									title
									focalPoint
									mimeType
									embeddedAsset {
										height
										html
										iframeCode
										iframeSrc(params: "")
										image
										images
										title
									}
								}
								headline
								copy
							}
						}
					}
				}
				asset(id: 729) {
					url
					uid
					alt
					height
					width
					title
					focalPoint
					mimeType
				}
				cta: asset(id: 221) {
					url
					uid
					alt
					height
					width
					title
					focalPoint
					mimeType
				}
			}
		`,
		{ uid: entryUid }
	);

	return { data };
}

export default async function Page() {
	const { data } = await getData();

	return <Home data={data} result={catalogAsCategoryMap()} />;
}
