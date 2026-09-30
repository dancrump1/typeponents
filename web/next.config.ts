import fs from "node:fs";
import path from "node:path";
import type { NextConfig } from "next";

/** @type {import('next').NextConfig} */

const withBundleAnalyzer = require("@next/bundle-analyzer")({
	enabled: process.env.ANALYZE === "true",
});

/**
 * Hosted rebuilds compile into `.next-staging` while `next start` keeps
 * serving `.next`. Env vars are the primary signal; a marker file is the
 * fallback when a host strips or overrides BUILD_DIR for the child process.
 */
function resolveDistDir() {
	const fromEnv = process.env.TYPEPONENTS_DIST_DIR || process.env.BUILD_DIR;
	if (fromEnv) return fromEnv;
	try {
		const marker = fs
			.readFileSync(path.join(process.cwd(), ".next-dist-dir"), "utf8")
			.trim();
		if (marker === ".next" || marker === ".next-staging") return marker;
	} catch {
		// Live server and `npm run build` default to .next.
	}
	return ".next";
}

const nextConfig: NextConfig = {
	outputFileTracingIncludes: {
		registry: ["./registry/**/*"],
	},
	/* config options here */
	distDir: resolveDistDir(),
	transpilePackages: ["three"],
	serverExternalPackages: ["amqplib"],
	async redirects() {
		return [
			{ source: "/browse", destination: "/library", permanent: false },
			{ source: "/all", destination: "/library", permanent: false },
			{ source: "/catalog", destination: "/library", permanent: false },
			{ source: "/find", destination: "/library", permanent: false },
			{ source: "/categories", destination: "/library", permanent: false },
			{ source: "/new", destination: "/library", permanent: false },
		];
	},

	// !! WARN !!
	// Dangerously allow production builds to successfully complete even if
	// your project has type errors.
	// !! WARN !!
	eslint: {
		ignoreDuringBuilds: true,
	},
	// !! WARN !!
	// Dangerously allow production builds to successfully complete even if
	// your project has type errors.
	// !! WARN !!
	typescript: {
		ignoreBuildErrors: true,
	},
	images: {
		remotePatterns: [
			// TODO Startup: Remove this in production
			// {
			// 	protocol: "https",
			// 	hostname: "craft.ddev.site",
			// 	port: "",
			// 	pathname: "/publicFiles/**",
			// },
			{
				protocol: "https",
				hostname: "picsum.photos",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "unsplash.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "admin.playground.drivedev.net",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "drivebrandstudio.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "ik.imagekit.io",
				port: "",
				pathname: "/**",
			},
		],
	},
};

export default withBundleAnalyzer(nextConfig);
