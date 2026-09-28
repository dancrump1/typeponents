import PixelSwap from './component';

export default function PixelSwapUsage() {
    return <PixelSwap
        firstContent={
            <div className="click-prompt">
                <span>Click me</span>
            </div>
        }
        secondContent={
            <div className="found-message">
                <span>You found me</span>
            </div>
        }
        pixelSize={64}
        gap={0}
        pixelRadius={0}
        pixelSpin={0}
        pixelScale={0.35}
        duration={1400}
        pixelDuration={450}
        pattern="right-to-left"
        randomness={0}
        fade
        trigger="hover"
    />
}