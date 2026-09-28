# Hover Greyscale Logo Carousel

- Categories: Carousels
- Tags: hover, autoplay
- Import: `@/components/ui/hover-greyscale-logo-carousel`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/hover-greyscale-logo-carousel.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`
- `react-icons`
- `react-use-measure`

## Usage

```tsx
import HoverGreyscaleLogoCarousel from "./component";

export default function HoverGreyscaleLogoCarouselUsage() {
    const renderSpacer = () => (
        <div className="px-4">
            <div className="h-24 mx-auto max-w-7xl border-x border-neutral-300" />
        </div>
    );
    return (
        <section className="overflow-hidden bg-white text-neutral-900">
            {renderSpacer()}
            <HoverGreyscaleLogoCarousel />
            {renderSpacer()}
        </section>
    );
}
```

## Source

### `components/ui/hover-greyscale-logo-carousel.tsx`

```tsx
import { motion, useAnimationFrame, useMotionValue } from "motion/react";
import { useState, type Dispatch, type SetStateAction } from "react";
import type { IconType } from "react-icons";
import {
    SiAirtable,
    SiAsana,
    SiAtlassian,
    SiCanva,
    SiDropbox,
    SiFigma,
    SiGoogle,
    SiHubspot,
    SiMiro,
    SiShopify,
    SiStripe,
    SiTwilio,
    SiWoocommerce,
} from "react-icons/si";
import useMeasure from "react-use-measure";

type Logo = {
    id: string;
    name: string;
    Icon: IconType;
    brandColor: string;
};

const LOGOS: Logo[] = [
    { id: "stripe", name: "stripe", Icon: SiStripe, brandColor: "#635bff" },
    { id: "google", name: "Google", Icon: SiGoogle, brandColor: "#4285f4" },
    { id: "shopify", name: "shopify", Icon: SiShopify, brandColor: "#7ab55c" },
    { id: "figma", name: "Figma", Icon: SiFigma, brandColor: "#111827" },
    { id: "miro", name: "Miro", Icon: SiMiro, brandColor: "#f7c600" },
    { id: "dropbox", name: "Dropbox", Icon: SiDropbox, brandColor: "#0061ff" },
    { id: "asana", name: "Asana", Icon: SiAsana, brandColor: "#f06a6a" },
    {
        id: "atlassian",
        name: "Atlassian",
        Icon: SiAtlassian,
        brandColor: "#1868db",
    },
    { id: "airtable", name: "Airtable", Icon: SiAirtable, brandColor: "#f97316" },
    { id: "hubspot", name: "HubSpot", Icon: SiHubspot, brandColor: "#ff7a59" },
    { id: "twilio", name: "Twilio", Icon: SiTwilio, brandColor: "#f22f46" },
    {
        id: "woocommerce",
        name: "woo",
        Icon: SiWoocommerce,
        brandColor: "#7f54b3",
    },
    { id: "canva", name: "Canva", Icon: SiCanva, brandColor: "#00c4cc" },
];

const SCROLL_SPEED = 56;



const HoverGreyscaleLogoCarousel = () => {
    const [hoveredLogo, setHoveredLogo] = useState<string | null>(null);
    const [measureRef, { width }] = useMeasure();
    const x = useMotionValue(0);

    useAnimationFrame((_, delta) => {
        if (hoveredLogo || !width) {
            return;
        }

        const next = x.get() - (delta / 1000) * SCROLL_SPEED;
        x.set(next <= -width ? next + width : next);
    });

    return (
        <div className="border-y border-neutral-300 px-4">
            <div className="max-w-7xl mx-auto border-x border-neutral-300">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden bg-white"
                >
                    <div className="overflow-hidden">
                        <motion.div style={{ x }} className="flex w-max">
                            <div ref={measureRef} className="flex">
                                {LOGOS.map((logo) => (
                                    <LogoCell
                                        key={`primary-${logo.id}`}
                                        hoveredLogo={hoveredLogo}
                                        logo={logo}
                                        setHoveredLogo={setHoveredLogo}
                                    />
                                ))}
                            </div>
                            <div className="flex">
                                {LOGOS.map((logo) => (
                                    <LogoCell
                                        key={`duplicate-${logo.id}`}
                                        hoveredLogo={hoveredLogo}
                                        logo={logo}
                                        setHoveredLogo={setHoveredLogo}
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

const LogoCell = ({
    hoveredLogo,
    logo,
    setHoveredLogo,
}: {
    hoveredLogo: string | null;
    logo: Logo;
    setHoveredLogo: Dispatch<SetStateAction<string | null>>;
}) => {
    const isDimmed = hoveredLogo !== null && hoveredLogo !== logo.id;

    return (
        <motion.button
            type="button"
            onPointerEnter={() => setHoveredLogo(logo.id)}
            onPointerLeave={() =>
                setHoveredLogo((current) => (current === logo.id ? null : current))
            }
            onFocus={() => setHoveredLogo(logo.id)}
            onBlur={() =>
                setHoveredLogo((current) => (current === logo.id ? null : current))
            }
            animate={{
                filter: isDimmed ? "grayscale(1)" : "grayscale(0)",
                opacity: isDimmed ? 0.5 : 1,
            }}
            whileHover={{ y: -3 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex h-[72px] min-w-[148px] items-center justify-center px-5 md:h-[82px] md:min-w-[176px] md:px-7"
            aria-label={logo.name}
        >
            <div
                className="flex items-center gap-3 whitespace-nowrap transition-transform duration-200"
                style={{ color: logo.brandColor }}
            >
                <logo.Icon className="text-[1.15rem] md:text-[1.3rem]" />
                <span className="text-[1rem] font-semibold tracking-[-0.04em] md:text-[1.35rem]">
                    {logo.name}
                </span>
            </div>
        </motion.button>
    );
};

export default HoverGreyscaleLogoCarousel;
```
