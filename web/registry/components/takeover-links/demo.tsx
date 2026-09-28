import { AnimatedLink, LinkImage, UnderlayTransition } from "./component";
import { useState } from "react";

const Logo = () => {
    // Temp logo from https://logoipsum.com/
    return (
        <svg
            width="50"
            height="39"
            viewBox="0 0 50 39"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-4 scale-75 fill-neutral-100 md:scale-100"
        >
            <path
                d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z"
                stopColor="#000000"
            ></path>
            <path
                d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z"
                stopColor="#000000"
            ></path>
        </svg>
    );
};


const LINKS = [
    {
        href: "#",
        text: "Art",
        imgSrc: "/imgs/nature/1.jpg",
        id: 1,
    },
    {
        href: "#",
        text: "Design",
        imgSrc: "/imgs/nature/6.jpg",
        id: 2,
    },
    {
        href: "#",
        text: "Photos",
        imgSrc: "/imgs/nature/3.jpg",
        id: 3,
    },
    {
        href: "#",
        text: "Contact",
        imgSrc: "/imgs/nature/7.jpg",
        id: 4,
    },
];

export const TakeoverLinks = () => {
    const [active, setActive] = useState<number | null>(null);

    return (
        <nav className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-neutral-950 py-12 text-neutral-100">
            <div
                onMouseLeave={() => setActive(null)}
                className="relative z-20 flex flex-col items-center mix-blend-difference"
            >
                <Logo />
                {LINKS.map((l) => {
                    return (
                        <AnimatedLink
                            setActive={setActive}
                            active={active}
                            href={l.href}
                            id={l.id}
                            key={l.id}
                        >
                            {l.text}
                        </AnimatedLink>
                    );
                })}
            </div>

            {LINKS.map((l) => {
                return (
                    <LinkImage active={active} imgSrc={l.imgSrc} id={l.id} key={l.id} />
                );
            })}

            <UnderlayTransition active={active} />
        </nav>
    );
};

export default function TakeoverLinksUsage() {
    return (
        <div>
            <TakeoverLinks />
        </div>
    );
}