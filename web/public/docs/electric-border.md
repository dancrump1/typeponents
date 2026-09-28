# Electric Border

- Categories: Special Effects & FX
- Tags: autoplay, responsive
- Import: `@/components/ui/electric-border`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/electric-border.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `color` | `string` | `"#5227FF"` | — |
| `speed` | `number` | `1` | — |
| `chaos` | `number` | `1` | — |
| `thickness` | `number` | `2` | — |
| `className` | `string` | — | — |
| `style` | `React.CSSProperties` | — | — |

## Usage

```tsx
// CREDIT
// Component inspired by @BalintFerenczy on X
// https://codepen.io/BalintFerenczy/pen/KwdoyEN

import { useState } from "react";

import ElectricBorder from "./component";

import { Slider } from "@/components/ui/slider";

export default function Usage() {
	const [cardProps, setCardProps] = useState({
		color: "#7df9ff",
		speed: 1,
		chaos: 0.5,
		thickness: 2,
		radius: 16,
	});

	const [buttonProps, setButtonProps] = useState({
		color: "#B19EEF",
		speed: 1,
		chaos: 0.5,
		thickness: 2,
		radius: 999,
	});

	const [circleProps, setCircleProps] = useState({
		color: "#7df9ff",
		speed: 1,
		chaos: 0.5,
		thickness: 2,
		radius: "50%",
	});
	const activeProps = cardProps;

	const setActiveProps = setCardProps;

	return (
		<div className="flex">
			<div>
				<Slider
					title="Speed"
					min={0.1}
					max={3}
					step={0.1}
					value={[activeProps.speed]}
					onChange={(v) => setActiveProps((p) => ({ ...p, speed: v }))}
				/>
				<Slider
					title="Chaos"
					min={0.1}
					max={1}
					step={0.1}
					value={[activeProps.chaos]}
					onChange={(v) => setActiveProps((p) => ({ ...p, chaos: v }))}
				/>
				<Slider
					title="Thickness"
					min={1}
					max={5}
					step={1}
					value={[activeProps.thickness]}
					valueUnit="px"
					onChange={(v) => setActiveProps((p) => ({ ...p, thickness: v }))}
				/>
			</div>
			<ElectricBorder
				color={activeProps.color}
				speed={activeProps.speed}
				chaos={activeProps.chaos}
				thickness={activeProps.thickness}
				style={{ borderRadius: activeProps.radius }}
			>
				<div
					style={{ width: "300px", height: "360px" }}
					className="eb-demo-card"
				>
					<div className="eb-demo-badge">Featured</div>
					<h3 className="eb-demo-title">Electric Card</h3>
					<p className="eb-demo-desc">
						An electric border for shocking your users, the right way.
					</p>
					<div className="eb-demo-row">
						<span className="eb-demo-chip">Live</span>
						<span className="eb-demo-chip">v1.0</span>
					</div>
					<button className="eb-demo-cta">Get Started</button>
				</div>
			</ElectricBorder>
			<ElectricBorder
				color={activeProps.color}
				speed={activeProps.speed}
				chaos={activeProps.chaos}
				thickness={activeProps.thickness}
				style={{ borderRadius: activeProps.radius }}
				className="eb-button-container w-fit h-fit"
			>
				<div className="eb-demo-button-wrap w-fit h-fit">
					<button className="eb-demo-button">Learn More</button>
				</div>
			</ElectricBorder>
			<ElectricBorder
				color={activeProps.color}
				speed={activeProps.speed}
				chaos={activeProps.chaos}
				thickness={activeProps.thickness}
				style={{ borderRadius: activeProps.radius }}
				className="w-fit h-fit"
			>
				<div
					style={{
						width: "200px",
						height: "200px",
						borderRadius: "50%",
					}}
				/>
			</ElectricBorder>
		</div>
	);
}
```

## Source

### `components/ui/electric-border.tsx`

