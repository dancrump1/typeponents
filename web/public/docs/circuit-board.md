# Circuit Board

- Categories: Backgrounds
- Tags: canvas, cursor-tracking, autoplay
- Import: `@/components/ui/circuit-board`
- Inspiration: ZenUI (adaptation) — https://zenui.net/

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/circuit-board.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Usage

```tsx
import React from "react";

import CircuitBoard from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<CircuitBoard>
				<div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-center max-w-[700px] mx-auto px-5 py-10 md:py-0 lg:lg:px-0 text-white">
					<button className="py-1.5 pl-5 backdrop-blur-md pr-6 border-gray-600 rounded-full text-[0.9rem] border mb-4">
						✨ Introducing dbs
					</button>

					<h1 className="text-[2rem] lg:text-[3rem] font-bold leading-[40px] lg:leading-[50px]">
						Open-Source UI Components & Templates Library
					</h1>

					<p className="text-white/80 max-w-[700px] mt-3">
						dbs is an Tailwind CSS components library for any needs. Comes
						with UI examples & blocks, templates, Icons, Color Palette and
						more.
					</p>

					<div className="flex items-center flex-col md:flex-row gap-3 justify-center 425px:gap-6 mt-10 md:mt-12">
						<button className="bg-[#0FABCA] pl-5 pr-4 border border-[#0FABCA] rounded-lg py-3 flex items-center gap-2 text-[1rem] group">
							Browse Components
						</button>
						<button className="border-2 border-[#0FABCA] pl-5 pr-4 rounded-lg py-3 flex items-center gap-2 text-[1rem] group">
							Browse Templates
						</button>
					</div>
				</div>
			</CircuitBoard>
			;{" "}
		</div>
	);
}
```

## Source

### `components/ui/circuit-board.tsx`

