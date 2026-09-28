import { useAnimate } from "motion/react";
import { useEffect, useRef, useState } from "react";

// NOTE: Change this date to whatever date you want to countdown to :)
const COUNTDOWN_FROM = "2024-10-01";

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

type Units = "Day" | "Hour" | "Minute" | "Second";


const CountdownItem = ({ unit, text }: { unit: Units; text: string }) => {
    const { ref, time } = useTimer(unit);
    return (
        <div className="flex w-fit items-center justify-center gap-1.5 py-2">
            <div className="relative w-full overflow-hidden text-center">
                <span
                    ref={ref}
                    className="block font-mono text-sm font-semibold md:text-base"
                >
                    {time}
                </span>
            </div>
            <span>{text}</span>
        </div>
    );
};

export default CountdownItem;

// NOTE: Framer motion exit animations can be a bit buggy when repeating
// keys and tabbing between windows. Instead of using them, we've opted here
// to build our own custom hook for handling the entrance and exit animations
const useTimer = (unit: Units) => {
    const [ref, animate] = useAnimate();

    const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
    const timeRef = useRef(0);

    const [time, setTime] = useState(0);

    useEffect(() => {
        intervalRef.current = setInterval(handleCountdown, 1000);

        return () => clearInterval(intervalRef.current || undefined);
    }, []);

    const handleCountdown = async () => {
        const end = new Date(COUNTDOWN_FROM);
        const now = new Date();
        const distance = +end - +now;

        let newTime = 0;

        if (unit === "Day") {
            newTime = Math.floor(distance / DAY);
        } else if (unit === "Hour") {
            newTime = Math.floor((distance % DAY) / HOUR);
        } else if (unit === "Minute") {
            newTime = Math.floor((distance % HOUR) / MINUTE);
        } else {
            newTime = Math.floor((distance % MINUTE) / SECOND);
        }

        if (newTime !== timeRef.current) {
            // Exit animation
            await animate(
                ref.current,
                { y: ["0%", "-50%"], opacity: [1, 0] },
                { duration: 0.35 }
            );

            timeRef.current = newTime;
            setTime(newTime);

            // Enter animation
            await animate(
                ref.current,
                { y: ["50%", "0%"], opacity: [0, 1] },
                { duration: 0.35 }
            );
        }
    };

    return { ref, time };
};