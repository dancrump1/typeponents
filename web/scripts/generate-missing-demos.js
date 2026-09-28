const fs = require("fs");
const path = require("path");
const { resolveUsageMapping } = require("./registry-resolve");

const openSourcePath = path.join(process.cwd(), "registry/open-source");
const usagesPath = path.join(process.cwd(), "components/usages");
const overrides = fs.existsSync(path.join(process.cwd(), "data/registry-overrides.json"))
	? JSON.parse(fs.readFileSync(path.join(process.cwd(), "data/registry-overrides.json"), "utf8"))
	: {};

const CUSTOM_DEMOS = {
	"cardsusage.tsx": `import {
	CardContainer,
	CardContent,
	CardHeader,
	CardHr,
	FlipCardBackContent,
	FlipCardButton,
} from "@/registry/open-source/cards";
import { useState } from "react";

export default function Usage() {
	const [flipped, setFlipped] = useState(false);

	return (
		<div className="flex items-center justify-center p-8">
			<CardContainer>
				{!flipped ? (
					<CardContent key="front">
						<CardHeader>Hover to explore</CardHeader>
						<CardHr />
						<div className="p-6 text-center text-muted-foreground">
							A flip card built from compound card primitives.
						</div>
						<FlipCardButton onClick={() => setFlipped(true)}>
							Flip card
						</FlipCardButton>
					</CardContent>
				) : (
					<FlipCardBackContent key="back">
						<CardHeader>Back side</CardHeader>
						<div className="p-6 text-center text-muted-foreground">
							Reverse content with the same motion system.
						</div>
						<FlipCardButton onClick={() => setFlipped(false)}>
							Flip back
						</FlipCardButton>
					</FlipCardBackContent>
				)}
			</CardContainer>
		</div>
	);
}`,
	"backgroundusage.tsx": `import Background from "@/registry/open-source/background";

export default function Usage() {
	return (
		<div className="relative h-[400px] w-full overflow-hidden rounded-xl">
			<Background
				image={{ url: "https://picsum.photos/1200/800" }}
				position="center"
			/>
		</div>
	);
}`,
	"codeblockusage.tsx": `import CodeBlock from "@/registry/open-source/code-block";

export default function Usage() {
	return (
		<div className="max-w-2xl p-8">
			<CodeBlock
				language="typescript"
				filename="example.ts"
				code={\`export function greet(name: string) {
  return \\\`Hello, \\\${name}!\\\`;
}\`}
			/>
		</div>
	);
}`,
	"griddistortionusage.tsx": `import GridDistortion from "@/registry/open-source/grid-distortion";

export default function Usage() {
	return (
		<div className="h-[500px] w-full">
			<GridDistortion
				imageSrc="https://picsum.photos/1920/1080?grayscale"
				grid={12}
				mouse={0.1}
				strength={0.15}
				relaxation={0.9}
			/>
		</div>
	);
}`,
	"resizenavbarusage.tsx": `import ResizeNavBar from "@/registry/open-source/resize-navbar";

const navItems = [
	{ link: "#home", title: "Home" },
	{ link: "#about", title: "About" },
	{ link: "#contact", title: "Contact" },
];

export default function Usage() {
	return (
		<div className="min-h-[300px] w-full">
			<ResizeNavBar navItems={navItems} />
		</div>
	);
}`,
	"sidebarusage.tsx": `import { Sidebar, SidebarBody, SidebarLink } from "@/registry/open-source/sidebar";
import { Home, Settings, User } from "lucide-react";

const links = [
	{ label: "Home", href: "#", icon: <Home className="h-5 w-5" /> },
	{ label: "Profile", href: "#", icon: <User className="h-5 w-5" /> },
	{ label: "Settings", href: "#", icon: <Settings className="h-5 w-5" /> },
];

export default function Usage() {
	return (
		<div className="flex h-[400px] w-full rounded-xl border">
			<Sidebar>
				<SidebarBody className="justify-between gap-10">
					<div className="flex flex-col gap-2">
						{links.map((link) => (
							<SidebarLink key={link.label} link={link} />
						))}
					</div>
				</SidebarBody>
			</Sidebar>
		</div>
	);
}`,
	"familydrawerusage.tsx": `import { Sparkles } from "lucide-react";

import {
	FamilyDrawerAnimatedContent,
	FamilyDrawerAnimatedWrapper,
	FamilyDrawerClose,
	FamilyDrawerContent,
	FamilyDrawerHeader,
	FamilyDrawerOverlay,
	FamilyDrawerPortal,
	FamilyDrawerRoot,
	FamilyDrawerTrigger,
	FamilyDrawerViewContent,
} from "@/registry/open-source/family-drawer";

function DefaultView() {
	return (
		<div className="space-y-4">
			<FamilyDrawerHeader
				icon={<Sparkles className="h-6 w-6" />}
				title="Family Drawer"
				description="Animated multi-view drawer built with Vaul."
			/>
		</div>
	);
}

export default function Usage() {
	return (
		<div className="relative flex min-h-[400px] w-full items-center justify-center p-8">
			<FamilyDrawerRoot views={{ default: DefaultView }}>
				<FamilyDrawerTrigger>Open drawer</FamilyDrawerTrigger>
				<FamilyDrawerPortal>
					<FamilyDrawerOverlay />
					<FamilyDrawerContent>
						<FamilyDrawerClose />
						<FamilyDrawerAnimatedWrapper>
							<FamilyDrawerAnimatedContent>
								<FamilyDrawerViewContent />
							</FamilyDrawerAnimatedContent>
						</FamilyDrawerAnimatedWrapper>
					</FamilyDrawerContent>
				</FamilyDrawerPortal>
			</FamilyDrawerRoot>
		</div>
	);
}`,
	"giftextusage.tsx": `import { GifText } from "@/registry/open-source/gif-text";

export default function Usage() {
	return (
		<div className="relative flex w-full items-center justify-center p-8">
			<GifText gifUrl="/itjustworks.jpg" text="Animated GIF Text" />
		</div>
	);
}`,
	"glowingeffectusage.tsx": `import { GlowingEffect } from "@/registry/open-source/glowing-effect";

export default function Usage() {
	return (
		<div className="relative flex w-full items-center justify-center p-8">
			<div className="relative w-full max-w-md rounded-2xl border p-8">
				<GlowingEffect disabled={false} proximity={64} spread={40} />
				<h3 className="text-lg font-semibold">Glowing Effect</h3>
			</div>
		</div>
	);
}`,
	"mobilenavusage.tsx": `import {
	NavAccordion,
	NavAccordionContent,
	NavAccordionItem,
	NavAccordionTrigger,
} from "@/registry/open-source/mobile-nav";

export default function Usage() {
	return (
		<div className="relative w-full max-w-md p-8">
			<NavAccordion type="single" collapsible className="w-full">
				<NavAccordionItem value="home">
					<NavAccordionTrigger>Home</NavAccordionTrigger>
					<NavAccordionContent>
						<p className="text-sm text-muted-foreground">Mobile nav accordion primitives.</p>
					</NavAccordionContent>
				</NavAccordionItem>
			</NavAccordion>
		</div>
	);
}`,
	"skeletonusage.tsx": `import Skeleton from "@/registry/open-source/skeleton";

export default function Usage() {
	return (
		<div className="flex w-full max-w-md flex-col gap-4 p-8">
			<Skeleton className="h-12 w-12 rounded-full" />
			<div className="space-y-2">
				<Skeleton className="h-4 w-[250px]" />
				<Skeleton className="h-4 w-[200px]" />
			</div>
		</div>
	);
}`,
	"shiftcardusage.tsx": `import { ShiftCard } from "@/registry/open-source/shift-card";

export default function Usage() {
	return (
		<div className="flex items-center justify-center p-8">
			<ShiftCard
				className="h-[320px] w-[280px]"
				topContent={<p className="text-sm text-muted-foreground">Featured</p>}
				middleContent={<h3 className="text-xl font-semibold">Shift Card</h3>}
				topAnimateContent={<span className="text-xs uppercase tracking-wide">New</span>}
				bottomContent={<p className="text-sm text-muted-foreground">Hover to reveal extra content.</p>}
			/>
		</div>
	);
}`,
	"brickbreakerusage.tsx": `import { BrickBreaker } from "@/registry/open-source/brick-breaker";

export default function Usage() {
	return (
		<div className="flex items-center justify-center p-4">
			<BrickBreaker className="rounded-xl border" />
		</div>
	);
}`,
	"tabbedfaqusage.tsx": `import { FaqTabbedExplorer } from "@/registry/open-source/tabbed-faq";

export default function Usage() {
	return (
		<div className="w-full p-4">
			<FaqTabbedExplorer />
		</div>
	);
}`,
	"masonryusage.tsx": `import { MasonryRoot, MasonryItem } from "@/registry/open-source/masonry";

const items = [
	{ id: "1", height: 180, content: "Card one" },
	{ id: "2", height: 240, content: "Card two" },
	{ id: "3", height: 200, content: "Card three" },
	{ id: "4", height: 160, content: "Card four" },
];

export default function Usage() {
	return (
		<div className="p-8">
			<MasonryRoot columns={2} gap={16}>
				{items.map((item) => (
					<MasonryItem key={item.id} height={item.height}>
						<div className="flex h-full items-center justify-center rounded-xl border bg-muted/30 p-4">
							{item.content}
						</div>
					</MasonryItem>
				))}
			</MasonryRoot>
		</div>
	);
}`,
	"lanecardusage.tsx": `import Lane, { ListCard } from "@/registry/open-source/lane-card";

const cards = [
	{ id: "1", title: "Explore", image: "https://picsum.photos/300/400?1" },
	{ id: "2", title: "Discover", image: "https://picsum.photos/300/400?2" },
];

export default function Usage() {
	return (
		<div className="p-8">
			<Lane>
				{cards.map((card) => (
					<ListCard key={card.id} card={card} />
				))}
			</Lane>
		</div>
	);
}`,
	"codeblock2usage.tsx": `import CodeBlock2 from "@/registry/open-source/code-block2";

export default function Usage() {
	return (
		<div className="max-w-2xl p-8">
			<CodeBlock2
				tabs={[
					{ label: "install", code: "npm install motion", language: "bash" },
					{ label: "usage", code: "import { motion } from 'motion/react'", language: "typescript" },
				]}
			/>
		</div>
	);
}`,
	"iconsusage.tsx": `import IconsList from "@/registry/open-source/icons";

export default function Usage() {
	return (
		<div className="relative w-full p-8">
			<IconsList />
		</div>
	);
}`,
	"snowflakesusage.tsx": `import { useEffect } from "react";

export default function Usage() {
	useEffect(() => {
		void import("@/registry/open-source/snowflakes");
	}, []);

	return (
		<div className="flex h-[500px] w-full items-center justify-center text-sm text-muted-foreground">
			Snowflakes particle background loads on mount
		</div>
	);
}`,
	"infinitescrollinglogosanimationusage.tsx": `import InfiniteScrollingLogosAnimation from "@/registry/open-source/infinite-scrolling-logos-animation";

const assets = [
	{ src: "/itjustworks.jpg", alt: "Logo 1" },
	{ src: "/itjustworks.jpg", alt: "Logo 2" },
	{ src: "/itjustworks.jpg", alt: "Logo 3" },
];

export default function Usage() {
	return (
		<div className="w-full py-8">
			<InfiniteScrollingLogosAnimation assets={assets} />
		</div>
	);
}`,
	"iphoneusage.tsx": `import { Iphone } from "@/registry/open-source/iphone";

export default function Usage() {
	return (
		<div className="flex items-center justify-center p-8">
			<Iphone src="https://picsum.photos/400/800" className="w-[280px]" />
		</div>
	);
}`,
	"modernloaderusage.tsx": `import ModernLoader from "@/registry/open-source/modern-loader";

export default function Usage() {
	return (
		<div className="flex h-[300px] items-center justify-center">
			<ModernLoader />
		</div>
	);
}`,
};

