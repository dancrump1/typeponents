import ScrollExpand from "./component";

export default function ScrollExpandUsage() {
    return (
        <div>

            <ScrollExpand
                src="/hero.jpg"
                alt="Product hero"
                title="Built to scale"
                scrollHint="Scroll inside the frame"
                useWindowScroll
            >
                <h2>Every pixel, everywhere</h2>
                <p>The frame opens up as you scroll and hands the whole stage to your media.</p>
            </ScrollExpand>

            <div style={{ height: '520px' }}>
                <ScrollExpand src="/hero.jpg" title="Built to scale" mediaZoom={1.35}
                    startWidth={42}
                    startHeight={58}
                    startRadius={24}
                    endRadius={0}
                    mediaZoom={1.35}
                    scrollDistance={1.2}
                    holdDistance={0.35}
                    smoothing={0.1}
                    overlayScrim={0.45}
                    enabled
                />
            </div>
        </div>
    )
}