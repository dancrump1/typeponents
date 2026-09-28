"use client";

import { useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

export function ScrollTriggerConfig() {
	const lenis = useLenis(ScrollTrigger.update);

	useEffect(() => {
		ScrollTrigger.clearScrollMemory("manual");

		return () => {
			ScrollTrigger.clearScrollMemory("manual");
		};
	}, []);

	useEffect(() => ScrollTrigger.refresh(), [lenis]);

	return null;
}
