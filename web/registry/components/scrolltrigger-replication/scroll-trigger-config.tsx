"use client";

import { useEffect, useLayoutEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useLenis } from "lenis/react";

gsap.registerPlugin(ScrollTrigger);

export function ScrollTriggerConfig() {
	useLayoutEffect(() => {
		ScrollTrigger.clearScrollMemory("manual");
	}, []);

	const lenis = useLenis(ScrollTrigger.update);
	useEffect(() => ScrollTrigger.refresh(), [lenis]);

	return null;
}
