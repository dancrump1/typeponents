import { GraphQLClient } from "graphql-request";

interface IHeaders {
	Authorization: string;
	[k: string]: any;
}

export default function cmsClient(
	preview?: boolean,
	token?: string
): GraphQLClient {
	const endpoints = `${process.env.CMS_GRAPHQL_ENDPOINT}api`;

console.log(process.env.CRAFT_CMS_GRAPHQL_TOKEN);
	
	const headers: IHeaders = {
		"Content-Type": "application/json",
		Authorization: `Bearer ${process.env.CRAFT_CMS_GRAPHQL_TOKEN}`,
	};

	if (preview) {
		headers["x-craft-token"] = token;
	}

	console.log(headers);

	const graphQLClient = new GraphQLClient(endpoints, {
		headers,
		method: "POST",
	});

	console.log(graphQLClient);

	return graphQLClient;
}