const NEW_DEMOS = {
	"brickbreakerusage.tsx": CUSTOM_DEMOS["brickbreakerusage.tsx"],
	"codeblock2usage.tsx": CUSTOM_DEMOS["codeblock2usage.tsx"],
	"infinitescrollinglogosanimationusage.tsx":
		CUSTOM_DEMOS["infinitescrollinglogosanimationusage.tsx"],
	"iphoneusage.tsx": CUSTOM_DEMOS["iphoneusage.tsx"],
	"modernloaderusage.tsx": CUSTOM_DEMOS["modernloaderusage.tsx"],
	"shiftcardusage.tsx": CUSTOM_DEMOS["shiftcardusage.tsx"],
	"tabbedfaqusage.tsx": CUSTOM_DEMOS["tabbedfaqusage.tsx"],
};

const inferDefaultDemo = (importPath, componentName) => `import ${componentName} from "@/registry/open-source/${importPath}";

export default function Usage() {
	return (
		<div className="relative flex w-full items-center justify-center p-8">
			<${componentName} />
		</div>
	);
}`;

const inferNamedDemo = (importPath, exportName) => `import { ${exportName} } from "@/registry/open-source/${importPath}";

export default function Usage() {
	return (
		<div className="relative flex w-full items-center justify-center p-8">
			<${exportName} />
		</div>
	);
}`;

