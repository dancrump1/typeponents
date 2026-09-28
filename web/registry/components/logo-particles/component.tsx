"use client";

import React, { useEffect, useRef, useState } from "react";

export default function LogoParticles() {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const mousePositionRef = useRef({ x: 0, y: 0 });
	const isTouchingRef = useRef(false);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		const canvas = canvasRef.current;
		if (!canvas) return;

		const ctx = canvas.getContext("2d");
		if (!ctx) return;

		const updateCanvasSize = () => {
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
			setIsMobile(window.innerWidth < 768); // Set mobile breakpoint
		};

		updateCanvasSize();

		let particles: {
			x: number;
			y: number;
			baseX: number;
			baseY: number;
			size: number;
			color: string;
			scatteredColor: string;
			life: number;
			isAWS: boolean;
		}[] = [];

		let textImageData: ImageData | null = null;

		function createTextImage() {
			if (!ctx || !canvas) return 0;

			ctx.fillStyle = "white";
			ctx.save();

			const logoHeight = isMobile ? 60 : 120;
			const vercelLogoWidth = logoHeight * (40 / 19.7762); // Maintain aspect ratio
			const awsLogoWidth = logoHeight * (283 / 140); // Maintain aspect ratio
			const logoSpacing = isMobile ? 30 : 60; // Increased gap for mobile and desktop
			const totalWidth = vercelLogoWidth + awsLogoWidth + logoSpacing;

			ctx.translate(
				canvas.width / 2 - totalWidth / 2,
				canvas.height / 2 - logoHeight / 2
			);

			// Draw Vercel logo
			ctx.save();
			const vercelScale = logoHeight / 19.7762;
			const path1 = new Path2D(
				"M66.57,94.58c-2.77,0-5.41-3.17-11-3.17C48.74,91.41,42.27,95,35.14,95,14.26,95,0,81.11,0,60.1,0,40.42,15.06,25.36,34.74,25.36,42.27,25.36,50.2,30,54.69,30,63,30,60.37,16,60.37,10.7,60.37,6,60.9,0,67.1,0c4.63,0,5.55,4.36,5.55,8.19V88.5C72.65,93.26,71.2,94.58,66.57,94.58ZM35.27,33.82C20.21,33.82,9,44.91,9,60,9,74.24,21,85.6,35.14,85.6c14.79,0,25.49-11.76,25.49-26.29A25.48,25.48,0,0,0,35.27,33.82Z M131.05,35.68c-1.78.5-5.09.1-7.34-.56-4.21-1.23-7.12-1-11.48-1-8.06,0-19.34,2.25-19.34,12.82V87.45c0,3.83.26,8.45-4.89,8.45s-6.6-3.57-6.6-8.06V34.34c0-4.22.26-8.45,5.68-8.45,2.51,0,5.68,2,5.68,4.76,5.41-4.36,17.57-6.34,24.43-6.34,5.29,0,17.61,1.93,17.61,7.12C134.8,33.67,133.55,35,131.05,35.68Z M192.92,92.47a6.22,6.22,0,0,1-5,2.24,5.83,5.83,0,0,1-5.42-2.64C180,88.5,154.74,31.7,154.74,29.85a5.22,5.22,0,0,1,5.16-5.41,5.5,5.5,0,0,1,5.54,3.3c6.48,11.76,10.31,25.1,17.31,36.72a6.88,6.88,0,0,0,6.6,3.83c3.17,0,4.89-1.19,6.47-3.83,4.23-7.39,13.08-33.55,17-37.91a4.69,4.69,0,0,1,3.44-2,3.67,3.67,0,0,1,3.57,3.7C219.87,30.65,194.77,90.62,192.92,92.47Z M272.44,62.48c-11.62.4-23.38.13-35,.13-4.63,0-8.33,2.51-8.33,7.53,0,11.36,14.4,15.46,23.52,15.46,18.36,0,20.6-13.08,26.68-13.08a3.81,3.81,0,0,1,3.7,3.83,9,9,0,0,1-2.51,5.55c-7.66,9.12-16.65,12.68-28.4,12.68-21,0-35.53-12.42-35.53-33.95,0-19.94,15.19-34.87,35-34.87,14.13,0,31.7,11.76,31.7,26.29C283.27,59.44,279.44,62.22,272.44,62.48Zm-20.74-28c-8.19,0-15.19,2.37-19.68,9.64a9.71,9.71,0,0,0-1.85,5c0,5.15,4.76,6.21,9,6.21h12.42c6.21,0,20.74,2.64,20.74-6.47C272.31,40.42,258.84,34.48,251.7,34.48Z M144.05,94.58c-4.47,0-5.66-2.77-5.66-6.85l.13-54c0-3.82,1.32-7,5.67-7a5,5,0,0,1,4.21,2,8.49,8.49,0,0,1,1.45,5c0,18.05.26,36,.26,54C150.11,91.81,148.4,94.58,144.05,94.58Z"
			);
			ctx.fill(path1);
			ctx.restore();

			// Draw AWS logo
			ctx.save();
			ctx.translate(vercelLogoWidth + logoSpacing, 0);
			const awsScale = logoHeight / 140;
			ctx.scale(awsScale, awsScale);
			const path = new Path2D(
				"M66.57,94.58c-2.77,0-5.41-3.17-11-3.17C48.74,91.41,42.27,95,35.14,95,14.26,95,0,81.11,0,60.1,0,40.42,15.06,25.36,34.74,25.36,42.27,25.36,50.2,30,54.69,30,63,30,60.37,16,60.37,10.7,60.37,6,60.9,0,67.1,0c4.63,0,5.55,4.36,5.55,8.19V88.5C72.65,93.26,71.2,94.58,66.57,94.58ZM35.27,33.82C20.21,33.82,9,44.91,9,60,9,74.24,21,85.6,35.14,85.6c14.79,0,25.49-11.76,25.49-26.29A25.48,25.48,0,0,0,35.27,33.82Z M131.05,35.68c-1.78.5-5.09.1-7.34-.56-4.21-1.23-7.12-1-11.48-1-8.06,0-19.34,2.25-19.34,12.82V87.45c0,3.83.26,8.45-4.89,8.45s-6.6-3.57-6.6-8.06V34.34c0-4.22.26-8.45,5.68-8.45,2.51,0,5.68,2,5.68,4.76,5.41-4.36,17.57-6.34,24.43-6.34,5.29,0,17.61,1.93,17.61,7.12C134.8,33.67,133.55,35,131.05,35.68Z M192.92,92.47a6.22,6.22,0,0,1-5,2.24,5.83,5.83,0,0,1-5.42-2.64C180,88.5,154.74,31.7,154.74,29.85a5.22,5.22,0,0,1,5.16-5.41,5.5,5.5,0,0,1,5.54,3.3c6.48,11.76,10.31,25.1,17.31,36.72a6.88,6.88,0,0,0,6.6,3.83c3.17,0,4.89-1.19,6.47-3.83,4.23-7.39,13.08-33.55,17-37.91a4.69,4.69,0,0,1,3.44-2,3.67,3.67,0,0,1,3.57,3.7C219.87,30.65,194.77,90.62,192.92,92.47Z M272.44,62.48c-11.62.4-23.38.13-35,.13-4.63,0-8.33,2.51-8.33,7.53,0,11.36,14.4,15.46,23.52,15.46,18.36,0,20.6-13.08,26.68-13.08a3.81,3.81,0,0,1,3.7,3.83,9,9,0,0,1-2.51,5.55c-7.66,9.12-16.65,12.68-28.4,12.68-21,0-35.53-12.42-35.53-33.95,0-19.94,15.19-34.87,35-34.87,14.13,0,31.7,11.76,31.7,26.29C283.27,59.44,279.44,62.22,272.44,62.48Zm-20.74-28c-8.19,0-15.19,2.37-19.68,9.64a9.71,9.71,0,0,0-1.85,5c0,5.15,4.76,6.21,9,6.21h12.42c6.21,0,20.74,2.64,20.74-6.47C272.31,40.42,258.84,34.48,251.7,34.48Z M144.05,94.58c-4.47,0-5.66-2.77-5.66-6.85l.13-54c0-3.82,1.32-7,5.67-7a5,5,0,0,1,4.21,2,8.49,8.49,0,0,1,1.45,5c0,18.05.26,36,.26,54C150.11,91.81,148.4,94.58,144.05,94.58Z"
			);
			ctx.fill(path);
			ctx.restore();

			ctx.restore();

			textImageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			ctx.clearRect(0, 0, canvas.width, canvas.height);

			return Math.max(vercelScale, awsScale);
		}

		function createParticle(scale: number) {
			if (!ctx || !canvas || !textImageData) return null;

			const data = textImageData.data;
			const particleGap = 2;

			for (let attempt = 0; attempt < 100; attempt++) {
				const x = Math.floor(Math.random() * canvas.width);
				const y = Math.floor(Math.random() * canvas.height);

				if (data[(y * canvas.width + x) * 4 + 3] > 128) {
					const logoHeight = isMobile ? 60 : 120;
					const vercelLogoWidth = logoHeight * (40 / 19.7762);
					const awsLogoWidth = logoHeight * (283 / 140);
					const logoSpacing = isMobile ? 30 : 60;
					const totalWidth = vercelLogoWidth + awsLogoWidth + logoSpacing;
					const centerX = canvas.width / 2;
					const centerY = canvas.height / 2;
					const isAWSLogo = x >= centerX + totalWidth / 2 - awsLogoWidth;
					return {
						x: x,
						y: y,
						baseX: x,
						baseY: y,
						size: Math.random() * 1 + 0.5,
						color: "white",
						scatteredColor: isAWSLogo ? "#FF9900" : "#00DCFF",
						isAWS: isAWSLogo,
						life: Math.random() * 100 + 50,
					};
				}
			}

			return null;
		}

		function createInitialParticles(scale: number) {
			const baseParticleCount = 7000; // Increased base count for higher density
			const particleCount = Math.floor(
				baseParticleCount *
					Math.sqrt((canvas.width * canvas.height) / (1920 * 1080))
			);
			for (let i = 0; i < particleCount; i++) {
				const particle = createParticle(scale);
				if (particle) particles.push(particle);
			}
		}

		let animationFrameId: number;

		function animate(scale: number) {
			if (!ctx || !canvas) return;
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			ctx.fillStyle = "black";
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			const { x: mouseX, y: mouseY } = mousePositionRef.current;
			const maxDistance = 240;

			for (let i = 0; i < particles.length; i++) {
				const p = particles[i];
				const dx = mouseX - p.x;
				const dy = mouseY - p.y;
				const distance = Math.sqrt(dx * dx + dy * dy);

				if (
					distance < maxDistance &&
					(isTouchingRef.current || !("ontouchstart" in window))
				) {
					const force = (maxDistance - distance) / maxDistance;
					const angle = Math.atan2(dy, dx);
					const moveX = Math.cos(angle) * force * 60;
					const moveY = Math.sin(angle) * force * 60;
					p.x = p.baseX - moveX;
					p.y = p.baseY - moveY;

					ctx.fillStyle = p.scatteredColor;
				} else {
					p.x += (p.baseX - p.x) * 0.1;
					p.y += (p.baseY - p.y) * 0.1;
					ctx.fillStyle = "white";
				}

				ctx.fillRect(p.x, p.y, p.size, p.size);

				p.life--;
				if (p.life <= 0) {
					const newParticle = createParticle(scale);
					if (newParticle) {
						particles[i] = newParticle;
					} else {
						particles.splice(i, 1);
						i--;
					}
				}
			}

			const baseParticleCount = 7000;
			const targetParticleCount = Math.floor(
				baseParticleCount *
					Math.sqrt((canvas.width * canvas.height) / (1920 * 1080))
			);
			while (particles.length < targetParticleCount) {
				const newParticle = createParticle(scale);
				if (newParticle) particles.push(newParticle);
			}

			animationFrameId = requestAnimationFrame(() => animate(scale));
		}

		const scale = createTextImage();
		createInitialParticles(scale);
		animate(scale);

		const handleResize = () => {
			updateCanvasSize();
			const newScale = createTextImage();
			particles = [];
			createInitialParticles(newScale);
		};

		const handleMove = (x: number, y: number) => {
			mousePositionRef.current = { x, y };
		};

		const handleMouseMove = (e: MouseEvent) => {
			handleMove(e.clientX, e.clientY);
		};

		const handleTouchMove = (e: TouchEvent) => {
			if (e.touches.length > 0) {
				e.preventDefault();
				handleMove(e.touches[0].clientX, e.touches[0].clientY);
			}
		};

		const handleTouchStart = () => {
			isTouchingRef.current = true;
		};

		const handleTouchEnd = () => {
			isTouchingRef.current = false;
			mousePositionRef.current = { x: 0, y: 0 };
		};

		const handleMouseLeave = () => {
			if (!("ontouchstart" in window)) {
				mousePositionRef.current = { x: 0, y: 0 };
			}
		};

		window.addEventListener("resize", handleResize);
		canvas.addEventListener("mousemove", handleMouseMove);
		canvas.addEventListener("touchmove", handleTouchMove, { passive: false });
		canvas.addEventListener("mouseleave", handleMouseLeave);
		canvas.addEventListener("touchstart", handleTouchStart);
		canvas.addEventListener("touchend", handleTouchEnd);

		return () => {
			window.removeEventListener("resize", handleResize);
			canvas.removeEventListener("mousemove", handleMouseMove);
			canvas.removeEventListener("touchmove", handleTouchMove);
			canvas.removeEventListener("mouseleave", handleMouseLeave);
			canvas.removeEventListener("touchstart", handleTouchStart);
			canvas.removeEventListener("touchend", handleTouchEnd);
			cancelAnimationFrame(animationFrameId);
		};
	}, [isMobile]);

	return (
		<div className="relative w-full h-dvh flex flex-col items-center justify-center bg-black">
			<canvas
				ref={canvasRef}
				className="w-full h-full absolute top-0 left-0 touch-none"
				aria-label="Interactive particle effect with Vercel and AWS logos"
			/>
		</div>
	);
}
