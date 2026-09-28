import Lightfall from "./component";

export default function Usage() {
    return (
        <div>
            <Lightfall
                colors={['#A6C8FF', '#5227FF', '#FF9FFC']}
                backgroundColor="#0A29FF"
                speed={0.5}
                streakCount={2}
                streakWidth={1}
                streakLength={1}
                glow={1}
                density={0.6}
                twinkle={1}
                zoom={3}
                backgroundGlow={0.5}
                opacity={1}
                mouseInteraction
                mouseStrength={0.5}
                mouseRadius={1}
                color1="#A6C8FF"
                color2="#5227FF"
                color3="#FF9FFC"
            />		</div>
    );
}