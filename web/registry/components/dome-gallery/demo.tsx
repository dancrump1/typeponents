import { useState } from "react";

import DomeGallery from "./component";

import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export default function Usage() {
	const [fit, setFit] = useState(0.5);
	const [minRadius, setMinRadius] = useState(600);
	const [maxVerticalRotationDeg, setMaxVerticalRotationDeg] = useState(0);
	const [segments, setSegments] = useState(34);
	const [dragDampening, setDragDampening] = useState(2);
	const [grayscale, setGrayscale] = useState(true);

	return (
		<div className="h-screen w-screen overflow-auto">
			<DomeGallery
				fit={fit}
				minRadius={minRadius}
				maxVerticalRotationDeg={maxVerticalRotationDeg}
				segments={segments}
				dragDampening={dragDampening}
				grayscale={grayscale}
			/>
			<div className="h-screen flex flex-col gap-7">
				<label>fit</label>
				<Slider
					title="Fit"
					min={0.5}
					max={1}
					step={0.05}
					defaultValue={[fit]}
					onValueChange={(value) => {
						setFit(value);
					}}
				/>

				<label>min radius</label>
				<Slider
					title="Min Radius"
					min={300}
					max={1000}
					step={50}
					defaultValue={[minRadius]}
					valueUnit="px"
					onValueChange={(value) => {
						setMinRadius(value);
					}}
				/>

				<label>max vertical rotation</label>
				<Slider
					title="Max Vertical Rotation"
					min={0}
					max={20}
					step={1}
					defaultValue={[maxVerticalRotationDeg]}
					valueUnit="°"
					onValueChange={(value) => {
						setMaxVerticalRotationDeg(value);
					}}
				/>

				<label>segments</label>
				<Slider
					title="Segments"
					min={20}
					max={34}
					step={2}
					defaultValue={[segments]}
					onValueChange={(value) => {
						setSegments(value);
					}}
				/>

				<label>drag dampening</label>
				<Slider
					title="Drag Dampening"
					min={0}
					max={5}
					step={0.2}
					defaultValue={[dragDampening]}
					onValueChange={(value) => {
						setDragDampening(value);
					}}
				/>

				<label>grayscale</label>
				<Switch
					title="Grayscale"
					checked={grayscale}
					onCheckedChange={(checked) => {
						setGrayscale(checked);
					}}
				/>
			</div>
		</div>
	);
}
