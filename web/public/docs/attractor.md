# Attractor

Physics field where the elements you drop in are pulled toward a fixed point and pushed away by the cursor.

**Interaction.** The elements fall in and clump around the attractor point on load, then scatter as the pointer sweeps through them and drift back once it moves away; individual ones can be picked up and flung by dragging.

- Categories: 3D & Canvas
- Tags: autoplay
- Import: `@/components/ui/attractor`
- Inspiration: Fancy Components (adaptation) — https://www.fancycomponents.dev/docs/components/physics/gravity

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/attractor.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `lodash`
- `matter-js`
- `poly-decomp`
- `svg-path-commander`

## Usage

```tsx
import Attractor, { MatterBody } from "./component";
import { useWindowSize } from "@/hooks/use-window-size";

export default function AttractorPreview() {
	const screenSize = useWindowSize();

	const getImageCount = () => {
		if (screenSize.width < 150) return 50;
		if (screenSize.width < 750) return 60;
		if (screenSize.width < 1500) return 70;
		return 80;
	};

	const getMaxSize = () => {
		if (screenSize.width < 150) return 40;
		if (screenSize.width < 750) return 50;
		return 60;
	};

	const getMinSize = () => {
		if (screenSize.width < 150) return 10;
		if (screenSize.width < 750) return 20;
		return 20;
	};

	return (
		<div className="w-full h-full flex flex-col relative justify-center items-center md:items-end bg-background">
			<div>
				<p className="z-20 text-2xl sm:text-3xl md:text-3xl text-foreground dark:text-muted md:pr-24">
					join the <span className="font-calendas  italic">community</span>
				</p>
			</div>
			<Attractor
				attractorPoint={{ x: "33%", y: "50%" }}
				attractorStrength={0.0005}
				cursorStrength={-0.004}
				cursorFieldRadius={screenSize.width < 150 ? 100 : 200}
				className="w-full h-full"
			>
				{[...Array(getImageCount())].map((_, i) => {
					const size = Math.max(
						getMinSize(),
						Math.random() * getMaxSize()
					);
					return (
						<MatterBody
							key={i + "attractor-example"}
							matterBodyOptions={{ friction: 0.5, restitution: 0.2 }}
							x={`${Math.random() * 100}%`}
							y={`${Math.random() * 30}%`}
						>
							<img
								src={`https://randomuser.me/api/portraits/${
									i % 2 === 0 ? "men" : "women"
								}/${i}.jpg`}
								alt={`Avatar ${i}`}
								className="rounded-full object-cover hover:cursor-pointer"
								style={{
									width: `${size}px`,
									height: `${size}px`,
								}}
							/>
						</MatterBody>
					);
				})}
			</Attractor>
		</div>
	);
}
```

## Source

### `components/ui/attractor.tsx`

