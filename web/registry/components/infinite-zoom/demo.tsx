import InfiniteZoom, { type InfiniteZoomProps } from "./component"

const DATA = [
    "/itjustworks.jpg",
    "/itjustworks.jpg",
    "/itjustworks.jpg",
    "/itjustworks.jpg",
    "/itjustworks.jpg",
]

export default function InfiniteParallaxDemo(controls: Partial<InfiniteZoomProps>) {
    return (
        <InfiniteZoom
            className="absolute w-screen h-screen inset-0 overflow-hidden touch-none"
            {...controls}
        >
            {DATA.map((item) => {
                return (
                    <div className="relative w-full h-full overflow-hidden" key={item}>
                        <img
                            src={item}
                            alt="image"
                            width={100}
                            height={100}
                            className="object-cover w-full h-full select-none pointer-events-none"
                            draggable={false}
                        />
                    </div>
                )
            })}
        </InfiniteZoom>
    )
}
