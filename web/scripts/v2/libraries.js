/**
 * Maps a credit URL host to a human-readable source library.
 *
 * Designers need to see "Aceternity UI" on a card, not "ui.aceternity.com".
 * Hosts not listed here fall back to the bare hostname and the component is
 * flagged `needs-review` so the gap is visible.
 */
const LIBRARIES = {
	"ui.aceternity.com": "Aceternity UI",
	"assets.aceternity.com": "Aceternity UI",
	"aceternity.com": "Aceternity UI",
	"reactbits.dev": "React Bits",
	"fancycomponents.dev": "Fancy Components",
	"ui-layouts.com": "UI Layouts",
	"cult-ui.com": "Cult UI",
	"magicui.design": "Magic UI",
	"motion-primitives.com": "Motion Primitives",
	"kokonutui.com": "Kokonut UI",
	"kibo-ui.com": "Kibo UI",
	"starui.link": "Star UI",
	"eclairui.gopx.dev": "Eclair UI",
	"atelier-ui.com": "Atelier UI",
	"componentry.fun": "Componentry",
	"componentry.dev": "Componentry",
	"zenui.net": "ZenUI",
	"smoothui.dev": "SmoothUI",
	"serenity-ui.com": "Serenity UI",
	"scrollxui.dev": "ScrollX UI",
	"namer-ui.netlify.app": "Namer UI",
	"sparkui.site": "Spark UI",
	"hover.dev": "Hover.dev",
	"pldkhoa.dev": "pldkhoa",
	"animate-ui.com": "Animate UI",
	"originui.com": "Origin UI",
	"ui.shadcn.com": "shadcn/ui",
	"tailwindcss.com": "Tailwind CSS",
	"great-ui.com": "Great UI",
	"stackbits.dev": "StackBits",
	"reui.io": "ReUI",
	"react-components-from-scratch.vercel.app":
		"React Components From Scratch",
	"codepen.io": "CodePen",
	"github.com": "GitHub",
	"codesandbox.io": "CodeSandbox",
	"dribbble.com": "Dribbble",
	"x.com": "X",
	"twitter.com": "X",
	"drivebrandstudio.com": "Drive Brand Studio",
	"tween-ui.vercel.app": "Tween UI",
};

/** Hosts that are asset CDNs or specs, never a design source. */
const NON_SOURCE_HOSTS = new Set([
	"w3.org",
	"www.w3.org",
	"images.unsplash.com",
	"unsplash.com",
	"plus.unsplash.com",
	"picsum.photos",
	"ik.imagekit.io",
	"media.giphy.com",
	"img.freepik.com",
	"i.pravatar.cc",
	"cdn.cosmos.so",
	"media.istockphoto.com",
	"videos.pexels.com",
	"pexels.com",
	"google.com",
	"fonts.googleapis.com",
	"example.com",
	"localhost",
	"cd-misc.s3.us-east-2.amazonaws.com",
	"hebbkx1anhila5yf.public.blob.vercel-storage.com",
	"youtube.com",
	"www.youtube.com",
	"instagram.com",
	"linkedin.com",
	"schema.org",
]);

const bareHost = (host) => host.replace(/^www\./, "");

/** True when a URL could plausibly be a design source rather than an asset. */
function isSourceUrl(url) {
	try {
		const host = bareHost(new URL(url).hostname);
		return !NON_SOURCE_HOSTS.has(host);
	} catch {
		return false;
	}
}

/**
 * Turns a credit URL into structured attribution.
 * Returns null when the URL is an asset CDN rather than a design source.
 */
function describeSource(url) {
	let parsed;
	try {
		parsed = new URL(url);
	} catch {
		return null;
	}

	const host = bareHost(parsed.hostname);
	if (NON_SOURCE_HOSTS.has(host)) return null;

	const known = LIBRARIES[host];
	const segments = parsed.pathname.split("/").filter(Boolean);

	// Per-user platforms: the author is the first path segment.
	if (host === "codepen.io" || host === "github.com") {
		const [user] = segments;
		return {
			source: known,
			author: user || undefined,
			authorUrl: user ? `${parsed.origin}/${user}` : undefined,
			url,
		};
	}

	if (host === "x.com" || host === "twitter.com") {
		const [user] = segments;
		return {
			source: known,
			author: user ? `@${user}` : undefined,
			authorUrl: user ? `${parsed.origin}/${user}` : undefined,
			url,
		};
	}

	return {
		source: known || host,
		url,
		// Root domain of a library is a fair "authorUrl" when we know nothing else.
		authorUrl: known ? parsed.origin : undefined,
	};
}

module.exports = { LIBRARIES, NON_SOURCE_HOSTS, isSourceUrl, describeSource, bareHost };
