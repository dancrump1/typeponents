import HalftoneReveal from "./component";

export default function HalftoneRevealUsage() {
    return (
        <div style={{ height: '500px', position: 'relative' }}>
            <HalftoneReveal
                src="https://picsum.photos/seed/halftone-reveal/1200/800"
                inkColor="#141414"
                paperColor="#fff7e6"
                mode="mono"
                dotDensity={71}
                angle={45}
                revealRadius={0.4}
                dotSize={1}
                shape="circle"
                contrast={1.15}
                invert={false}
                edge={0.8}
                follow={0.37}
                idleReveal={0}
                trigger="hover"
            />
        </div>
    )
}