```tsx
"use client";

import {
	createContext,
	forwardRef,
	ReactNode,
	useCallback,
	useContext,
	useEffect,
	useImperativeHandle,
	useRef,
	useState,
} from "react";

import { calculatePosition } from "@/lib/calculate-position";
import { cn } from "@/lib/utils";
import { parsePathToVertices } from "@/lib/parse-path-to-vertices";
import { useMousePositionRef } from "@/hooks/use-mouse-position";
import { debounce } from "lodash";
import Matter, {
	Bodies,
	Body,
	Common,
	Engine,
	Events,
	Render,
	Runner,
	World,
} from "matter-js";

// Credit:
// https://www.fancycomponents.dev/docs/components/physics/gravity

type GravityProps = {
	children: ReactNode;
	debug?: boolean;
	attractorPoint?: { x: number | string; y: number | string };
	attractorStrength?: number;
	cursorStrength?: number;
	cursorFieldRadius?: number;
	resetOnResize?: boolean;
	addTopWall?: boolean;
	autoStart?: boolean;
	className?: string;
};

type PhysicsBody = {
	element: HTMLElement;
	body: Matter.Body;
	props: MatterBodyProps;
};

type MatterBodyProps = {
	children: ReactNode;
	matterBodyOptions?: Matter.IBodyDefinition;
	isDraggable?: boolean;
	bodyType?: "rectangle" | "circle" | "svg";
	sampleLength?: number;
	x?: number | string;
	y?: number | string;
	angle?: number;
	className?: string;
};

export type GravityRef = {
	start: () => void;
	stop: () => void;
	reset: () => void;
};

const GravityContext = createContext<{
	registerElement: (
		id: string,
		element: HTMLElement,
		props: MatterBodyProps
	) => void;
	unregisterElement: (id: string) => void;
} | null>(null);

export const MatterBody = ({
	children,
	className,
	matterBodyOptions = {
		friction: 0.1,
		restitution: 0.1,
		density: 0.001,
		isStatic: false,
	},
	bodyType = "rectangle",
	isDraggable = true,
	sampleLength = 15,
	x = 0,
	y = 0,
	angle = 0,
	...props
}: MatterBodyProps) => {
	const elementRef = useRef<HTMLDivElement>(null);
	const idRef = useRef(Math.random().toString(36).substring(7));
	const context = useContext(GravityContext);

	useEffect(() => {
		if (!elementRef.current || !context) return;
		context.registerElement(idRef.current, elementRef.current, {
			children,
			matterBodyOptions,
			bodyType,
			sampleLength,
			isDraggable,
			x,
			y,
			angle,
			...props,
		});

		return () => context.unregisterElement(idRef.current);
	}, [props, children, matterBodyOptions, isDraggable]);

	return (
		<div ref={elementRef} className={cn("absolute", className)}>
			{children}
		</div>
	);
};

const Attractor = forwardRef<GravityRef, GravityProps>(
	(
		{
			children,
			debug = false,
			attractorPoint = { x: 0.5, y: 0.5 },
			attractorStrength = 0.001,
			cursorStrength = 0.0005,
			cursorFieldRadius = 100,
			resetOnResize = true,
			addTopWall = true,
			autoStart = true,
			className,
			...props
		},
		ref
	) => {
		const canvas = useRef<HTMLDivElement>(null);
		const engine = useRef(Engine.create());
		const render = useRef<Render>();
		const runner = useRef<Runner>();
		const bodiesMap = useRef(new Map<string, PhysicsBody>());
		const frameId = useRef<number>();
		const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });
		const mouseRef = useMousePositionRef(canvas);

		const isRunning = useRef(false);

		// Register Matter.js body in the physics world
		const registerElement = useCallback(
			(id: string, element: HTMLElement, props: MatterBodyProps) => {
				if (!canvas.current) return;
				const width = element.offsetWidth;
				const height = element.offsetHeight;
				const canvasRect = canvas.current!.getBoundingClientRect();

				const angle = (props.angle || 0) * (Math.PI / 180);

				const x = calculatePosition(props.x, canvasRect.width, width);
				const y = calculatePosition(props.y, canvasRect.height, height);

				let body;
				if (props.bodyType === "circle") {
					const radius = Math.max(width, height) / 2;
					body = Bodies.circle(x, y, radius, {
						...props.matterBodyOptions,
						angle: angle,
						render: {
							fillStyle: debug ? "#888888" : "#00000000",
							strokeStyle: debug ? "#333333" : "#00000000",
							lineWidth: debug ? 3 : 0,
						},
					});
				} else if (props.bodyType === "svg") {
					const paths = element.querySelectorAll("path");
					const vertexSets: Matter.Vector[][] = [];

					paths.forEach((path) => {
						const d = path.getAttribute("d");
						const p = parsePathToVertices(d!, props.sampleLength);
						vertexSets.push(p);
					});

					body = Bodies.fromVertices(x, y, vertexSets, {
						...props.matterBodyOptions,
						angle: angle,
						render: {
							fillStyle: debug ? "#888888" : "#00000000",
							strokeStyle: debug ? "#333333" : "#00000000",
							lineWidth: debug ? 3 : 0,
						},
					});
				} else {
					body = Bodies.rectangle(x, y, width, height, {
						...props.matterBodyOptions,
						angle: angle,
						render: {
							fillStyle: debug ? "#888888" : "#00000000",
							strokeStyle: debug ? "#333333" : "#00000000",
							lineWidth: debug ? 3 : 0,
						},
					});
				}

				if (body) {
					World.add(engine.current.world, [body]);
					bodiesMap.current.set(id, { element, body, props });
				}
			},
			[debug]
		);

		// Unregister Matter.js body from the physics world
		const unregisterElement = useCallback((id: string) => {
			const body = bodiesMap.current.get(id);
			if (body) {
				World.remove(engine.current.world, body.body);
				bodiesMap.current.delete(id);
			}
		}, []);

		// Keep react elements in sync with the physics world
		const updateElements = useCallback(() => {
			bodiesMap.current.forEach(({ element, body }) => {
				const { x, y } = body.position;
				const rotation = body.angle * (180 / Math.PI);

				element.style.transform = `translate(${
					x - element.offsetWidth / 2
				}px, ${y - element.offsetHeight / 2}px) rotate(${rotation}deg)`;
			});

			frameId.current = requestAnimationFrame(updateElements);
		}, []);

		const initializeRenderer = useCallback(() => {
			if (!canvas.current) return;

			const height = canvas.current.offsetHeight;
			const width = canvas.current.offsetWidth;

			Common.setDecomp(require("poly-decomp"));

			// Remove default gravity
			engine.current.gravity.x = 0;
			engine.current.gravity.y = 0;

			render.current = Render.create({
				element: canvas.current,
				engine: engine.current,
				options: {
					width,
					height,
					wireframes: false,
					background: "#00000000",
				},
			});

			// Add walls
			const walls = [
				// Floor
				Bodies.rectangle(width / 2, height + 10, width, 20, {
					isStatic: true,
					friction: 1,
					render: {
						visible: debug,
					},
				}),

				// Right wall
				Bodies.rectangle(width + 10, height / 2, 20, height, {
					isStatic: true,
					friction: 1,
					render: {
						visible: debug,
					},
				}),

				// Left wall
				Bodies.rectangle(-10, height / 2, 20, height, {
					isStatic: true,
					friction: 1,
					render: {
						visible: debug,
					},
				}),
			];

			const topWall = addTopWall
				? Bodies.rectangle(width / 2, -10, width, 20, {
						isStatic: true,
						friction: 1,
						render: {
							visible: debug,
						},
					})
				: null;

			if (topWall) {
				walls.push(topWall);
			}

			World.add(engine.current.world, [...walls]);

			runner.current = Runner.create();
			Render.run(render.current);
			updateElements();
			runner.current.enabled = false;

			if (autoStart) {
				runner.current.enabled = true;
				startEngine();
			}

			// Add force application before update
			Events.on(engine.current, "beforeUpdate", () => {
				const bodies = engine.current.world.bodies.filter(
					(body) => !body.isStatic
				);

				// Calculate attractor position in pixels
				const attractorX =
					typeof attractorPoint.x === "string"
						? (width * parseFloat(attractorPoint.x)) / 100
						: width * attractorPoint.x;
				const attractorY =
					typeof attractorPoint.y === "string"
						? (height * parseFloat(attractorPoint.y)) / 100
						: height * attractorPoint.y;

				bodies.forEach((body) => {
					// Apply attractor force
					const dx = attractorX - body.position.x;
					const dy = attractorY - body.position.y;
					const distance = Math.sqrt(dx * dx + dy * dy);

					if (distance > 0) {
						const force = {
							x: (dx / distance) * attractorStrength * body.mass,
							y: (dy / distance) * attractorStrength * body.mass,
						};
						Body.applyForce(body, body.position, force);
					}

					// Apply cursor force if mouse is present
					if (
						mouseRef.current?.x &&
						mouseRef.current?.y &&
						mouseRef.current.x > 0 &&
						mouseRef.current.y > 0
					) {
						const mdx = mouseRef.current.x - body.position.x;
						const mdy = mouseRef.current.y - body.position.y;
						const mouseDistance = Math.sqrt(mdx * mdx + mdy * mdy);

						if (mouseDistance > 0 && mouseDistance < cursorFieldRadius) {
							const mouseForce = {
								x: (mdx / mouseDistance) * cursorStrength * body.mass,
								y: (mdy / mouseDistance) * cursorStrength * body.mass,
							};
							Body.applyForce(body, body.position, mouseForce);
						}
					}
				});
			});
		}, [
			updateElements,
			debug,
			autoStart,
			attractorPoint,
			attractorStrength,
			cursorStrength,
		]);

		// Clear the Matter.js world
		const clearRenderer = useCallback(() => {
			if (frameId.current) {
				cancelAnimationFrame(frameId.current);
			}

			if (render.current) {
				Render.stop(render.current);
				render.current.canvas.remove();
			}

			if (runner.current) {
				Runner.stop(runner.current);
			}

			if (engine.current) {
				World.clear(engine.current.world, false);
				Engine.clear(engine.current);
			}

			bodiesMap.current.clear();
		}, []);

		const handleResize = useCallback(() => {
			if (!canvas.current || !resetOnResize) return;

			const newWidth = canvas.current.offsetWidth;
			const newHeight = canvas.current.offsetHeight;

			setCanvasSize({ width: newWidth, height: newHeight });

			// Clear and reinitialize
			clearRenderer();
			initializeRenderer();
		}, [clearRenderer, initializeRenderer, resetOnResize]);

		const startEngine = useCallback(() => {
			if (runner.current) {
				runner.current.enabled = true;

				Runner.run(runner.current, engine.current);
			}
			if (render.current) {
				Render.run(render.current);
			}
			frameId.current = requestAnimationFrame(updateElements);
			isRunning.current = true;
		}, [updateElements, canvasSize]);

		const stopEngine = useCallback(() => {
			if (!isRunning.current) return;

			if (runner.current) {
				Runner.stop(runner.current);
			}
			if (render.current) {
				Render.stop(render.current);
			}
			if (frameId.current) {
				cancelAnimationFrame(frameId.current);
			}
			isRunning.current = false;
		}, []);

		const reset = useCallback(() => {
			stopEngine();
			bodiesMap.current.forEach(({ element, body, props }) => {
				body.angle = props.angle || 0;

				const x = calculatePosition(
					props.x,
					canvasSize.width,
					element.offsetWidth
				);
				const y = calculatePosition(
					props.y,
					canvasSize.height,
					element.offsetHeight
				);
				body.position.x = x;
				body.position.y = y;
			});
			updateElements();
			handleResize();
		}, []);

		useImperativeHandle(
			ref,
			() => ({
				start: startEngine,
				stop: stopEngine,
				reset,
			}),
			[startEngine, stopEngine]
		);

		useEffect(() => {
			if (!resetOnResize) return;

			const debouncedResize = debounce(handleResize, 500);
			window.addEventListener("resize", debouncedResize);

			return () => {
				window.removeEventListener("resize", debouncedResize);
				debouncedResize.cancel();
			};
		}, [handleResize, resetOnResize]);

		useEffect(() => {
			initializeRenderer();
			return clearRenderer;
		}, [initializeRenderer, clearRenderer]);

		return (
			<GravityContext.Provider
				value={{ registerElement, unregisterElement }}
			>
				<div
					ref={canvas}
					className={cn(className, "absolute top-0 left-0 w-full h-full")}
					{...props}
				>
					{children}
				</div>
			</GravityContext.Provider>
		);
	}
);

export default Attractor;
```

