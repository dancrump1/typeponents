"use client";

import { useEffect, useState } from "react";

import { SlidingNumber } from "./component";

function Clock() {
	const [hours, setHours] = useState(new Date().getHours());
	const [minutes, setMinutes] = useState(new Date().getMinutes());
	const [seconds, setSeconds] = useState(new Date().getSeconds());

	useEffect(() => {
		const interval = setInterval(() => {
			setHours(new Date().getHours());
			setMinutes(new Date().getMinutes());
			setSeconds(new Date().getSeconds());
		}, 1000);
		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex items-center gap-0.5 font-mono">
			<SlidingNumber value={hours} padStart={true} />
			<span className="text-secondary">:</span>
			<SlidingNumber value={minutes} padStart={true} />
			<span className="text-secondary">:</span>
			<SlidingNumber value={seconds} padStart={true} />
		</div>
	);
}

function SlidingNumberWithSlider() {
	const [value, setValue] = useState(100);

	return (
		<div className="flex flex-col items-start gap-0">
			<div className="inline-flex items-center gap-1 font-mono leading-none">
				$<SlidingNumber value={value} />
			</div>
			<input
				type="range"
				value={value}
				min={500}
				max={100000}
				step={50}
				onChange={(e) => setValue(+e.target.value)}
				className="mt-2 accent-indigo-950"
			/>
		</div>
	);
}

export default function SlidingNumbersUsage() {
	return (
		<div>
			<Clock />
			<SlidingNumberWithSlider />
		</div>
	);
}
