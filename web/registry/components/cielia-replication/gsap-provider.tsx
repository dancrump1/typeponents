"use client";

import { useEffect, useState } from "react";

import Tempus from "tempus";
import gsap from "gsap";

import { ScrollTriggerConfig } from "./scroll-trigger-context";

export function GsapProvider({ scrollTrigger = true }) {
	const [isMounted, setIsMounted] = useState(false);
	useEffect(() => {
		gsap.defaults({ ease: "none" });

		// merge rafs
		gsap.ticker.lagSmoothing(0);
		gsap.ticker.remove(gsap.updateRoot);
		Tempus?.add((time: number) => {
			gsap.updateRoot(time / 1000);
		}, 0);

		setIsMounted(true);
	}, []);

	if (!isMounted) return null;

	return scrollTrigger && <ScrollTriggerConfig />;
}
