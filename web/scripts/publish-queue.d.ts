export function publishSiteRebuild(job: {
	slug?: string;
	attempt?: number;
}): Promise<void>;