const toPascal = (value) =>
	value
		.split(/[-_/]/)
		.map((part) => part.charAt(0).toUpperCase() + part.slice(1))
		.join("");

const getPrimaryExport = (entryPath) => {
	const content = fs.readFileSync(entryPath, "utf8");
	const base = path.basename(entryPath).replace(/\.(tsx|ts)$/, "");
	if (base === "index") {
		const parent = path.basename(path.dirname(entryPath));
		return { kind: "default", name: toPascal(parent) };
	}
	const pascal = toPascal(base);

	const defaultFn = content.match(/export\s+default\s+function\s+(\w+)/);
	if (defaultFn) return { kind: "default", name: defaultFn[1] };

	const defaultConst = content.match(/export\s+default\s+(\w+)/);
	if (defaultConst) return { kind: "default", name: defaultConst[1] };

	const namedExports = [
		...content.matchAll(/export\s+(?:const|function)\s+([A-Z]\w*)/g),
	].map((match) => match[1]);

	const matching = namedExports.find(
		(name) => name.toLowerCase() === pascal.toLowerCase()
	);
	if (matching) return { kind: "named", name: matching };

	const componentLike = namedExports.find((name) =>
		/(Root|Card|Nav|Loader|Button|Sidebar|Skeleton|Gallery|Board|Menu|Panel|Section|Hero|Grid|Block|Item|Explorer|Animation|Navbar|Accordion|Carousel|Modal|Dialog|Form|Table|List|Tabs|Faq|Footer|Header|Canvas|Shader|Background|Player|Terminal|Tunnel|Spinner|Loader|Feature|Editor|Sandbox|Thread|Snowflake|Frequency|Fishy|Veil|Sandbox|Showcase|Slide|Scrollbar|Bounce|Dot|Ring|Bars|Distortion|Flex|Text|Video|View|Ping|Pong|Power|Position|Project|Rounded|Nine|Navigation|Movie|Masonry|Lane|Mobile|Resize|Skeleton|Terminal|Thread|Tunnel|View|Grid|Half|Dark|Code|Circular|Dual|Background|Cards|Editor|Feature|Fishy|Frequency|Grid|Half|Improvement|Introduction|Pipeline|Popular|Pricing|Preloader|Shuffle|Side|Snow|Spinner|Terminal|Text|Three|Tunnel|Video|View)/.test(
			name
		)
	);
	if (componentLike) return { kind: "named", name: componentLike };

	if (namedExports.length) return { kind: "named", name: namedExports[0] };

	return { kind: "default", name: pascal };
};

