"use client";

import React, { useState } from "react";

import { SpringModal } from "./component";

export default function Usage() {
	const [isOpen, setIsOpen] = useState(false);

	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="px-4 py-64 bg-slate-900 grid place-content-center">
				<button
					onClick={() => setIsOpen(true)}
					className="bg-linear-to-r from-violet-600 to-indigo-600 text-secondary font-medium px-4 py-2 rounded hover:opacity-90 transition-opacity"
				>
					Open Modal
				</button>
				<SpringModal isOpen={isOpen} setIsOpen={setIsOpen} />
			</div>{" "}
		</div>
	);
}
