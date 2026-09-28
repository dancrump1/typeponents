import LinePath from "./component";
import { useScroll } from "motion/react";
import { useRef } from "react";


export default function SvgFollowScrollUsage() {
    const ref = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: ref,
    });

    return (
        <section
            ref={ref}
            className="mx-auto flex h-[350vh] w-screen flex-col items-center overflow-hidden bg-[#FAFDEE] px-4 text-[#1F3A4B]"
        >
            <div className="mt-42 relative flex w-fit flex-col items-center justify-center gap-5 text-center">
                <h1 className="font-jakarta-sans relative z-10 text-7xl font-medium tracking-[-0.08em] lg:text-9xl">
                    The Stroke <br /> That follows the <br />
                    Scroll Progress
                </h1>
                <p className="font-jakarta-sans relative z-10 max-w-2xl text-xl font-medium text-[#1F3A4B]">
                    Scroll down to see the effect
                </p>

                <LinePath
                    className="absolute -right-[40%] top-0 z-0"
                    scrollYProgress={scrollYProgress}
                />
            </div>

            <div className="rounded-4xl font-jakarta-sans w-full translate-y-[200vh] bg-[#1F3A4B] pb-10 text-[#FAFDEE]">
                <h1 className="mt-10 text-center text-[15.5vw] font-bold leading-[0.9] tracking-tighter lg:text-[16.6vw]">
                    skiperui.com
                </h1>
                <div className="mt-80 flex w-full flex-col items-start gap-5 px-4 font-medium lg:mt-0 lg:flex-row lg:justify-between">
                    <div className="flex w-full items-center justify-between gap-12 uppercase lg:w-fit lg:justify-center">
                        <p className="w-fit text-sm">
                            punjab, india <br />
                            and online
                        </p>
                        <p className="w-fit text-right text-sm lg:text-left">
                            sep 1, 2025 <br /> the Moosa pind
                        </p>
                    </div>
                    <div className="flex w-full flex-wrap items-center justify-between gap-12 uppercase lg:w-fit lg:justify-center">
                        <p className="w-fit text-sm">
                            onilne <br /> free
                        </p>
                        <p className="w-fit text-right text-sm lg:text-left">
                            in person tickets <br /> $600
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};