```tsx
import { useEffect, useRef, useState } from "react";

// Credit:
// https://zenui.net/

const CircuitBoard = ({ children }) => {
	const canvasRef = useRef(null);
	const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
	const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
	const circuitNodesRef = useRef([]);
	const circuitPathsRef = useRef([]);
	const animationRef = useRef(null);

	useEffect(() => {
		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		const handleResize = () => {
			const { innerWidth, innerHeight, devicePixelRatio = 1 } = window;

			canvas.width = innerWidth * devicePixelRatio;
			canvas.height = innerHeight * devicePixelRatio;
			canvas.style.width = `${innerWidth}px`;
			canvas.style.height = `${innerHeight}px`;

			ctx.setTransform(1, 0, 0, 1, 0, 0);
			ctx.scale(devicePixelRatio, devicePixelRatio);

			setDimensions({ width: innerWidth, height: innerHeight });
			generateCircuit(innerWidth, innerHeight);
		};

		const generateCircuit = (width, height) => {
			const nodeCount = width < 768 ? 30 : 50;
			const nodes = [];
			const gridSize = Math.sqrt(nodeCount);
			const cellWidth = width / gridSize;
			const cellHeight = height / gridSize;

			for (let i = 0; i < gridSize; i++) {
				for (let j = 0; j < gridSize; j++) {
					const x =
						i * cellWidth +
						Math.random() * (cellWidth * 0.6) +
						cellWidth * 0.2;
					const y =
						j * cellHeight +
						Math.random() * (cellHeight * 0.6) +
						cellHeight * 0.2;

					nodes.push({
						x,
						y,
						size: Math.random() * 3 + 2,
						isActive: false,
						activationLevel: 0,
					});
				}
			}

			const paths = [];
			for (let i = 0; i < nodes.length; i++) {
				const node = nodes[i];
				const connections = findClosestNodes(
					node,
					nodes,
					2 + Math.floor(Math.random() * 3)
				);
				for (const target of connections) {
					const exists = paths.some(
						(p) =>
							(p.from === i && p.to === target) ||
							(p.from === target && p.to === i)
					);
					if (!exists && i !== target) {
						paths.push({
							from: i,
							to: target,
							isActive: false,
							activationLevel: 0,
						});
					}
				}
			}

			circuitNodesRef.current = nodes;
			circuitPathsRef.current = paths;
		};

		const findClosestNodes = (node, nodes, count) => {
			const distances = nodes.map((n, index) => {
				const dx = node.x - n.x;
				const dy = node.y - n.y;
				return { index, distance: Math.sqrt(dx * dx + dy * dy) };
			});

			return distances
				.filter((d) => d.distance > 0)
				.sort((a, b) => a.distance - b.distance)
				.slice(0, count)
				.map((d) => d.index);
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
			if (animationRef.current) cancelAnimationFrame(animationRef.current);
		};
	}, []);

	useEffect(() => {
		const handleMouseMove = (e) => {
			const rect = canvasRef.current.getBoundingClientRect();
			const x = e.clientX - rect.left;
			const y = e.clientY - rect.top;
			setMousePosition({ x, y });
		};

		window.addEventListener("mousemove", handleMouseMove);
		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	useEffect(() => {
		if (!dimensions.width) return;

		const canvas = canvasRef.current;
		const ctx = canvas.getContext("2d");

		const animate = () => {
			ctx.clearRect(0, 0, dimensions.width, dimensions.height);

			const nodes = circuitNodesRef.current;
			const paths = circuitPathsRef.current;

			for (let i = 0; i < nodes.length; i++) {
				const node = nodes[i];
				const dx = node.x - mousePosition.x;
				const dy = node.y - mousePosition.y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (distance < 150) {
					node.isActive = true;
					node.activationLevel = Math.min(1, node.activationLevel + 0.05);
				} else {
					node.activationLevel = Math.max(0, node.activationLevel - 0.02);
					if (node.activationLevel <= 0) node.isActive = false;
				}
			}

			for (const path of paths) {
				const fromNode = nodes[path.from];
				const toNode = nodes[path.to];

				if (fromNode.isActive || toNode.isActive) {
					path.isActive = true;
					path.activationLevel = Math.min(1, path.activationLevel + 0.03);
				} else {
					path.activationLevel = Math.max(0, path.activationLevel - 0.01);
					if (path.activationLevel <= 0) path.isActive = false;
				}
			}

			ctx.strokeStyle = "rgba(50, 50, 70, 0.3)";
			ctx.lineWidth = 1;
			for (const path of paths) {
				if (!path.isActive) {
					const fromNode = nodes[path.from];
					const toNode = nodes[path.to];
					ctx.beginPath();
					ctx.moveTo(fromNode.x, fromNode.y);
					ctx.lineTo(toNode.x, toNode.y);
					ctx.stroke();
				}
			}

			for (const path of paths) {
				if (path.isActive && path.activationLevel > 0) {
					const fromNode = nodes[path.from];
					const toNode = nodes[path.to];

					ctx.strokeStyle = `rgba(0, 200, 255, ${path.activationLevel * 0.2})`;
					ctx.lineWidth = 3;
					ctx.beginPath();
					ctx.moveTo(fromNode.x, fromNode.y);
					ctx.lineTo(toNode.x, toNode.y);
					ctx.stroke();

					ctx.strokeStyle = `rgba(100, 220, 255, ${path.activationLevel})`;
					ctx.lineWidth = 1;
					ctx.beginPath();
					ctx.moveTo(fromNode.x, fromNode.y);
					ctx.lineTo(toNode.x, toNode.y);
					ctx.stroke();
				}
			}

			for (const node of nodes) {
				if (!node.isActive) {
					ctx.fillStyle = "rgba(100, 100, 120, 0.5)";
					ctx.beginPath();
					ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
					ctx.fill();
				} else {
					const gradient = ctx.createRadialGradient(
						node.x,
						node.y,
						0,
						node.x,
						node.y,
						node.size * 3
					);
					gradient.addColorStop(
						0,
						`rgba(0, 200, 255, ${node.activationLevel})`
					);
					gradient.addColorStop(1, "rgba(0, 200, 255, 0)");
					ctx.fillStyle = gradient;
					ctx.beginPath();
					ctx.arc(node.x, node.y, node.size * 3, 0, Math.PI * 2);
					ctx.fill();

					ctx.fillStyle = `rgba(100, 220, 255, ${node.activationLevel})`;
					ctx.beginPath();
					ctx.arc(node.x, node.y, node.size, 0, Math.PI * 2);
					ctx.fill();
				}
			}

			const gradient = ctx.createRadialGradient(
				mousePosition.x,
				mousePosition.y,
				0,
				mousePosition.x,
				mousePosition.y,
				150
			);
			gradient.addColorStop(0, "rgba(0, 200, 255, 0.1)");
			gradient.addColorStop(1, "rgba(0, 200, 255, 0)");
			ctx.fillStyle = gradient;
			ctx.beginPath();
			ctx.arc(mousePosition.x, mousePosition.y, 150, 0, Math.PI * 2);
			ctx.fill();

			animationRef.current = requestAnimationFrame(animate);
		};

		animate();

		return () => {
			if (animationRef.current) cancelAnimationFrame(animationRef.current);
		};
	}, [dimensions, mousePosition]);

	return (
		<div className="relative w-full min-h-[500px] flex items-center justify-center flex-col overflow-hidden rounded-high bg-gray-900">
			<canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

			{children}
		</div>
	);
};

export default CircuitBoard;
```

## Attribution

Source: ZenUI · Original: https://zenui.net/

Adapted from the original. Credit the original author when you ship this.
