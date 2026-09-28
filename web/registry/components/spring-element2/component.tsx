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
