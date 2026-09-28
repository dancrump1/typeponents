import React, { RefObject, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
	motion,
	useAnimationFrame,
	useMotionValue,
	useScroll,
	useSpring,
	useTransform,
	useVelocity,
} from "motion/react";
import { cn } from "@/lib/utils";



// Detect mobile device for performance optimizations
const isMobile = typeof window !== "undefined" &&
	(window.innerWidth < 768 || /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));

type MarqueeAlongPathProps = {
	children?: React.ReactNode;
	path: string;
	baseVelocity?: number;
	repeat?: number;
	zIndexBase?: number;
	enableRollingZIndex?: boolean;
	scrollContainerRef?: React.RefObject<HTMLDivElement | null>;
	scrollContainer?: RefObject<HTMLDivElement>;
	className?: string;
	direction?: "normal" | "reverse";
	slowDownSpringConfig?: { damping: number; stiffness: number };
	useScrollVelocity?: boolean;
	scrollSpringConfig?: { damping: number; stiffness: number };
	width?: number | string;
	height?: number | string;
	showPath?: boolean;
};

type MarqueeItemProps = {
	baseOffset: ReturnType<typeof useMotionValue<number>>;
	itemIndex: number;
	totalItems: number;
	repeatIndex: number;
	zIndexBase: number;
	scaledPath: string;
	isHovered: React.MutableRefObject<boolean>;
	children: React.ReactNode;
};

/**
 * Wraps a number between a min and max value
 * @param min The minimum value
 * @param max The maximum value
 * @param value The value to wrap
 * @returns The wrapped value between min and max
 */
const wrap = (min: number, max: number, value: number): number => {
	const range = max - min;
	return ((((value - min) % range) + range) % range) + min;
};



const MarqueeItem = ({
	baseOffset,
	itemIndex,
	totalItems,
	repeatIndex,
	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	zIndexBase: _zIndexBase, // Available for future use with dynamic z-index
	scaledPath,
	isHovered,
	children,
}: MarqueeItemProps) => {
	const itemOffset = useTransform(baseOffset, (v: number) => {
		const position = (itemIndex * 100) / totalItems;
		const wrappedValue = wrap(0, 100, v + position);
		return `${wrappedValue}%`;
	});

	// Use with multiple images when svg causes them to overlap
	// Note: zIndex transform is available but not currently used in style
	// To enable dynamic z-index based on position, uncomment:
	// const zIndex = useTransform(itemOffset, (v) => {
	// 	const progress = parseFloat(v.replace("%", ""));
	// 	return Math.floor(zIndexBase + progress);
	// });
	// Then use it in the style prop: zIndex: zIndex

	return (
		<motion.div
			className="marquee-item absolute top-0 left-0"
			style={{
				offsetPath: `path('${scaledPath}')`,
				offsetDistance: itemOffset,
				// "auto" makes element follow path direction
				// The smooth curveCardinal path should make rotation changes gradual
				offsetRotate: "auto",
				zIndex: 1,
				// GPU acceleration hints for better performance
				willChange: "transform",
				transform: "translateZ(0)", // Force GPU acceleration
			}}
			aria-hidden={repeatIndex > 0}
			onMouseEnter={() => (isHovered.current = true)}
			onMouseLeave={() => (isHovered.current = false)}
		>
			{children}
		</motion.div>
	);
};

