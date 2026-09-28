"use client";

import { useLayoutEffect } from "react";

import Tempus from "tempus";
import gsap from "gsap";

import { ScrollTriggerConfig } from "./scroll-trigger-config";

export function GsapProvider({ scrollTrigger = false }) {
	useLayoutEffect(() => {
		gsap.defaults({ ease: "none" });

		// merge rafs
		gsap.ticker.lagSmoothing(0);
		gsap.ticker.remove(gsap.updateRoot);
		Tempus?.add((time: number) => {
			gsap.updateRoot(time / 1000);
		}, 0);
	}, []);

	return scrollTrigger && <ScrollTriggerConfig />;
}