const wrapDemo = (body) => `"use client";

${body}
`;

const hasRegistryImport = (content) =>
	/from\s+["']@\/registry\/open-source/.test(content);

const main = () => {
	const usageFiles = fs
		.readdirSync(usagesPath)
		.filter((file) => file.endsWith("usage.tsx"));
	const reserved = new Set();
	let updated = 0;
	let created = 0;

	for (const usageFile of usageFiles) {
		const usagePath = path.join(usagesPath, usageFile);
		const content = fs.readFileSync(usagePath, "utf8");

		if (CUSTOM_DEMOS[usageFile] && !hasRegistryImport(content)) {
			fs.writeFileSync(usagePath, wrapDemo(CUSTOM_DEMOS[usageFile]));
			updated++;
			continue;
		}

		if (!hasRegistryImport(content) || /Placeholder|coming soon/i.test(content)) {
			const mapping = resolveUsageMapping({
				usageFile,
				openSourcePath,
				usagesPath,
				overrides,
				reservedSlugs: reserved,
			});

			if (!mapping) continue;
			reserved.add(mapping.slug);

			const entryPath = mapping.entryPaths[0];
			let importPath = path
				.relative(openSourcePath, entryPath)
				.replace(/\\/g, "/")
				.replace(/\.(tsx|ts)$/, "");
			if (importPath.endsWith("/index")) {
				importPath = importPath.replace(/\/index$/, "");
			}
			const exp = getPrimaryExport(entryPath);
			const body =
				exp.kind === "default"
					? inferDefaultDemo(importPath, exp.name)
					: inferNamedDemo(importPath, exp.name);

			fs.writeFileSync(usagePath, wrapDemo(body));
			updated++;
		} else if (mappingFromFile(usageFile)) {
			reserved.add(mappingFromFile(usageFile).slug);
		}
	}

	for (const [usageFile, body] of Object.entries(NEW_DEMOS)) {
		const usagePath = path.join(usagesPath, usageFile);
		if (!fs.existsSync(usagePath)) {
			fs.writeFileSync(usagePath, wrapDemo(body));
			created++;
		}
	}

	console.log(`Updated ${updated} placeholder demos`);
	console.log(`Created ${created} new demo files`);
};

function mappingFromFile(usageFile) {
	return resolveUsageMapping({
		usageFile,
		openSourcePath,
		usagesPath,
		overrides,
		reservedSlugs: new Set(),
	});
}

main();