```tsx
import React, {
	CSSProperties,
	PropsWithChildren,
	useEffect,
	useId,
	useLayoutEffect,
	useRef,
} from "react";

type ElectricBorderProps = PropsWithChildren<{
	color?: string;
	speed?: number;
	chaos?: number;
	thickness?: number;
	className?: string;
	style?: CSSProperties;
}>;

function hexToRgba(hex: string, alpha = 1): string {
	if (!hex) return `rgba(0,0,0,${alpha})`;
	let h = hex.replace("#", "");
	if (h.length === 3) {
		h = h
			.split("")
			.map((c) => c + c)
			.join("");
	}
	const int = parseInt(h, 16);
	const r = (int >> 16) & 255;
	const g = (int >> 8) & 255;
	const b = int & 255;
	return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

const ElectricBorder: React.FC<ElectricBorderProps> = ({
	children,
	color = "#5227FF",
	speed = 1,
	chaos = 1,
	thickness = 2,
	className,
	style,
}) => {
	const rawId = useId().replace(/[:]/g, "");
	const filterId = `turbulent-displace-${rawId}`;
	const svgRef = useRef<SVGSVGElement | null>(null);
	const rootRef = useRef<HTMLDivElement | null>(null);
	const strokeRef = useRef<HTMLDivElement | null>(null);

	const updateAnim = () => {
		const svg = svgRef.current;
		const host = rootRef.current;
		if (!svg || !host) return;

		if (strokeRef.current) {
			strokeRef.current.style.filter = `url(#${filterId})`;
		}

		const width = Math.max(
			1,
			Math.round(host.clientWidth || host.getBoundingClientRect().width || 0)
		);
		const height = Math.max(
			1,
			Math.round(
				host.clientHeight || host.getBoundingClientRect().height || 0
			)
		);

		const dyAnims = Array.from(
			svg.querySelectorAll<SVGAnimateElement>(
				'feOffset > animate[attributeName="dy"]'
			)
		);
		if (dyAnims.length >= 2) {
			dyAnims[0].setAttribute("values", `${height}; 0`);
			dyAnims[1].setAttribute("values", `0; -${height}`);
		}

		const dxAnims = Array.from(
			svg.querySelectorAll<SVGAnimateElement>(
				'feOffset > animate[attributeName="dx"]'
			)
		);
		if (dxAnims.length >= 2) {
			dxAnims[0].setAttribute("values", `${width}; 0`);
			dxAnims[1].setAttribute("values", `0; -${width}`);
		}

		const baseDur = 6;
		const dur = Math.max(0.001, baseDur / (speed || 1));
		[...dyAnims, ...dxAnims].forEach((a) => a.setAttribute("dur", `${dur}s`));

		const disp = svg.querySelector("feDisplacementMap");
		if (disp) disp.setAttribute("scale", String(30 * (chaos || 1)));

		const filterEl = svg.querySelector<SVGFilterElement>(
			`#${CSS.escape(filterId)}`
		);
		if (filterEl) {
			filterEl.setAttribute("x", "-200%");
			filterEl.setAttribute("y", "-200%");
			filterEl.setAttribute("width", "500%");
			filterEl.setAttribute("height", "500%");
		}

		requestAnimationFrame(() => {
			[...dyAnims, ...dxAnims].forEach((a: any) => {
				if (typeof a.beginElement === "function") {
					try {
						a.beginElement();
					} catch {}
				}
			});
		});
	};

	useEffect(() => {
		updateAnim();
	}, [speed, chaos]);

	useLayoutEffect(() => {
		if (!rootRef.current) return;
		const ro = new ResizeObserver(() => updateAnim());
		ro.observe(rootRef.current);
		updateAnim();
		return () => ro.disconnect();
	}, []);

	const inheritRadius: CSSProperties = {
		borderRadius: style?.borderRadius ?? "inherit",
	};

	const strokeStyle: CSSProperties = {
		...inheritRadius,
		borderWidth: thickness,
		borderStyle: "solid",
		borderColor: color,
	};

	const glow1Style: CSSProperties = {
		...inheritRadius,
		borderWidth: thickness,
		borderStyle: "solid",
		borderColor: hexToRgba(color, 0.6),
		filter: `blur(${0.5 + thickness * 0.25}px)`,
		opacity: 0.5,
	};

	const glow2Style: CSSProperties = {
		...inheritRadius,
		borderWidth: thickness,
		borderStyle: "solid",
		borderColor: color,
		filter: `blur(${2 + thickness * 0.5}px)`,
		opacity: 0.5,
	};

	const bgGlowStyle: CSSProperties = {
		...inheritRadius,
		transform: "scale(1.08)",
		filter: "blur(32px)",
		opacity: 0.3,
		zIndex: -1,
		background: `linear-gradient(-30deg, ${hexToRgba(color, 0.8)}, transparent, ${color})`,
	};

	return (
		<div
			ref={rootRef}
			className={"relative isolate " + (className ?? "")}
			style={style}
		>
			<svg
				ref={svgRef}
				className="fixed -left-[10000px] -top-[10000px] w-[10px] h-[10px] opacity-[0.001] pointer-events-none"
				aria-hidden
				focusable="false"
			>
				<defs>
					<filter
						id={filterId}
						colorInterpolationFilters="sRGB"
						x="-20%"
						y="-20%"
						width="140%"
						height="140%"
					>
						<feTurbulence
							type="turbulence"
							baseFrequency="0.02"
							numOctaves="10"
							result="noise1"
							seed="1"
						/>
						<feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
							<animate
								attributeName="dy"
								values="700; 0"
								dur="6s"
								repeatCount="indefinite"
								calcMode="linear"
							/>
						</feOffset>

						<feTurbulence
							type="turbulence"
							baseFrequency="0.02"
							numOctaves="10"
							result="noise2"
							seed="1"
						/>
						<feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
							<animate
								attributeName="dy"
								values="0; -700"
								dur="6s"
								repeatCount="indefinite"
								calcMode="linear"
							/>
						</feOffset>

						<feTurbulence
							type="turbulence"
							baseFrequency="0.02"
							numOctaves="10"
							result="noise1"
							seed="2"
						/>
						<feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
							<animate
								attributeName="dx"
								values="490; 0"
								dur="6s"
								repeatCount="indefinite"
								calcMode="linear"
							/>
						</feOffset>

						<feTurbulence
							type="turbulence"
							baseFrequency="0.02"
							numOctaves="10"
							result="noise2"
							seed="2"
						/>
						<feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
							<animate
								attributeName="dx"
								values="0; -490"
								dur="6s"
								repeatCount="indefinite"
								calcMode="linear"
							/>
						</feOffset>

						<feComposite
							in="offsetNoise1"
							in2="offsetNoise2"
							result="part1"
						/>
						<feComposite
							in="offsetNoise3"
							in2="offsetNoise4"
							result="part2"
						/>
						<feBlend
							in="part1"
							in2="part2"
							mode="color-dodge"
							result="combinedNoise"
						/>
						<feDisplacementMap
							in="SourceGraphic"
							in2="combinedNoise"
							scale="30"
							xChannelSelector="R"
							yChannelSelector="B"
						/>
					</filter>
				</defs>
			</svg>

			<div
				className="absolute inset-0 pointer-events-none"
				style={inheritRadius}
			>
				<div
					ref={strokeRef}
					className="absolute inset-0 box-border"
					style={strokeStyle}
				/>
				<div className="absolute inset-0 box-border" style={glow1Style} />
				<div className="absolute inset-0 box-border" style={glow2Style} />
				<div className="absolute inset-0" style={bgGlowStyle} />
			</div>

			<div className="relative" style={inheritRadius}>
				{children}
			</div>
		</div>
	);
};

export default ElectricBorder;
```