### `hooks/use-mouse-position.ts`

```tsx
import { RefObject, useEffect, useRef } from "react";

export const useMousePositionRef = (
	containerRef?: RefObject<HTMLElement | SVGElement>
) => {
	const positionRef = useRef({ x: 0, y: 0 });

	useEffect(() => {
		const updatePosition = (x: number, y: number) => {
			if (containerRef && containerRef.current) {
				const rect = containerRef.current.getBoundingClientRect();
				const relativeX = x - rect.left;
				const relativeY = y - rect.top;

				// Calculate relative position even when outside the container
				positionRef.current = { x: relativeX, y: relativeY };
			} else {
				positionRef.current = { x, y };
			}
		};

		const handleMouseMove = (ev: MouseEvent) => {
			updatePosition(ev.clientX, ev.clientY);
		};

		const handleTouchMove = (ev: TouchEvent) => {
			const touch = ev.touches[0];
			updatePosition(touch.clientX, touch.clientY);
		};

		// Listen for both mouse and touch events
		window.addEventListener("mousemove", handleMouseMove);
		window.addEventListener("touchmove", handleTouchMove);

		return () => {
			window.removeEventListener("mousemove", handleMouseMove);
			window.removeEventListener("touchmove", handleTouchMove);
		};
	}, [containerRef]);


	return positionRef;
};
```

