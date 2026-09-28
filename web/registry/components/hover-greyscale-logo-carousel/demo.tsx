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

