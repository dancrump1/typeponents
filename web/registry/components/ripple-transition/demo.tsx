import { RippleTransition } from "./component";

const images = [
    "https://images.unsplash.com/photo-1511497584788-876760111969?auto=format&fit=crop&q=85&w=1800",
    "https://images.unsplash.com/photo-1473773508845-188df298d2d1?auto=format&fit=crop&q=85&w=1800",
    "https://images.unsplash.com/photo-1502082553048-f009c37129b9?auto=format&fit=crop&q=85&w=1800",
]

export default function RippleTransitionUsage() {
    return (
        <div className="flex h-screen w-screen items-center justify-center">
            < RippleTransition
                images={images}
                className="h-[520px] w-full"
                autoPlay
                autoPlayInterval={3200}
                autoPlayOrigin="random"
                duration={1.4}
                pinch
            />
        </div>
    );
}    