### `lib/calculate-position.ts`

```tsx
export function calculatePosition(
    value: number | string | undefined,
    containerSize: number,
    elementSize: number
): number {
    // Handle percentage strings (e.g. "50%")
    if (typeof value === "string" && value.endsWith("%")) {
        const percentage = parseFloat(value) / 100
        return containerSize * percentage
    }

    // Handle direct pixel values
    if (typeof value === "number") {
        return value
    }

    // If no value provided, center the element
    return (containerSize - elementSize) / 2
}
```

### `lib/parse-path-to-vertices.ts`

```tsx
import SVGPathCommander from "svg-path-commander"

// Function to convert SVG path `d` to vertices
export function parsePathToVertices(path: string, sampleLength = 15) {
    // Convert path to absolute commands
    const commander = new SVGPathCommander(path)

    const points: { x: number; y: number }[] = []
    let lastPoint: { x: number; y: number } | null = null

    // Get total length of the path
    const totalLength = commander.getTotalLength()
    let length = 0

    // Sample points along the path
    while (length < totalLength) {
        const point = commander.getPointAtLength(length)

        // Only add point if it's different from the last one
        if (!lastPoint || point.x !== lastPoint.x || point.y !== lastPoint.y) {
            points.push({ x: point.x, y: point.y })
            lastPoint = point
        }

        length += sampleLength
    }

    // Ensure we get the last point
    const finalPoint = commander.getPointAtLength(totalLength)
    if (
        lastPoint &&
        (finalPoint.x !== lastPoint.x || finalPoint.y !== lastPoint.y)
    ) {
        points.push({ x: finalPoint.x, y: finalPoint.y })
    }

    return points
}
```

## Attribution

Source: Fancy Components · Original: https://www.fancycomponents.dev/docs/components/physics/gravity

Adapted from the original. Credit the original author when you ship this.
