"use client";

import React from "react";

import TextCursorProximity from "./component";
import { ASCII } from "@/lib/example-data";

export default function Usage() {
	return (
		<div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
			<div className="relative h-full w-full cursor-pointer overflow-hidden  justify-start items-start shadow-lg flex bg-background text-secondary">
				<div className="flex flex-col justify-center uppercase leading-none pt-4 pl-6">
					<TextCursorProximity
						label="DIGITAL"
						className=" text-3xl will-change-transform sm:text-6xl md:text-6xl lg:text-7xl font-overusedGrotesk"
						styles={{
							transform: {
								from: "scale(1)",
								to: "scale(1.4)",
							},
							color: {
								from: "#ffffff",
								to: "#ff87c1",
							},
						}}
						falloff="gaussian"
						radius={100}
					/>
					<TextCursorProximity
						label="WORKSHOP"
						className="leading-none text-3xl will-change-transform sm:text-6xl md:text-6xl lg:text-7xl font-overusedGrotesk"
						styles={{
							transform: {
								from: "scale(1)",
								to: "scale(1.4)",
							},
							color: {
								from: "#ffffff",
								to: "#ff87c1",
							},
						}}
						falloff="gaussian"
						radius={100}
					/>
				</div>

				<div className="absolute bottom-2 flex w-full justify-between px-6">
					{ASCII.map((hand, i) => (
						<span
							key={i + "proximity-example"}
							className="text-2xl opacity-80"
						>
							{hand}
						</span>
					))}
				</div>

				<TextCursorProximity
					className="absolute top-6 right-6 hidden sm:block text-xs "
					label="15/01/2025"
					styles={{
						transform: {
							from: "scale(1)",
							to: "scale(1.4)",
						},
						color: {
							from: "#ffffff",
							to: "#ff87c1",
						},
					}}
					falloff="linear"
					radius={10}
				/>
			</div>

			{/* this is the important stuff */}
			<div className="w-full h-full items-center justify-center grid text-justify">
				<TextCursorProximity
					label={`Just as every problem is novel and different from others. so the grid must be conceived afresh every time so as to meet requirements. This means that the designer must approach each new problem with an open mind and must seek to solve it by analysing it objectively. The difficulties of the task are due to the enormous differences in the demands made on the designer by the various assignments he receives. A small newspaper advertisement does not present the difficulties of designing, say, a daily paper with 10 and more columns. a great variety of subjects, and an additional advertising section. Such a task calls not only for designing talent but also organizing ability since the many constantly changing items of information have to be arranged in a logical order and their priorities reflected in appropriate typography.`}
					className="leading-tight text-primaryBlue"
					styles={{
						opacity: { from: 0.1, to: 1 },
					}}
					falloff="linear"
					radius={80}
				/>
			</div>
		</div>
	);
}
