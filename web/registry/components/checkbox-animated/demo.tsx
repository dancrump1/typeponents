"use client";

import { useState } from "react";

import { CheckBoxAnimated } from "./component";

export default function CheckBoxPreview() {
	const [states, setStates] = useState(Array(4).fill(false));

	const toggle = (index: number) => {
		const updated = [...states];
		updated[index] = !updated[index];
		setStates(updated);
	};

	return (
		<div className="flex gap-6 items-end">
			<CheckBoxAnimated
				checked={states[0]}
				onClick={() => toggle(0)}
				size={20}
			/>
			<CheckBoxAnimated
				checked={states[1]}
				onClick={() => toggle(1)}
				size={24}
				color="#3b82f6"
			/>
			<CheckBoxAnimated
				checked={states[2]}
				onClick={() => toggle(2)}
				size={28}
				color="#facc15"
			/>
			<CheckBoxAnimated
				checked={states[3]}
				onClick={() => toggle(3)}
				size={32}
				color="#ef4444"
			/>
		</div>
	);
}
