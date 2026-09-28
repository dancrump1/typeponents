import SplitReveal from "./component";
import { useState } from "react";

const SAMPLE_IMAGES = [
    "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=900&h=1125&q=85",
    "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=900&h=1125&q=85",
    "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=900&h=1125&q=85",
    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=900&h=1125&q=85",
];



export default function SplitRevealUsage() {
    const [ready, setReady] = useState(false);
    return (
        <div>
            <SplitReveal
                images={SAMPLE_IMAGES}
                lockScroll
                onComplete={() => setReady(true)}
                renderProgress={({ loaded, total }) => (
                    <p>
                        {loaded}/{total}
                    </p>
                )}
            />
        </div>
    );
}

