"use client";

import React, { useState } from "react";

import CurvedNavbar from "./component";
import { AnimatePresence } from "motion/react";

export default function Usage() {
	const [isActive, setIsActive] = useState(false);

	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<>
				<div
					onClick={() => {
						setIsActive(!isActive);
					}}
					className={`w-20 h-20 rounded-full flex flex-col items-center justify-center`}
				>
					open curve nav
				</div>

				<AnimatePresence mode="wait">
					{isActive && (
						<CurvedNavbar isActive={isActive} setIsActive={setIsActive} />
					)}
				</AnimatePresence>
			</>{" "}
		</div>
	);
}
