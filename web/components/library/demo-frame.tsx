"use client";

import {
	Component as ReactComponent,
	Suspense,
	lazy,
	useEffect,
	useRef,
	useState,
	type ComponentType,
	type ReactNode,
} from "react";

import { demoLoaders } from "@/registry/__generated__/demos";
import type { Risk } from "@/registry/types";
import { cn } from "@/lib/utils";

/**
 * Renders a component demo on demand.
 *
 * Catalog cards observe a *stable* thumbnail box (not the scaled inner stage).
 * A transformed 0×0 box never intersects, which is why previews used to sit
 * on "Loading preview…" forever. Demos unmount again once they are well off
 * screen so rAF/WebGL don't accumulate while you scroll.
 */

class DemoErrorBoundary extends ReactComponent<
	{ children: ReactNode; slug: string },
	{ error: Error | null }
> {
	state = { error: null as Error | null };

	static getDerivedStateFromError(error: Error) {
		return { error };
	}

	componentDidUpdate(prevProps: { slug: string }) {
		if (prevProps.slug !== this.props.slug && this.state.error) {
			this.setState({ error: null });
		}
	}

	render() {
		if (this.state.error) {
			return (
				<div className="flex h-full w-full flex-col items-center justify-center gap-1 p-4 text-center">
					<p className="text-sm font-medium text-destructive">This demo threw an error</p>
					<p className="max-w-full truncate text-xs text-muted-foreground">
						{this.state.error.message}
					</p>
				</div>
			);
		}
		return this.props.children;
	}
}

const loaderCache = new Map<string, ComponentType>();

function getDemo(slug: string): ComponentType | null {
	const cached = loaderCache.get(slug);
	if (cached) return cached;

	const loader = demoLoaders[slug];
	if (!loader) return null;

	const Lazy = lazy(loader);
	loaderCache.set(slug, Lazy);
	return Lazy;
}

/** Kick the chunk download without mounting (so the spinner isn't the first paint). */
function preloadDemo(slug: string) {
	getDemo(slug);
	void demoLoaders[slug]?.();
}

const STAGE_W = 1100;
const STAGE_H = 700;

/**
 * Shared observer, attached to the card's thumbnail frame — a box with a real
 * layout size, never a `scale(0)` inner stage.
 *
 * `rootMargin` is generous so the JS chunk is fetching before the card hits
 * the fold. Unmount happens at the same boundary, far enough that fast
 * scrolling doesn't flicker, close enough that off-screen WebGL dies.
 */
const previewCallbacks = new Map<Element, (onScreen: boolean) => void>();
let previewObserver: IntersectionObserver | null = null;

function getPreviewObserver() {
	if (typeof IntersectionObserver === "undefined") return null;
	if (!previewObserver) {
		previewObserver = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					previewCallbacks.get(entry.target)?.(entry.isIntersecting);
				}
			},
			{ root: null, rootMargin: "250px 0px", threshold: 0 }
		);
	}
	return previewObserver;
}

function isInLoadRange(node: Element) {
	const rect = node.getBoundingClientRect();
	if (rect.width < 1 || rect.height < 1) return false;
	const slack = 250;
	return rect.bottom > -slack && rect.top < window.innerHeight + slack;
}

function usePreviewSlot() {
	const ref = useRef<HTMLDivElement>(null);
	const [onScreen, setOnScreen] = useState(false);

	useEffect(() => {
		const node = ref.current;
		const observer = getPreviewObserver();
		if (!node || !observer) return;

		previewCallbacks.set(node, setOnScreen);
		observer.observe(node);
		// IO does not always deliver a first callback (skipped content,
		// first paint before layout). Read the rect ourselves.
		if (isInLoadRange(node)) setOnScreen(true);

		return () => {
			previewCallbacks.delete(node);
			observer.unobserve(node);
		};
	}, []);

	return { ref, onScreen };
}

export type DemoFrameProps = {
	slug: string;
	title: string;
	risk: Risk;
	/** Detail page only — catalog uses `CatalogPreview`. */
	trigger?: "eager";
	className?: string;
};

export function DemoFrame({ slug, title, className }: DemoFrameProps) {
	const [isClient, setIsClient] = useState(false);
	useEffect(() => setIsClient(true), []);

	if (!demoLoaders[slug]) {
		return (
			<div
				className={cn(
					"flex h-full w-full items-center justify-center p-4 text-center text-xs text-muted-foreground",
					className
				)}
			>
				No demo yet for {title}
			</div>
		);
	}

	const Demo = isClient ? getDemo(slug) : null;

	return (
		<div
			className={cn(
				"relative h-full w-full overflow-hidden",
				"isolate [transform:translateZ(0)]",
				className
			)}
		>
			{Demo ? (
				<DemoErrorBoundary slug={slug}>
					<Suspense fallback={<DemoSkeleton />}>
						<Demo />
					</Suspense>
				</DemoErrorBoundary>
			) : (
				<DemoSkeleton />
			)}
		</div>
	);
}

/**
 * Catalog thumbnail. Observes *this* box, then mounts the demo inside it.
 * Fullscreen demos are painted on a desktop-sized stage and scaled to fit.
 */
export function CatalogPreview({
	slug,
	title,
	risk,
}: {
	slug: string;
	title: string;
	risk: Risk;
}) {
	const { ref, onScreen } = usePreviewSlot();

	useEffect(() => {
		if (onScreen) preloadDemo(slug);
	}, [onScreen, slug]);

	return (
		<div ref={ref} className="pointer-events-none absolute inset-0">
			{onScreen ? (
				risk.fullscreen ? (
					<ThumbnailStage>
						<DemoFrame slug={slug} title={title} risk={risk} />
					</ThumbnailStage>
				) : (
					<DemoFrame slug={slug} title={title} risk={risk} />
				)
			) : null}
		</div>
	);
}

function ThumbnailStage({ children }: { children: React.ReactNode }) {
	const ref = useRef<HTMLDivElement>(null);
	const [scale, setScale] = useState(0.35);

	useEffect(() => {
		const node = ref.current;
		if (!node) return;

		const update = () => {
			const { width, height } = node.getBoundingClientRect();
			if (width < 1 || height < 1) return;
			setScale(Math.min(width / STAGE_W, height / STAGE_H));
		};

		update();
		const ro = new ResizeObserver(update);
		ro.observe(node);
		return () => ro.disconnect();
	}, []);

	return (
		<div ref={ref} className="relative h-full w-full overflow-hidden">
			<div
				className="absolute left-1/2 top-1/2 origin-center"
				style={{
					width: STAGE_W,
					height: STAGE_H,
					transform: `translate(-50%, -50%) scale(${scale})`,
				}}
			>
				{children}
			</div>
		</div>
	);
}

function DemoSkeleton() {
	return (
		<div className="flex h-full w-full items-center justify-center">
			<div className="h-8 w-8 animate-spin rounded-full border-2 border-muted border-t-foreground" />
		</div>
	);
}
