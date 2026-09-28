# Spring Element 2

Contained spring that you pull from an anchor; the coil stretches with the drag and snaps back on release.

**Interaction.** Grab the child and drag it away from its anchor. The SVG coil follows the motion with spring physics and fires onPullEnd when you let go.

- Categories: Special Effects & FX
- Tags: spring, drag, autoplay, responsive
- Import: `@/components/ui/spring-element2`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/spring-element2.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `framer-motion`
- `lucide-react`

## Usage

```tsx
"use client";

import { useCallback, useLayoutEffect, useRef, useState, type ReactElement } from "react";
import Link from "next/link";
import { Mail, Phone, Share2 } from "lucide-react";
import { SpringProvider, SpringElement } from "./component";
import { cn } from "@/lib/utils";

const KNOB_SPRING_PATH = {
	coilCount: 10,
	amplitudeMin: 6,
	amplitudeMax: 14,
} as const;

type ContactChannel = {
	id: string;
	label: string;
	hint: string;
	icon: ReactElement;
	href: string;
	external?: boolean;
};

const CONTACT_CHANNELS: ContactChannel[] = [
	{
		id: "call",
		label: "Schedule a call",
		hint: "Pull the knob down to book time",
		icon: <Phone className="size-5" strokeWidth={1.75} />,
		href: "/contact",
	},
	{
		id: "email",
		label: "Send an email",
		hint: "Pull the knob down to write us",
		icon: <Mail className="size-5" strokeWidth={1.75} />,
		href: "mailto:shift@drivebrandstudio.com",
	},
	{
		id: "social",
		label: "Say hi on social",
		hint: "Pull the knob down to follow along",
		icon: <Share2 className="size-5" strokeWidth={1.75} />,
		href: "https://www.instagram.com/drivebrandstudio/",
		external: true,
	},
];

function getRectOverlapRatio(a: DOMRect, b: DOMRect) {
	const overlapX = Math.min(a.right, b.right) - Math.max(a.left, b.left);
	const overlapY = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
	if (overlapX <= 0 || overlapY <= 0) return 0;

	const overlapArea = overlapX * overlapY;
	const knobArea = a.width * a.height;
	if (knobArea <= 0) return 0;

	return overlapArea / knobArea;
}

function isKnobInDropZone(knob: HTMLElement, dropZone: HTMLElement) {
	return getRectOverlapRatio(knob.getBoundingClientRect(), dropZone.getBoundingClientRect()) >= 0.35;
}

function getKnobDropTravel(
	knob: HTMLElement,
	dropZone: HTMLElement,
	track: HTMLElement,
) {
	const motionEl = knob.parentElement;
	if (!motionEl) return 132;

	const knobCenterAtRest =
		motionEl.offsetTop - track.offsetTop + knob.offsetHeight / 2;
	const zoneCenter =
		dropZone.offsetTop - track.offsetTop + dropZone.offsetHeight / 2;

	return Math.max(0, zoneCenter - knobCenterAtRest);
}

function PullKnob({
	channel,
	onActivate,
}: {
	channel: ContactChannel;
	onActivate: (channel: ContactChannel) => void;
}) {
	const trackRef = useRef<HTMLDivElement>(null);
	const anchorRef = useRef<HTMLDivElement>(null);
	const dropZoneRef = useRef<HTMLDivElement>(null);
	const knobVisualRef = useRef<HTMLDivElement>(null);
	const inZoneRef = useRef(false);
	const [progress, setProgress] = useState(0);
	const [isHot, setIsHot] = useState(false);
	const [dragBottom, setDragBottom] = useState(132);

	useLayoutEffect(() => {
		const knob = knobVisualRef.current;
		const dropZone = dropZoneRef.current;
		const track = trackRef.current;
		if (!knob || !dropZone || !track) return;

		const syncDragLimit = () => {
			setDragBottom(getKnobDropTravel(knob, dropZone, track));
		};

		syncDragLimit();
		const observer = new ResizeObserver(syncDragLimit);
		observer.observe(knob);
		observer.observe(dropZone);
		if (trackRef.current) observer.observe(trackRef.current);

		return () => observer.disconnect();
	}, []);

	const readDropZoneState = useCallback(() => {
		const knob = knobVisualRef.current;
		const dropZone = dropZoneRef.current;
		const anchor = anchorRef.current;
		if (!knob || !dropZone || !anchor) {
			return { inZone: false, progress: 0 };
		}

		const inZone = isKnobInDropZone(knob, dropZone);
		if (inZone) {
			return { inZone: true, progress: 1 };
		}

		const knobY = knob.getBoundingClientRect().top + knob.offsetHeight / 2;
		const startY = anchor.getBoundingClientRect().top + anchor.offsetHeight / 2;
		const targetY =
			dropZone.getBoundingClientRect().top + dropZone.offsetHeight / 2;
		const travel = targetY - startY;
		if (travel <= 0) {
			return { inZone: false, progress: 0 };
		}

		return {
			inZone: false,
			progress: Math.min(Math.max((knobY - startY) / travel, 0), 0.95),
		};
	}, []);

	const handlePull = useCallback(() => {
		const inZone = inZoneRef.current || readDropZoneState().inZone;
		if (inZone) {
			onActivate(channel);
			return;
		}
		setProgress(0);
		setIsHot(false);
	}, [channel, onActivate, readDropZoneState]);

	const handleDragStart = useCallback(() => {
		inZoneRef.current = false;
	}, []);

	const handleDrag = useCallback(() => {
		const { inZone, progress: nextProgress } = readDropZoneState();
		inZoneRef.current = inZone;
		setProgress(nextProgress);
		setIsHot(inZone);
	}, [readDropZoneState]);

	return (
		<article className="flex flex-col items-center gap-5">
			<div className="text-center">
				<h3 className="font-calendas text-xl tracking-tight text-white md:text-2xl">
					{channel.label}
				</h3>
				<p className="mt-1 text-sm text-white/45">{channel.hint}</p>
			</div>

			<div
				ref={trackRef}
				className="relative flex h-56 w-full flex-col items-center overflow-visible"
			>
				<SpringProvider
					containerRef={trackRef}
					anchorRef={anchorRef}
					dragElastic={0.08}
					pathConfig={KNOB_SPRING_PATH}
				>
					<div
						ref={anchorRef}
						className="absolute top-0 z-[1] flex size-10 items-center justify-center rounded-full border border-white/15 bg-[#141414]"
						aria-hidden
					>
						<div className="size-3 rounded-full bg-[#e3696b]/80 shadow-[0_0_12px_rgba(227,105,107,0.55)]" />
					</div>

					<div
						className="absolute top-5 bottom-8 left-1/2 z-[1] w-px -translate-x-1/2 bg-linear-to-b from-white/20 via-white/10 to-[#e3696b]/40"
						aria-hidden
					/>

					<div
						ref={dropZoneRef}
						className="absolute bottom-8 left-1/2 z-[1] h-14 w-24 -translate-x-1/2 rounded-full border border-dashed transition-colors duration-200"
						style={{
							borderColor: isHot ? "rgba(227,105,107,0.75)" : "rgba(255,255,255,0.12)",
							backgroundColor: isHot ? "rgba(227,105,107,0.08)" : "rgba(255,255,255,0.02)",
							boxShadow: isHot ? "0 0 28px rgba(227,105,107,0.18)" : undefined,
						}}
						aria-hidden
					/>

					<SpringElement
						className="absolute top-0 left-1/2 z-10 -translate-x-1/2"
						drag="y"
						dragConstraints={{ top: 0, bottom: dragBottom, left: 0, right: 0 }}
						dragElastic={0.08}
						onDragStart={handleDragStart}
						onPullEnd={handlePull}
						onDrag={handleDrag}
					>
						<div
							ref={knobVisualRef}
							className={cn(
								"relative flex size-14 select-none items-center justify-center rounded-full border-2 bg-linear-to-b from-[#444] to-[#1a1a1a] text-white shadow-[0_10px_30px_rgba(0,0,0,0.45)] transition-[border-color,box-shadow,transform] duration-200",
								isHot
									? "border-[#e3696b] shadow-[0_0_24px_rgba(227,105,107,0.35)]"
									: "border-white/20"
							)}
							style={{
								transform: `scale(${1 + progress * 0.06})`,
							}}
						>
							{channel.icon}
							<span className="pointer-events-none absolute -bottom-7 left-1/2 -translate-x-1/2 whitespace-nowrap text-[10px] uppercase tracking-[0.18em] text-white/35">
								Pull
							</span>
						</div>
					</SpringElement>
				</SpringProvider>
			</div>
		</article>
	);
}

export function ServicesSpringCta() {
	const handleActivate = useCallback((channel: ContactChannel) => {
		if (channel.external) {
			window.open(channel.href, "_blank", "noopener,noreferrer");
		} else if (channel.href.startsWith("mailto:") || channel.href.startsWith("tel:")) {
			window.location.href = channel.href;
		} else {
			window.location.assign(channel.href);
		}
	}, []);

	return (
		<section className="relative overflow-visible bg-black px-4 py-20 md:px-10 md:py-28">
		

			<div className="relative mx-auto flex w-full max-w-[1180px] flex-col items-center gap-12 md:gap-16">
				<div className="max-w-2xl text-center">
					<p className="font-brush-star text-[#e3696b] text-xl tracking-wide md:text-2xl">
						Let&apos;s connect
					</p>
					<h2 className="mt-3 font-calendas text-[36px] leading-[0.95] tracking-tight text-white sm:text-[48px] md:text-[56px]">
						Pull a knob. We&apos;ll meet you on the other end.
					</h2>
					<p className="mt-4 text-base leading-relaxed text-white/55 md:text-lg">
						Schedule a call, send a note, or stalk us on social — tug the spring
						all the way down to connect.
					</p>
				</div>


				<div className="grid w-full gap-12 sm:grid-cols-2 lg:grid-cols-3 lg:gap-8">
					{CONTACT_CHANNELS.map((channel) => (
						<PullKnob
							key={channel.id}
							channel={channel}
							onActivate={handleActivate}
						/>
					))}
				</div>

				<p className="text-center text-sm text-white/35">
					Prefer the old-fashioned way?{" "}
					<Link
						href="/contact"
						className="text-white/60 underline decoration-white/20 underline-offset-4 transition-colors hover:text-[#e3696b] hover:decoration-[#e3696b]/40"
					>
						Skip to the contact form
					</Link>
				</p>
			</div>
		</section>
	);
}

export default ServicesSpringCta;
```

