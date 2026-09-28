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
