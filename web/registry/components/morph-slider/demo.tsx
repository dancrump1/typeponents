import MorphSlider from "./component"

export default function MorphSliderUsage() {
    const items = [
        { image: 'https://picsum.photos/seed/morph-a/1600/1000', caption: 'Northern Drift' },
        { image: 'https://picsum.photos/seed/morph-b/1200/1500', caption: 'Quiet Harbour' },
        { image: 'https://picsum.photos/seed/morph-c/1600/900', caption: 'Golden Ridge' }
    ]
    return (

        <div style={{ height: '500px', position: 'relative' }
        }>
            <MorphSlider
                items={items}
                transition="melt"
                intensity={0.55}
                aberration={0.35}
                drift={0.4}
                autoplay={false}
                overlayColor="#05060a"
                duration={1.1}
                ease="power2.inOut"
                scale={2.4}
                autoplayDelay={4}
                loop
                radius={16}
                showCaptions
                showControls
                showIndicators
            />
        </div >
    )
}