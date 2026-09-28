"use client";

import React from "react";

import Image from "next/image";

import { StackCard } from "./component";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<StackCard
				cards={[
					<div
						key="one"
						className="w-80 rounded-md p-5 bg-blue-100 border-2 border-blue-300 space-y-2 shadow-lg shadow-blue-200"
					>
						<p className="text-sm uppercase">Feature #1</p>
						<h3 className="text-lg text-balance font-semibold">
							Introduce a feature and its benefit.
						</h3>
						<div className="aspect-video grid place-items-center bg-background rounded-md">
							<Image
								width={100}
								height={100}
								size={64}
								className="text-secondary"
								src="/itjustworks.jpg"
							/>
						</div>
						<p className="text-sm">
							Explain how the feature provide value and benefit your
							customers. Keep it short and sweet.
						</p>
					</div>,
					<div
						key="tow"
						className="w-80 rounded-md p-5 bg-amber-100 border-2 border-amber-300 space-y-2 shadow-lg shadow-amber-200"
					>
						<p className="text-sm uppercase">Feature #2</p>
						<h3 className="text-lg text-balance font-semibold">
							Introduce a feature and its benefit.
						</h3>
						<div className="aspect-video grid place-items-center bg-background rounded-md">
							<Image
								width={100}
								height={100}
								size={64}
								className="text-secondary"
								src="/itjustworks.jpg"
							/>
						</div>
						<p className="text-sm">
							Explain how the feature provide value and benefit your
							customers. Keep it short and sweet.
						</p>
					</div>,
					<div
						key="three"
						className="w-80 rounded-md p-5 bg-green-100 border-2 border-green-300 space-y-2 shadow-lg shadow-green-200"
					>
						<p className="text-sm uppercase">Feature #3</p>
						<h3 className="text-lg text-balance font-semibold">
							Introduce a feature and its benefit.
						</h3>
						<div className="aspect-video grid place-items-center bg-background rounded-md">
							<Image
								src="/itjustworks.jpg"
								width={100}
								height={100}
								size={64}
								className="text-secondary"
							/>
						</div>
						<p className="text-sm">
							Explain how the feature provide value and benefit your
							customers. Keep it short and sweet.
						</p>
					</div>,
				]}
			/>
		</div>
	);
}
