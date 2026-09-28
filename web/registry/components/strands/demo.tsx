"use client";

import { useState } from "react";

import Strands from "./component";

import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export default function Usage() {
	const [color1, setColor1] = useState("#F97316");
	const [color2, setColor2] = useState("#7C3AED");
	const [color3, setColor3] = useState("#06B6D4");
	const [count, setCount] = useState(3);
	const [speed, setSpeed] = useState(0.5);
	const [amplitude, setAmplitude] = useState(1);
	const [waviness, setWaviness] = useState(1);
	const [thickness, setThickness] = useState(0.7);
	const [glow, setGlow] = useState(2.6);
	const [taper, setTaper] = useState(3);
	const [spread, setSpread] = useState(1);
	const [hueShift, setHueShift] = useState(0);
	const [intensity, setIntensity] = useState(0.6);
	const [saturation, setSaturation] = useState(2);
	const [opacity, setOpacity] = useState(1);
	const [scale, setScale] = useState(1.5);
	const [glass, setGlass] = useState(false);
	const [refraction, setRefraction] = useState(1);
	const [dispersion, setDispersion] = useState(1);
	const [glassSize, setGlassSize] = useState(1);

	const colors = [color1, color2, color3];

	return (
		<div className="h-screen w-screen overflow-auto">
			<div className="h-screen w-full">
				<Strands
					colors={colors}
					count={count}
					speed={speed}
					amplitude={amplitude}
					waviness={waviness}
					thickness={thickness}
					glow={glow}
					taper={taper}
					spread={spread}
					hueShift={hueShift}
					intensity={intensity}
					saturation={saturation}
					opacity={opacity}
					scale={scale}
					glass={glass}
					refraction={refraction}
					dispersion={dispersion}
					glassSize={glassSize}
				/>
			</div>
			<div className="h-screen flex flex-col gap-7 p-6">
				<label className="flex items-center gap-3">
					color 1
					<input
						type="color"
						value={color1}
						onChange={(e) => setColor1(e.target.value)}
						className="h-8 w-12 cursor-pointer rounded border bg-transparent"
					/>
				</label>
				<label className="flex items-center gap-3">
					color 2
					<input
						type="color"
						value={color2}
						onChange={(e) => setColor2(e.target.value)}
						className="h-8 w-12 cursor-pointer rounded border bg-transparent"
					/>
				</label>
				<label className="flex items-center gap-3">
					color 3
					<input
						type="color"
						value={color3}
						onChange={(e) => setColor3(e.target.value)}
						className="h-8 w-12 cursor-pointer rounded border bg-transparent"
					/>
				</label>

				<label>count</label>
				<Slider
					min={1}
					max={10}
					step={1}
					value={[count]}
					onValueChange={([value]) => setCount(value)}
				/>

				<label>speed</label>
				<Slider
					min={0}
					max={3}
					step={0.1}
					value={[speed]}
					onValueChange={([value]) => setSpeed(value)}
				/>

				<label>amplitude</label>
				<Slider
					min={0}
					max={3}
					step={0.1}
					value={[amplitude]}
					onValueChange={([value]) => setAmplitude(value)}
				/>

				<label>waviness</label>
				<Slider
					min={0.2}
					max={3}
					step={0.1}
					value={[waviness]}
					onValueChange={([value]) => setWaviness(value)}
				/>

				<label>thickness</label>
				<Slider
					min={0.2}
					max={4}
					step={0.1}
					value={[thickness]}
					onValueChange={([value]) => setThickness(value)}
				/>

				<label>glow</label>
				<Slider
					min={0.3}
					max={3}
					step={0.05}
					value={[glow]}
					onValueChange={([value]) => setGlow(value)}
				/>

				<label>taper</label>
				<Slider
					min={0.5}
					max={6}
					step={0.1}
					value={[taper]}
					onValueChange={([value]) => setTaper(value)}
				/>

				<label>spread</label>
				<Slider
					min={0}
					max={3}
					step={0.1}
					value={[spread]}
					onValueChange={([value]) => setSpread(value)}
				/>

				<label>hue shift</label>
				<Slider
					min={0}
					max={1}
					step={0.01}
					value={[hueShift]}
					onValueChange={([value]) => setHueShift(value)}
				/>

				<label>intensity</label>
				<Slider
					min={0}
					max={1}
					step={0.05}
					value={[intensity]}
					onValueChange={([value]) => setIntensity(value)}
				/>

				<label>saturation</label>
				<Slider
					min={0}
					max={2}
					step={0.05}
					value={[saturation]}
					onValueChange={([value]) => setSaturation(value)}
				/>

				<label>opacity</label>
				<Slider
					min={0}
					max={1}
					step={0.05}
					value={[opacity]}
					onValueChange={([value]) => setOpacity(value)}
				/>

				<label>scale</label>
				<Slider
					min={0.3}
					max={3}
					step={0.1}
					value={[scale]}
					onValueChange={([value]) => setScale(value)}
				/>

				<label>glass ball</label>
				<Switch checked={glass} onCheckedChange={setGlass} />

				<label>refraction</label>
				<Slider
					min={0}
					max={3}
					step={0.05}
					value={[refraction]}
					disabled={!glass}
					onValueChange={([value]) => setRefraction(value)}
				/>

				<label>dispersion</label>
				<Slider
					min={0}
					max={4}
					step={0.05}
					value={[dispersion]}
					disabled={!glass}
					onValueChange={([value]) => setDispersion(value)}
				/>

				<label>glass size</label>
				<Slider
					min={0.3}
					max={1}
					step={0.01}
					value={[glassSize]}
					disabled={!glass}
					onValueChange={([value]) => setGlassSize(value)}
				/>
			</div>
		</div>
	);
}