## Source

### `components/ui/spring-element2.tsx`

```tsx
'use client';

import * as React from 'react';
import {
	motion,
	useMotionValue,
	useSpring as useMotionSpring,
	type SpringOptions,
	type HTMLMotionProps,
	type MotionValue,
} from 'framer-motion';
import { isMotionComponent } from 'framer-motion';
import { cn } from '@/lib/utils';

export function getStrictContext<T>(name: string) {
	const Context = React.createContext<T | undefined>(undefined);

	const useStrictContext = () => {
		const ctx = React.useContext(Context);
		if (!ctx) {
			throw new Error(`${name} is missing a Context Provider`);
		}
		return ctx;
	};

	return [Context.Provider, useStrictContext] as const;
}

type AnyProps = Record<string, unknown>;

type DOMMotionProps<T extends HTMLElement = HTMLElement> = Omit<
	HTMLMotionProps<keyof HTMLElementTagNameMap>,
	'ref'
> & { ref?: React.Ref<T> };

type WithAsChild<Base extends object> =
	| (Base & { asChild: true; children: React.ReactElement })
	| (Base & { asChild?: false | undefined });

type SlotProps<T extends HTMLElement = HTMLElement> = {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	children?: any;
} & DOMMotionProps<T>;

function mergeRefs<T>(
	...refs: (React.Ref<T> | undefined)[]
): React.RefCallback<T> {
	return (node) => {
		refs.forEach((ref) => {
			if (!ref) return;
			if (typeof ref === 'function') {
				ref(node);
			} else {
				(ref as React.MutableRefObject<T | null>).current = node;
			}
		});
	};
}

function mergeProps<T extends HTMLElement>(
	childProps: AnyProps,
	slotProps: DOMMotionProps<T>,
): AnyProps {
	const merged: AnyProps = { ...childProps, ...slotProps };

	if (childProps.className || slotProps.className) {
		merged.className = cn(
			childProps.className as string,
			slotProps.className as string,
		);
	}

	if (childProps.style || slotProps.style) {
		merged.style = {
			...(childProps.style as React.CSSProperties),
			...(slotProps.style as React.CSSProperties),
		};
	}

	return merged;
}

function Slot<T extends HTMLElement = HTMLElement>({
	children,
	ref,
	...props
}: SlotProps<T>) {
	const isAlreadyMotion =
		typeof children.type === 'object' &&
		children.type !== null &&
		isMotionComponent(children.type);

	const Base = React.useMemo(
		() =>
			isAlreadyMotion
				? (children.type as React.ElementType)
				: motion.create(children.type as React.ElementType),
		[isAlreadyMotion, children.type],
	);

	if (!React.isValidElement(children)) return null;

	const { ref: childRef, ...childProps } = children.props as AnyProps;

	const mergedProps = mergeProps(childProps, props);

	return (
		<Base {...mergedProps} ref={mergeRefs(childRef as React.Ref<T>, ref)} />
	);
}

type SpringPathConfig = {
	coilCount?: number;
	amplitudeMin?: number;
	amplitudeMax?: number;
	curveRatioMin?: number;
	curveRatioMax?: number;
	bezierOffset?: number;
};

function generateSpringPath(
	x1: number,
	y1: number,
	x2: number,
	y2: number,
	pathConfig: SpringPathConfig = {},
) {
	const {
		coilCount = 8,
		amplitudeMin = 8,
		amplitudeMax = 20,
		curveRatioMin = 0.5,
		curveRatioMax = 1,
		bezierOffset = 8,
	} = pathConfig;

	const dx = x2 - x1;
	const dy = y2 - y1;
	const dist = Math.sqrt(dx * dx + dy * dy);
	if (dist < 2) return `M${x1},${y1}`;
	const d = dist / coilCount;
	const h = Math.max(0.8, 1 - (dist - 40) / 200);
	const amplitude = Math.max(
		amplitudeMin,
		Math.min(amplitudeMax, amplitudeMax * h),
	);
	const curveRatio =
		dist <= 40
			? curveRatioMax
			: dist <= 120
				? curveRatioMax - ((dist - 40) / 80) * (curveRatioMax - curveRatioMin)
				: curveRatioMin;
	const ux = dx / dist,
		uy = dy / dist;
	const perpX = -uy,
		perpY = ux;

	const path: string[] = [];
	for (let i = 0; i < coilCount; i++) {
		const sx = x1 + ux * (i * d);
		const sy = y1 + uy * (i * d);
		const ex = x1 + ux * ((i + 1) * d);
		const ey = y1 + uy * ((i + 1) * d);

		const mx = x1 + ux * ((i + 0.5) * d) + perpX * amplitude;
		const my = y1 + uy * ((i + 0.5) * d) + perpY * amplitude;

		const c1x = sx + d * curveRatio * ux;
		const c1y = sy + d * curveRatio * uy;
		const c2x = mx + ux * bezierOffset;
		const c2y = my + uy * bezierOffset;
		const c3x = mx - ux * bezierOffset;
		const c3y = my - uy * bezierOffset;
		const c4x = ex - d * curveRatio * ux;
		const c4y = ey - d * curveRatio * uy;

		if (i === 0) path.push(`M${sx},${sy}`);
		else path.push(`L${sx},${sy}`);
		path.push(`C${c1x},${c1y} ${c2x},${c2y} ${mx},${my}`);
		path.push(`C${c3x},${c3y} ${c4x},${c4y} ${ex},${ey}`);
	}
	return path.join(' ');
}

function getElementCenter(el: HTMLElement) {
	const rect = el.getBoundingClientRect();
	return {
		x: rect.left + rect.width / 2,
		y: rect.top + rect.height / 2,
	};
}

function getRelativeCenter(el: HTMLElement, container: HTMLElement) {
	const elRect = el.getBoundingClientRect();
	const containerRect = container.getBoundingClientRect();
	return {
		x: elRect.left + elRect.width / 2 - containerRect.left,
		y: elRect.top + elRect.height / 2 - containerRect.top,
	};
}

type SpringContextType = {
	dragElastic?: number;
	containerRef?: React.RefObject<HTMLElement | null>;
	anchorRef: React.RefObject<HTMLElement | null>;
	childRef: React.RefObject<HTMLDivElement | null>;
	springX: MotionValue<number>;
	springY: MotionValue<number>;
	x: MotionValue<number>;
	y: MotionValue<number>;
	isDragging: boolean;
	setIsDragging: (isDragging: boolean) => void;
	pathConfig: SpringPathConfig;
	notifyLayoutChange: () => void;
};

const [LocalSpringProvider, useSpring] =
	getStrictContext<SpringContextType>('SpringContext');

type SpringProviderProps = {
	children: React.ReactNode;
	containerRef?: React.RefObject<HTMLElement | null>;
	anchorRef?: React.RefObject<HTMLElement | null>;
	dragElastic?: number;
	pathConfig?: SpringPathConfig;
	transition?: SpringOptions;
};

function SpringProvider({
	children,
	containerRef,
	anchorRef: anchorRefProp,
	dragElastic = 0.2,
	transition = { stiffness: 200, damping: 16 },
	pathConfig = {},
}: SpringProviderProps) {
	const x = useMotionValue(0);
	const y = useMotionValue(0);

	const springX = useMotionSpring(x, transition);
	const springY = useMotionSpring(y, transition);

	const fallbackAnchorRef = React.useRef<HTMLElement>(null);
	const anchorRef = anchorRefProp ?? fallbackAnchorRef;
	const childRef = React.useRef<HTMLDivElement>(null);
	const pathRef = React.useRef<SVGPathElement>(null);
	const [isDragging, setIsDragging] = React.useState(false);

	const updatePath = React.useCallback(() => {
		const pathEl = pathRef.current;
		const knobEl = childRef.current;
		if (!pathEl || !knobEl) return;

		const container = containerRef?.current ?? null;

		const knob = container
			? getRelativeCenter(knobEl, container)
			: getElementCenter(knobEl);

		let anchor = knob;

		if (anchorRef.current) {
			anchor = container
				? getRelativeCenter(anchorRef.current, container)
				: getElementCenter(anchorRef.current);
		} else if (!container) {
			// Fall back to the knob's rest position when no anchor element is set.
			anchor = {
				x: knob.x - springX.get(),
				y: knob.y - springY.get(),
			};
		} else {
			anchor = {
				x: knob.x - springX.get(),
				y: knob.y - springY.get(),
			};
		}

		pathEl.setAttribute(
			'd',
			generateSpringPath(anchor.x, anchor.y, knob.x, knob.y, pathConfig),
		);
	}, [anchorRef, containerRef, pathConfig, springX, springY]);

	const notifyLayoutChange = React.useCallback(() => {
		updatePath();
	}, [updatePath]);

	React.useEffect(() => {
		document.body.style.cursor = isDragging ? 'grabbing' : '';
		return () => {
			document.body.style.cursor = '';
		};
	}, [isDragging]);

	const value = React.useMemo<SpringContextType>(
		() => ({
			dragElastic,
			containerRef,
			anchorRef,
			childRef,
			springX,
			springY,
			x,
			y,
			isDragging,
			setIsDragging,
			pathConfig,
			notifyLayoutChange,
		}),
		[
			dragElastic,
			containerRef,
			anchorRef,
			springX,
			springY,
			x,
			y,
			isDragging,
			pathConfig,
			notifyLayoutChange,
		],
	);

	return (
		<LocalSpringProvider value={value}>
			<SpringCanvas pathRef={pathRef} updatePath={updatePath} />
			{children}
		</LocalSpringProvider>
	);
}

type SpringCanvasProps = {
	pathRef: React.RefObject<SVGPathElement | null>;
	updatePath: () => void;
};

function SpringCanvas({ pathRef, updatePath }: SpringCanvasProps) {
	const { springX, springY, childRef, anchorRef, containerRef } = useSpring();
	const usesLocalCanvas = Boolean(containerRef);

	const bindLayoutObservers = React.useCallback(() => {
		updatePath();

		const observed = new Set<Element>();
		const ro = new ResizeObserver(updatePath);

		for (const node of [
			containerRef?.current,
			childRef.current,
			anchorRef.current,
		]) {
			if (node && !observed.has(node)) {
				observed.add(node);
				ro.observe(node);
			}
		}

		window.addEventListener('resize', updatePath);
		if (!usesLocalCanvas) {
			window.addEventListener('scroll', updatePath, true);
		}

		return () => {
			ro.disconnect();
			window.removeEventListener('resize', updatePath);
			if (!usesLocalCanvas) {
				window.removeEventListener('scroll', updatePath, true);
			}
		};
	}, [anchorRef, childRef, containerRef, updatePath, usesLocalCanvas]);

	React.useLayoutEffect(() => {
		updatePath();
		const rafIds = [
			requestAnimationFrame(updatePath),
			requestAnimationFrame(() => requestAnimationFrame(updatePath)),
		];
		const cleanupObservers = bindLayoutObservers();

		return () => {
			rafIds.forEach(cancelAnimationFrame);
			cleanupObservers();
		};
	}, [bindLayoutObservers, updatePath]);

	React.useEffect(() => {
		const unsubX = springX.on('change', updatePath);
		const unsubY = springY.on('change', updatePath);
		return () => {
			unsubX();
			unsubY();
		};
	}, [springX, springY, updatePath]);

	return (
		<svg
			width={usesLocalCanvas ? '100%' : '100vw'}
			height={usesLocalCanvas ? '100%' : '100vh'}
			className={cn(
				'pointer-events-none text-[#e3696b]',
				usesLocalCanvas
					? 'absolute inset-0 z-0 overflow-visible!'
					: 'fixed inset-0 z-40',
			)}
			aria-hidden
		>
			<path
				ref={pathRef}
				strokeLinecap="round"
				strokeLinejoin="round"
				stroke="currentColor"
				strokeWidth={2.5}
				fill="none"
			/>
		</svg>
	);
}

type SpringElementProps = WithAsChild<
	Omit<HTMLMotionProps<'div'>, 'children'> & {
		children: React.ReactElement;
		onPullEnd?: (info: {
			offset: { x: number; y: number };
			distance: number;
		}) => void;
	}
>;

function SpringElement({
	ref,
	asChild = false,
	style,
	onDrag,
	onDragStart,
	onDragEnd,
	onPullEnd,
	...props
}: SpringElementProps) {
	const {
		childRef,
		dragElastic,
		isDragging,
		setIsDragging,
		springX,
		springY,
		x,
		y,
		notifyLayoutChange,
	} = useSpring();

	React.useImperativeHandle(ref, () => childRef.current as HTMLDivElement);

	React.useLayoutEffect(() => {
		notifyLayoutChange();
	}, [notifyLayoutChange]);

	const Component = asChild ? Slot : motion.div;

	return (
		<Component
			ref={childRef}
			style={{
				cursor: isDragging ? 'grabbing' : 'grab',
				x: springX,
				y: springY,
				...style,
			}}
			drag
			dragElastic={dragElastic}
			dragMomentum={false}
			onDragStart={(event, info) => {
				setIsDragging(true);
				onDragStart?.(event, info);
			}}
			onDrag={(event, info) => {
				x.set(info.offset.x);
				y.set(info.offset.y);
				onDrag?.(event, info);
			}}
			onDragEnd={(event, info) => {
				onPullEnd?.({
					offset: { x: info.offset.x, y: info.offset.y },
					distance: Math.hypot(info.offset.x, info.offset.y),
				});
				onDragEnd?.(event, info);
				x.set(0);
				y.set(0);
				setIsDragging(false);
				requestAnimationFrame(notifyLayoutChange);
			}}
			{...props}
		/>
	);
}

/** @deprecated Spring is rendered automatically by SpringProvider. */
function Spring() {
	return null;
}

export {
	SpringProvider,
	Spring,
	SpringElement,
	useSpring,
	type SpringProviderProps,
	type SpringElementProps,
	type SpringPathConfig,
	type SpringContextType,
};
```
