"use server";

import React from "react";

import { cookies, draftMode } from "next/headers";

import Home from "@/components/layouts/home";
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
					    ... on home_Entry {
      id
      url
      title
      subhead
      copy
      featureWork {
        ... on simpleWork_Entry {
          title
          slug
          images {
            url
            uid
            alt
            height
            width
            title
            focalPoint
            mimeType
          }
          subhead
          tags {
            title
          }
        }
        ... on work_Entry {
          title
          slug
          images {
            url
            uid
            alt
            height
            width
            title
            focalPoint
            mimeType
          }
          subhead
          tags {
            title
          }
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

async function Page() {
	const { data } = await getData();

	return <Home data={data} javaData={catalogAsCategoryMap()} />;
}

export default Page;
