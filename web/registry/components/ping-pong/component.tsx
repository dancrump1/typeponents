import React, { useEffect, useRef, useState } from "react";

import gsap from "gsap";
import SVG from "react-inlinesvg";

const pingpongRepeatCount = 3;
const pingpongDelay = 25;

const PingPong = () => {
	const scrollContainerRef = useRef();
	const [scrollHeight, setScrollHeight] = useState(0);
	const [scrollTop, setScrollTop] = useState(0);
	const [scrollOffset, setScrollOffset] = useState(0);
	const [scrollClient, setScrollClient] = useState(0);

	useEffect(() => {
		if (document !== undefined) {
			let scrollHeightPercentage = (scrollHeight * scrollTop) / scrollOffset;

			const movePingpong = () => {
				// Move pinpong svg
				scrollContainerRef.current.addEventListener("scroll", () => {
					if (!!document.getElementsByClassName("pingpong")?.length) {
						const heightPercentage =
							scrollTop / (scrollOffset - scrollClient);
						scrollHeightPercentage = scrollHeight * heightPercentage;

						// Move pingpong match w/ slider
						gsap.to(".pingpong", {
							top: scrollHeightPercentage,
							duration: 0.01,
						});
					}
				});
			};

			const animatePingpong = () => {
				// Animate Pingpong
				if (!!document.getElementsByClassName("pingpong")?.length) {
					// set pingpong match on table
					gsap.set(".pingpong", {
						top: scrollHeightPercentage,
					});

					// start ball at lower player
					gsap.set(".pingpong > svg > path:last-of-type", {
						x: -55,
						y: 35,
					});

					// Show pingpong match
					gsap.to(".pingpong", {
						opacity: 1,
						duration: 1,
						delay: pingpongDelay,
					});

					// bounce of middle table
					gsap.to(".pingpong > svg > path:last-of-type", {
						x: 0,
						y: 100,
						repeat: pingpongRepeatCount,
						repeatDelay: 3,
						duration: 1,
						delay: pingpongDelay + 1,
					});
					// go to top player
					gsap.to(".pingpong > svg > path:last-of-type", {
						x: 70,
						y: 25,
						duration: 1,
						repeat: pingpongRepeatCount,
						repeatDelay: 3,
						delay: pingpongDelay + 2.5,
					});
					// back to middle table
					gsap.to(".pingpong > svg > path:last-of-type", {
						x: 0,
						y: 100,
						duration: 1,
						repeat: pingpongRepeatCount,
						repeatDelay: 3,
						delay: pingpongDelay + 3.5,
					});
					// back to lower player
					gsap.to(".pingpong > svg > path:last-of-type", {
						x: -55,
						y: 35,
						repeat: pingpongRepeatCount,
						repeatDelay: 3,
						duration: 1,
						delay: pingpongDelay + 4.5,
					});

					//  hide table
					gsap.to(".pingpong", {
						opacity: 0,
						duration: 1,
						delay: pingpongDelay + 13,
						onComplete: () =>
							[...document.querySelectorAll(".pingpong")][0]?.remove(),
					});
				}
			};

			animatePingpong();
			movePingpong();
		}
	}, [scrollHeight]);

	useEffect(() => {
		setScrollHeight(scrollContainerRef.current.scrollHeight);
		setScrollTop(scrollContainerRef.current.scrollTop);
		setScrollOffset(scrollContainerRef.current.offsetHeight);
		setScrollClient(scrollContainerRef.current.clientHeight);
	}, [scrollContainerRef.current]);

	return (
		<section
			ref={scrollContainerRef}
			className="h-[25vh] w-full overflow-y-scroll relative"
		>
			<div className="pingpong absolute opacity-0 -right-[100px] z-15 -rotate-90 pointer-events-none">
				<SVG src={"./pingpong.svg"} />
			</div>
			<div className="h-screen w-full">example content</div>
		</section>
	);
};

export default PingPong;
