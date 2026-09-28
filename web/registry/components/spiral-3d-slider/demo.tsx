import { Spiral3DSlider } from "./component";

export default function Spiral3DSliderUsage() {

    const slides = [
        {
            src: "/itjustworks.jpg",
            alt: "Red fashion portrait swept through a long exposure",
        },
        {
            src: "/itjustworks.jpg",
            alt: "Profile illuminated by vivid blue motion trails",
        },
        {
            src: "/itjustworks.jpg",
            alt: "Portrait fragmented by layered horizontal motion",
        },
        {
            src: "/itjustworks.jpg",
            alt: "Teal portrait captured with an expressive camera blur",
        },
        {
            src: "/itjustworks.jpg",
            alt: "Monochrome photographer reflected through moving glass",
        },
        {
            src: "/itjustworks.jpg",
            alt: "Warm portrait dissolving through a soft orange exposure",
        },
        {
            src: "/itjustworks.jpg",
            alt: "Blue studio portrait split into a double exposure",
        },
        {
            src: "/itjustworks.jpg",
            alt: "Editorial portrait crossed by dark crimson light trails",
        },
        {
            src: "/itjustworks.jpg",
            alt: "Figure lit by saturated red and electric blue light",
        },
        {
            src: "/itjustworks.jpg",
            alt: "Shadowed portrait traced by muted green light",
        },
        {
            src: "/itjustworks.jpg",
            alt: "Silver portrait stretched into a quiet horizontal blur",
        },
        {
            src: "/itjustworks.jpg",
            alt: "Crimson profile emerging from a green studio shadow",
        },
        {
            src: "/itjustworks.jpg",
            alt: "Blue portrait stretched through a long exposure",
        },
        {
            src: "/itjustworks.jpg",
            alt: "Portrait washed in green light and a magenta prism haze",
        },
        {
            src: "/itjustworks.jpg",
            alt: "White-clad figure swept into a luminous studio motion",
        },
        {
            src: "/itjustworks.jpg",
            alt: "Portrait distorted through a translucent silver visor",
        },
    ];

    return (
        <Spiral3DSlider
            items={slides}
            className="h-full min-h-0"
            ariaLabel="Cinematic editorial gallery"
        />
    )
}




