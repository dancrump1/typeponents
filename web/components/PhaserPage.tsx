"use client";

import { useRef } from "react";

import { IRefPhaserGame, PhaserGame } from "./PhaserGame";

export default function App() {
	//  References to the PhaserGame component (game and scene are exposed)
	const phaserRef = useRef<IRefPhaserGame | null>(null);

	return (
		<div id="app">
			<PhaserGame ref={phaserRef} />
		</div>
	);
}
