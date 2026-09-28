import { DiaTextReveal } from "./component"

export default function Usage() {
    return (
        <div className="flex min-h-56 items-center justify-center p-8">
            <DiaTextReveal
                className="text-4xl font-bold tracking-tight"
                colors={["#f97316", "#eab308", "#22c55e", "#3b82f6", "#a855f7"]}
                delay={0.35}
                duration={2.4}
                text="Made with care"
                textColor="black"
            />
            {/* <h1 className="text-center text-3xl font-semibold tracking-tight md:text-4xl">
                Learn to{" "}
                <DiaTextReveal
                    repeat
                    repeatDelay={1.2}
                    text={["build faster", "ship smarter", "scale easier"]}
                />
            </h1>
            <DiaTextReveal
                className="text-4xl font-bold tracking-tight"
                colors={["#22d3ee", "#818cf8", "#f472b6", "#34d399"]}
                text="Design systems"
            /> */}
        </div>
    )
}

