"use client";

import React, { useEffect, useRef } from "react";

import Link from "next/link";

import ThemeToggle from "@/components/ui/navbar-components/theme-toggle";
import SVG from "react-inlinesvg";

import { ThemeToggleButton } from "@/registry/components/theme-changer/component";

// Credit:
// https://nurui.vercel.app/docs/following-eye

const MouseFollowingEyes: React.FC = () => {
	const eye1Ref = useRef<HTMLDivElement>(null);
	const eye2Ref = useRef<HTMLDivElement>(null);
	const mousePos = useRef({ x: 0, y: 0 });

	useEffect(() => {
		const handleMouseMove = (e: MouseEvent) => {
			mousePos.current = { x: e.clientX, y: e.clientY };
		};

		window.addEventListener("mousemove", handleMouseMove);

		return () => window.removeEventListener("mousemove", handleMouseMove);
	}, []);

	return (
		<div className="flex justify-center items-center">
			<div className="flex space-x-2">
				<div className="group">
					<div className="group-hover:block hidden">
						<ThemeToggleButton
							showLabel
							variant="gif"
							url="https://media.giphy.com/media/KBbr4hHl9DSahKvInO/giphy.gif?cid=790b76112m5eeeydoe7et0cr3j3ekb1erunxozyshuhxx2vl&ep=v1_stickers_search&rid=giphy.gif&ct=s"
						/>
					</div>
					<div className="group-hover:hidden block">
						<Eye
							selfRef={eye1Ref}
							otherRef={eye2Ref}
							mousePos={mousePos}
						/>
					</div>
				</div>
				<div className="group">
					<Link href="/drive25">
						<SVG
							src={"/dbsbottom.svg"}
							title={"half of our logo"}
							height={80}
							width={233}
							className="stroke-white group-hover:block hidden"
							role="img"
							aria-label={"half of our logo"}
							loader={<span>Loading...</span>}
						/>
					</Link>
					<div className="group-hover:hidden block">
						<Eye
							selfRef={eye2Ref}
							otherRef={eye1Ref}
							mousePos={mousePos}
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

interface EyeProps {
	selfRef: React.RefObject<HTMLDivElement>;
	otherRef: React.RefObject<HTMLDivElement>;
	mousePos: React.MutableRefObject<{ x: number; y: number }>;
}

const Eye: React.FC<EyeProps> = ({
	selfRef,
	otherRef,
	mousePos,
	showWhat,
	setShowWhat,
}) => {
	const pupilRef = useRef<HTMLDivElement>(null);
	const center = useRef({ x: 0, y: 0 });

	const updateCenter = () => {
		if (!selfRef.current) return;
		const rect = selfRef.current.getBoundingClientRect();
		center.current = {
			x: rect.left + rect.width / 2,
			y: rect.top + rect.height / 2,
		};
	};

	useEffect(() => {
		updateCenter();
		window.addEventListener("resize", updateCenter);

		let frameId: number;

		const animate = () => {
			const { x, y } = mousePos.current;

			const isInside = (ref: React.RefObject<HTMLDivElement>) => {
				const rect = ref.current?.getBoundingClientRect();
				if (!rect) return false;
				return (
					x >= rect.left &&
					x <= rect.right &&
					y >= rect.top &&
					y <= rect.bottom
				);
			};

			if (!(isInside(selfRef) || isInside(otherRef))) {
				const dx = x - center.current.x;
				const dy = y - center.current.y;
				const angle = Math.atan2(dy, dx);

				const maxMove = 10;
				const pupilX = Math.cos(angle) * maxMove;
				const pupilY = Math.sin(angle) * maxMove;

				if (pupilRef.current) {
					pupilRef.current.style.transform = `translate(${pupilX}px, ${pupilY}px)`;
				}
			}

			frameId = requestAnimationFrame(animate);
		};

		frameId = requestAnimationFrame(animate);

		return () => {
			cancelAnimationFrame(frameId);
			window.removeEventListener("resize", updateCenter);
		};
	}, [selfRef, otherRef, mousePos]);

	return (
		<div
			ref={selfRef}
			className="relative bg-white border-4 border-black rounded-full h-12 w-12 flex items-center justify-center"
		>
			<div ref={pupilRef} className="absolute bg-black rounded-full h-4 w-4">
				<div className="w-1 h-1 bg-white rounded-full absolute bottom-1 right-1"></div>
			</div>
		</div>
	);
};

export { MouseFollowingEyes };
