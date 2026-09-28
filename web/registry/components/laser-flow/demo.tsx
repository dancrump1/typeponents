import { useCallback, useRef, useState } from "react";

import LaserFlow from "./component";

import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const useForceRerender = () => {
	const [key, setKey] = useState(0);

	const forceRerender = useCallback(() => {
		setKey((prevKey) => prevKey + 1);
	}, []);

	return [key, forceRerender];
};

// Image Example Interactive Reveal Effect
export default function Usage() {
	const revealImgRef = useRef(null);

	const containerRef = useRef(null);
	const [key, forceRerender] = useForceRerender();
	const [selectedExample, setSelectedExample] = useState("box");
	const [laserColor, setLaserColor] = useState("#CF9EFF");
	const [horizontalSizing, setHorizontalSizing] = useState(0.5);
	const [verticalSizing, setVerticalSizing] = useState(2.0);
	const [wispDensity, setWispDensity] = useState(1);
	const [wispSpeed, setWispSpeed] = useState(15.0);
	const [wispIntensity, setWispIntensity] = useState(5.0);
	const [flowSpeed, setFlowSpeed] = useState(0.35);
	const [flowStrength, setFlowStrength] = useState(0.25);
	const [fogIntensity, setFogIntensity] = useState(0.45);
	const [fogScale, setFogScale] = useState(0.3);
	const [fogFallSpeed, setFogFallSpeed] = useState(0.6);
	const [decay, setDecay] = useState(1.1);
	const [falloffStart, setFalloffStart] = useState(1.2);

	return (
		<div className="h-screen w-screen">
			<div
				style={{
					height: "800px",
					position: "relative",
					overflow: "hidden",
					backgroundColor: "#060010",
				}}
				onMouseMove={(e) => {
					const rect = e.currentTarget.getBoundingClientRect();
					const x = e.clientX - rect.left;
					const y = e.clientY - rect.top;
					const el = revealImgRef.current;
					if (el) {
						el.style.setProperty("--mx", `${x}px`);
						el.style.setProperty("--my", `${y + rect.height * 0.5}px`);
					}
				}}
				onMouseLeave={() => {
					const el = revealImgRef.current;
					if (el) {
						el.style.setProperty("--mx", "-9999px");
						el.style.setProperty("--my", "-9999px");
					}
				}}
			>
				<LaserFlow
					horizontalBeamOffset={selectedExample === "box" ? 0.1 : 0.0}
					verticalBeamOffset={selectedExample === "box" ? -0.2 : -0.5}
					horizontalSizing={horizontalSizing}
					verticalSizing={verticalSizing}
					wispDensity={wispDensity}
					wispSpeed={wispSpeed}
					wispIntensity={wispIntensity}
					flowSpeed={flowSpeed}
					flowStrength={flowStrength}
					fogIntensity={fogIntensity}
					fogScale={fogScale}
					fogFallSpeed={fogFallSpeed}
					decay={decay}
					falloffStart={falloffStart}
					color={laserColor}
					key={key}
					className={`laser-flow-demo-${selectedExample}`}
				/>

				<div
					style={{
						position: "absolute",
						top: "50%",
						left: "50%",
						transform: "translateX(-50%)",
						width: "86%",
						height: "60%",
						backgroundColor: "#060010",
						borderRadius: "20px",
						border: "2px solid #FF79C6",
						display: "flex",
						alignItems: "center",
						justifyContent: "center",
						color: "white",
						fontSize: "2rem",
						zIndex: 6,
					}}
				>
					{/* Your content here */}
				</div>

				<img
					ref={revealImgRef}
					src="/itjustworks.jpg"
					alt="Reveal effect"
					style={{
						position: "absolute",
						width: "100%",
						top: "-50%",
						zIndex: 5,
						mixBlendMode: "lighten",
						opacity: 0.3,
						pointerEvents: "none",
						"--mx": "-9999px",
						"--my": "-9999px",
						WebkitMaskImage:
							"radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)",
						maskImage:
							"radial-gradient(circle at var(--mx) var(--my), rgba(255,255,255,1) 0px, rgba(255,255,255,0.95) 60px, rgba(255,255,255,0.6) 120px, rgba(255,255,255,0.25) 180px, rgba(255,255,255,0) 240px)",
						WebkitMaskRepeat: "no-repeat",
						maskRepeat: "no-repeat",
					}}
				/>
			</div>

			<section>
				<Slider
					title="Horizontal Sizing"
					min={0.1}
					max={2}
					step={0.01}
					value={[horizontalSizing]}
					onChange={setHorizontalSizing}
				/>
				<Slider
					title="Vertical Sizing"
					min={0.1}
					max={5}
					step={0.1}
					value={[verticalSizing]}
					onChange={setVerticalSizing}
				/>
				<Slider
					title="Wisp Density"
					min={0}
					max={5}
					step={0.1}
					value={[wispDensity]}
					onChange={setWispDensity}
				/>
				<Slider
					title="Wisp Speed"
					min={1}
					max={50}
					step={0.5}
					value={[wispSpeed]}
					onChange={setWispSpeed}
				/>
				<Slider
					title="Wisp Intensity"
					min={0}
					max={20}
					step={0.1}
					value={[wispIntensity]}
					onChange={setWispIntensity}
				/>
				<Slider
					title="Flow Speed"
					min={0}
					max={2}
					step={0.01}
					value={[flowSpeed]}
					onChange={setFlowSpeed}
				/>
				<Slider
					title="Flow Strength"
					min={0}
					max={1}
					step={0.01}
					value={[flowStrength]}
					onChange={setFlowStrength}
				/>
				<Slider
					title="Fog Intensity"
					min={0}
					max={1}
					step={0.01}
					value={[fogIntensity]}
					onChange={setFogIntensity}
				/>
				<Slider
					title="Fog Scale"
					min={0.1}
					max={1}
					step={0.01}
					value={[fogScale]}
					onChange={setFogScale}
				/>
				<Slider
					title="Fog Fall Speed"
					min={0}
					max={2}
					step={0.01}
					value={[fogFallSpeed]}
					onChange={setFogFallSpeed}
				/>
				<Slider
					title="Decay"
					min={0.5}
					max={3}
					step={0.01}
					value={[decay]}
					onChange={setDecay}
				/>
				<Slider
					title="Falloff Start"
					min={0.5}
					max={3}
					step={0.01}
					value={[falloffStart]}
					onChange={setFalloffStart}
				/>
			</section>
		</div>
	);
}