const MarqueeAlongPath = ({
	children = (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="18"
			height="24"
			viewBox="0 0 18 24"
			fill="none"
			style={{ rotate: "90deg" }}
			preserveAspectRatio="none"
		>
			<path d="M9 0L18 24L9 18.9474L0 24L9 0Z" fill="#FFBEA5" />
		</svg>
	),
	path,
	baseVelocity = 5,
	direction = "normal",
	slowDownSpringConfig = { damping: 50, stiffness: 400 },
	useScrollVelocity = false,
	scrollSpringConfig = { damping: 50, stiffness: 400 },
	scrollContainer,
	repeat = 0,
	zIndexBase = 1,
	className,
	width,
	height,
}: MarqueeAlongPathProps) => {
	const baseOffset = useMotionValue(0);

	// Scroll tracking
	const { scrollY } = useScroll({
		container: scrollContainer as RefObject<HTMLDivElement>,
	});

	const scrollVelocity = useVelocity(scrollY);
	const smoothVelocity = useSpring(scrollVelocity, scrollSpringConfig);

	const items = useMemo(() => {
		const childrenArray = React.Children.toArray(children);

		return childrenArray.flatMap((child, childIndex) =>
			Array.from({ length: repeat }, (_, repeatIndex) => {
				const itemIndex = repeatIndex * childrenArray.length + childIndex;
				const key = `${childIndex}-${repeatIndex}`;
				return {
					child,
					childIndex,
					repeatIndex,
					itemIndex,
					key,
				};
			})
		);
	}, [children, repeat]);

	// Hover and drag state tracking
	const isHovered = useRef(false);

	// Direction factor for changing direction based on scroll or drag
	const directionFactor = useRef(direction === "normal" ? 1 : -1);

	// Motion values for animation
	const hoverFactorValue = useMotionValue(1);
	const defaultVelocity = useMotionValue(1);
	const smoothHoverFactor = useSpring(hoverFactorValue, slowDownSpringConfig);

	// Transform scroll velocity into a factor that affects marquee speed
	const velocityFactor = useTransform(
		useScrollVelocity ? smoothVelocity : defaultVelocity,
		[0, 1000],
		[0, 5],
		{ clamp: false }
	);
	// Throttle animation frame updates on mobile for better performance
	const lastUpdateTime = useRef(0);
	const throttleMs = isMobile ? 16 : 0; // ~60fps on mobile, unlimited on desktop

	useAnimationFrame((time, delta) => {
		// Throttle updates on mobile
		if (isMobile && time - lastUpdateTime.current < throttleMs) {
			return;
		}
		lastUpdateTime.current = time;

		if (isHovered.current) {
			hoverFactorValue.set(0.3);
		} else {
			hoverFactorValue.set(1);
		}

		let moveBy =
			((baseVelocity * delta) / 1000) *
			directionFactor.current *
			smoothHoverFactor.get();

		if (velocityFactor.get() < 0) {
			directionFactor.current = -1;
		} else if (velocityFactor.get() > 0) {
			directionFactor.current = 1;
		}

		moveBy += directionFactor.current * moveBy * velocityFactor.get();

		baseOffset.set(baseOffset.get() + moveBy);
	});

	const wrapperRef = useRef<HTMLDivElement>(null);

	const marqueeContainerRef = useRef<HTMLDivElement>(null);
	// Original SVG dimensions
	// TODO: Base svg h/w on the svg we pass in to the component
	const originalWidth = typeof width === "string" ? parseFloat(width) || 175 : (width || 175);
	const originalHeight = typeof height === "string" ? parseFloat(height) || 165 : (height || 165);

	// Scale method #2 with D3
	const [scaledPath, setScaledPath] = useState<string | null>(null);
	const [currentViewBox, setCurrentViewBox] = useState(
		`0 0 ${originalWidth} ${originalHeight}`
	);

	// ResizeObserver for immediate size updates (better than window resize)
	const resizeObserverRef = useRef<ResizeObserver | null>(null);
	const pathCalculationTimeoutRef = useRef<NodeJS.Timeout | null>(null);
	const lastDimensionsRef = useRef<{ width: number; height: number } | null>(null);
	const workerRef = useRef<Worker | null>(null);
	const idleCallbackRef = useRef<number | null>(null);

	const updatePath = useCallback(() => {
		const wrapper = wrapperRef.current;
		if (!wrapper) return;

		const containerWidth = wrapper.clientWidth;
		const containerHeight = wrapper.clientHeight;

		// Check if dimensions actually changed significantly (avoid unnecessary recalculations)
		const lastDims = lastDimensionsRef.current;
		if (lastDims) {
			const widthDiff = Math.abs(containerWidth - lastDims.width);
			const heightDiff = Math.abs(containerHeight - lastDims.height);
			// Only recalculate if change is significant (more than 1px)
			if (widthDiff < 1 && heightDiff < 1) {
				return;
			}
		}
		lastDimensionsRef.current = { width: containerWidth, height: containerHeight };

		// Immediately update viewBox for instant visual feedback
		setCurrentViewBox(`0 0 ${containerWidth} ${containerHeight}`);

		// Clear any pending path calculations
		if (pathCalculationTimeoutRef.current) {
			clearTimeout(pathCalculationTimeoutRef.current);
		}

		// Terminate any existing worker to avoid race conditions
		if (workerRef.current) {
			workerRef.current.terminate();
			workerRef.current = null;
		}

		// Debounce path calculation with a longer delay to prevent blocking
		pathCalculationTimeoutRef.current = setTimeout(() => {
			// Bundled worker URL (Turbopack/webpack must resolve this statically)
			const worker = new Worker(
				new URL("./marquee-path-worker.ts", import.meta.url),
				{ type: "module" }
			);
			workerRef.current = worker;

			worker.postMessage({
				path,
				originalWidth,
				originalHeight,
				newWidth: containerWidth,
				newHeight: containerHeight,
			});

			worker.onmessage = (e) => {
				setScaledPath(e.data);
				worker.terminate();
				workerRef.current = null;
			};

			worker.onerror = (error) => {
				console.error('Path worker error:', error);
				// Fallback to original path if worker fails
				setScaledPath(path);
				worker.terminate();
				workerRef.current = null;
			};
		}, isMobile ? 300 : 200); // Proper debounce: 300ms on mobile, 200ms on desktop
	}, [path, originalWidth, originalHeight]);

	useEffect(() => {
		const wrapper = wrapperRef.current;
		if (!wrapper) {
			// If wrapper isn't ready, try again after a short delay
			const timeoutId = setTimeout(() => {
				const retryWrapper = wrapperRef.current;
				if (retryWrapper) {
					updatePath();
				}
			}, 100);
			return () => clearTimeout(timeoutId);
		}

		// Defer initial path calculation to avoid blocking render
		// Use requestIdleCallback when available, otherwise setTimeout
		const scheduleInitialCalculation = () => {
			if (typeof requestIdleCallback !== 'undefined') {
				idleCallbackRef.current = requestIdleCallback(() => {
					updatePath();
				}, { timeout: 1000 });
			} else {
				// Fallback: defer with setTimeout to yield to main thread
				setTimeout(() => {
					updatePath();
				}, 100);
			}
		};

		scheduleInitialCalculation();

		// Use ResizeObserver for more efficient and immediate resize detection
		if (typeof ResizeObserver !== "undefined") {
			resizeObserverRef.current = new ResizeObserver((entries) => {
				// Only process if size actually changed
				for (const entry of entries) {
					if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
						updatePath();
					}
				}
			});

			resizeObserverRef.current.observe(wrapper);
		} else {
			// Fallback to window resize for older browsers
			const handleResize = () => {
				updatePath();
			};

			window.addEventListener("resize", handleResize, { passive: true });
			return () => {
				window.removeEventListener("resize", handleResize);
			};
		}

		return () => {
			if (resizeObserverRef.current) {
				resizeObserverRef.current.disconnect();
			}
			if (pathCalculationTimeoutRef.current) {
				clearTimeout(pathCalculationTimeoutRef.current);
			}
			if (idleCallbackRef.current !== null && typeof cancelIdleCallback !== 'undefined') {
				cancelIdleCallback(idleCallbackRef.current);
				idleCallbackRef.current = null;
			}
			if (workerRef.current) {
				workerRef.current.terminate();
				workerRef.current = null;
			}
		};
	}, [updatePath]);

	return (
		<div
			className={cn("w-full h-full relative", className)}
			ref={wrapperRef}
			style={{
				// GPU acceleration hints
				willChange: "transform",
				transform: "translateZ(0)",
			}}
		>
			{scaledPath ? (
				<>
					<svg
						width="100%"
						height="100%"
						viewBox={currentViewBox}
						fill="none"
						xmlns="http://www.w3.org/2000/svg"
						style={{
							// Optimize SVG rendering
							shapeRendering: isMobile ? "optimizeSpeed" : "geometricPrecision",
						}}
					>
						<path
							d={scaledPath}
							fill={"none"}
							stroke="#EEE7E4"
							strokeWidth={4}
						/>
					</svg>
					<div
						className="marquee-container absolute top-0 left-0 w-full h-full"
						ref={marqueeContainerRef}
						style={{
							// GPU acceleration for container
							willChange: "transform",
							transform: "translateZ(0)",
						}}
					>
						{items.map(({ child, repeatIndex, itemIndex, key }) => (
							<MarqueeItem
								key={key}
								baseOffset={baseOffset}
								itemIndex={itemIndex}
								totalItems={items.length}
								repeatIndex={repeatIndex}
								zIndexBase={zIndexBase}
								scaledPath={scaledPath}
								isHovered={isHovered}
							>
								{child}
							</MarqueeItem>
						))}
					</div>
				</>
			) : (
				<svg
					width="100%"
					height="100%"
					viewBox={`0 0 ${originalWidth} ${originalHeight}`}
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
					preserveAspectRatio="none"
					className="opacity-50"
					style={{
						shapeRendering: isMobile ? "optimizeSpeed" : "geometricPrecision",
					}}
				>
					<path
						d={path}
						fill={"none"}
						stroke="#EEE7E4"
						strokeWidth={4}
					/>
				</svg>
			)}
		</div>
	);
};

export default MarqueeAlongPath;
