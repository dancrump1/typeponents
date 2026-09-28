"use client";

import React, { useState } from "react";

import Cubes from "./component";

import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";

export default function Usage() {
	const [borderStyle, setBorderStyle] = useState("2px dashed #B19EEF");
	const [gridSize, setGridSize] = useState(10);
	const [maxAngle, setMaxAngle] = useState(45);
	const [radius, setRadius] = useState(3);
	const [autoAnimate, setAutoAnimate] = useState(true);
	const [rippleOnClick, setRippleOnClick] = useState(true);

	// Border style options for select
	const borderOptions = [
		{ value: "2px dotted #fff", label: "Dotted White" },
		{ value: "2px dashed #B19EEF", label: "Dashed Purple" },
		{ value: "3px solid #fff", label: "Solid White" },
	];

	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div style={{ height: "600px", position: "relative" }}>
				<Cubes
					faceColor="#1a1a2e"
					rippleColor="#ff6b6b"
					rippleSpeed={1.5}
					borderStyle={borderStyle}
					gridSize={gridSize}
					maxAngle={maxAngle}
					radius={radius}
					autoAnimate={autoAnimate}
					rippleOnClick={rippleOnClick}
				/>
			</div>
			<section>
				<label>Grid Size</label>
				<Slider
					defaultValue={[50]}
					max={100}
					step={1}
					className={"w-[60%]"}
					onChange={(value) => setGridSize(value)}
				/>
				<label>max angle</label>
				<Slider
					defaultValue={[50]}
					max={180}
					step={1}
					className={"w-[60%]"}
					onChange={(value) => setMaxAngle(value)}
				/>
				<label>radius</label>
				<Slider
					defaultValue={[5]}
					max={180}
					step={1}
					className={"w-[60%]"}
					onChange={(value) => setRadius(value)}
				/>
				<label>auto animate</label>
				<Checkbox
					defaultValue={true}
					className={"w-[60%]"}
					onChange={(value) => setAutoAnimate(value)}
				/>
			</section>
		</div>
	);
}
