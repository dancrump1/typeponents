import CountdownItem from "./component";

const StickyCountdown = () => {
    return (
        <div className="sticky left-0 right-0 top-0 z-50 w-full bg-indigo-600 px-2 py-0.5 text-white shadow-md">
            <div className="mx-auto flex w-fit max-w-5xl flex-wrap items-center justify-center gap-x-4 text-xs md:text-sm">
                <CountdownItem unit="Day" text="days" />
                <CountdownItem unit="Hour" text="hours" />
                <CountdownItem unit="Minute" text="minutes" />
                <CountdownItem unit="Second" text="seconds" />
            </div>
        </div>
    );
};

export default function StickyCountdownUsage() {
    return (
        <div>
            <StickyCountdown />
        </div>
    );
}