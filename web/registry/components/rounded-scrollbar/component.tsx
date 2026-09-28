import React, { useEffect } from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Credit:
// https://codepen.io/jh3y/pen/gOEgxbd

// CSS:
// to_share/rounded-scroll.scss

const RoundedScroll = () => {
	useEffect(() => {
		const scroller = document.querySelector(".scroll-container");
		const list = scroller.querySelector("ul");
		const bar = scroller.querySelector(".scroller__bar");
		const track = scroller.querySelector(".bar__track");
		const thumb = bar.querySelector(".bar__thumb");
		const styles = scroller.querySelector("style");

		const CONFIG = {
			show: true,
			radius: 32,
			scrollPadding: 100,
			stroke: 7,
			inset: 4,
			trail: 0,
			track: true,
			thumb: 80,
			finish: 5,
			alpha: 0.75,
			track: 0,
			cornerLength: 0,
		};

		/**
		 * Set up a ResizeObserver that syncs the SVG path and viewBox
		 * with the size of the scroller. If you have a static sized scroller
		 * and radius, etc. You can take a snapshot of it and use it over and over.
		 * The ResizeObserver is mainly for demo purposes so you can make what you
		 * want.
		 * */
		const syncBar = (scrollerBar) => {
			const mid = CONFIG.radius;
			const innerRad = Math.max(
				0,
				CONFIG.radius - (CONFIG.inset + CONFIG.stroke * 0.5)
			);
			const padTop = CONFIG.inset + CONFIG.stroke * 0.5;
			const padLeft = CONFIG.radius * 2 - padTop;
			bar.setAttribute(
				"viewBox",
				`0 0 ${CONFIG.radius * 2} ${scrollerBar.target.offsetHeight}`
			);
			scroller.style.setProperty("--stroke-width", CONFIG.stroke);
			let d = `
  M${mid - CONFIG.trail},${padTop}
    ${innerRad === 0 ? `` : `L${mid},${padTop}`}
    ${
			innerRad === 0
				? `L${padLeft},${padTop}`
				: `a${innerRad},${innerRad} 0 0 1 ${innerRad} ${innerRad}`
		}`;
			thumb.setAttribute("d", d);
			const cornerLength = Math.ceil(thumb.getTotalLength());
			CONFIG.cornerLength = cornerLength;
			d = `
    M${mid - CONFIG.trail},${padTop}
    ${innerRad === 0 ? `` : `L${mid},${padTop}`}
    ${
			innerRad === 0
				? `L${padLeft},${padTop}`
				: `a${innerRad},${innerRad} 0 0 1 ${innerRad} ${innerRad}`
		}
    L${padLeft},${
				scrollerBar.target.offsetHeight -
				(CONFIG.inset + CONFIG.stroke * 0.5 + innerRad)
			}
    ${
			innerRad === 0
				? `L${padLeft},${
						scrollerBar.target.offsetHeight -
						(CONFIG.inset + CONFIG.stroke * 0.5)
				  }`
				: `a${innerRad},${innerRad} 0 0 1 ${-innerRad} ${innerRad}`
		}
    L${mid - CONFIG.trail},${
				scrollerBar.target.offsetHeight -
				(CONFIG.inset + CONFIG.stroke * 0.5)
			}
  `;
			thumb.setAttribute("d", d);
			track.setAttribute("d", d);
			scroller.style.setProperty(
				"--track-length",
				Math.ceil(track.getTotalLength())
			);
			scroller.style.setProperty("--track-start", cornerLength);
			scroller.style.setProperty("--start", CONFIG.thumb * 2 + cornerLength);
			scroller.style.setProperty(
				"--destination",
				Math.ceil(track.getTotalLength()) - cornerLength + CONFIG.thumb
			);
			styles.innerHTML = `
    @keyframes scroll {
      0% { stroke-dashoffset: ${CONFIG.thumb - CONFIG.finish}; }
      ${Math.floor(
			(CONFIG.scrollPadding / (list.scrollHeight - scroller.offsetHeight)) *
				100
		)}% { stroke-dashoffset: ${cornerLength * -1};}
      ${
			100 -
			Math.floor(
				(CONFIG.scrollPadding /
					(list.scrollHeight - scroller.offsetHeight)) *
					100
			)
		}% { stroke-dashoffset: ${
				(Math.floor(track.getTotalLength()) - cornerLength - CONFIG.thumb) *
				-1
			};}
      100% { stroke-dashoffset: ${
			(Math.floor(track.getTotalLength()) - CONFIG.finish) * -1
		}; }
    }
  `;
		};
		const resizeObserver = new ResizeObserver((entries) => {
			for (const entry of entries) {
				syncBar(entry);
				update();
				configureTimeline();
			}
		});
		resizeObserver.observe(scroller);

		let tl;
		const configureTimeline = () => {
			const frameOne = `${Math.floor(
				(CONFIG.scrollPadding /
					(list.scrollHeight - scroller.offsetHeight)) *
					100
			)}%`;
			const frameTwo = `${
				100 -
				Math.floor(
					(CONFIG.scrollPadding /
						(list.scrollHeight - scroller.offsetHeight)) *
						100
				)
			}%`;
			if (tl) tl.kill();
			tl = gsap.to(".bar__thumb", {
				scrollTrigger: {
					// scroller: scroller,
					scrub: true,
				},
				ease: "none",
				keyframes: {
					"0%": { strokeDashoffset: CONFIG.thumb - CONFIG.finish },
					[frameOne]: { strokeDashoffset: CONFIG.cornerLength * -1 },
					[frameTwo]: {
						strokeDashoffset:
							(Math.floor(track.getTotalLength()) -
								CONFIG.cornerLength -
								CONFIG.thumb) *
							-1,
					},
					"100%": {
						strokeDashoffset:
							(Math.floor(track.getTotalLength()) - CONFIG.finish) * -1,
					},
				},
			});
		};

		/**
		 * Use dat.gui to show off the configurability of things
		 * */
		if (CONFIG.show)
			document.documentElement.toggleAttribute("data-rounded-scroll");

		const update = () => {
			scroller.style.setProperty("--radius", CONFIG.radius);
			scroller.style.setProperty("--padding", CONFIG.scrollPadding);
			scroller.style.setProperty("--thumb-size", CONFIG.thumb);
			scroller.style.setProperty("--bar-alpha", CONFIG.alpha);
			scroller.style.setProperty("--track-alpha", CONFIG.track);
			scroller.style.setProperty(
				"--destination",
				Math.ceil(track.getTotalLength()) -
					((Math.ceil(track.getTotalLength()) - scroller.offsetHeight) *
						0.5 +
						CONFIG.inset)
			);
			scroller.style.setProperty("--start", CONFIG.thumb * 2);
			syncBar({ target: scroller });
		};

		syncBar({ target: scroller });
		update();

		if (!CSS.supports("(animation-timeline: scroll())")) {
			configureTimeline();
		}
	}, []);

	return (
		<div className="scroller">
			<svg
				className="scroller__bar bar"
				viewBox="0 0 56 56"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path className="bar__thumb" fill="none" stroke-linecap="round" />
				<path className="bar__track" fill="none" stroke-linecap="round" />
			</svg>
			<ul>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
				<li></li>
			</ul>
			<style id="scroller-frames"></style>
		</div>
	);
};

export default RoundedScroll;
