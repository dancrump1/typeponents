import { useRef, type RefObject } from "react"
import { ScrollSplitCard } from "./component"

export default function Example({
    containerRef: externalContainerRef,
}: {
    containerRef?: RefObject<HTMLDivElement | null>;
}) {
    const internalContainerRef = useRef<HTMLDivElement>(null)
    const containerRef = externalContainerRef ?? internalContainerRef
    const ownsScrollRoot = !externalContainerRef

    return (
        <div
            ref={ownsScrollRoot ? containerRef : undefined}
            className={ownsScrollRoot ? "h-full w-full overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]" : "h-full w-full"}
        >
            <ScrollSplitCard
                containerRef={containerRef}
                imageSrc="https://images.unsplash.com/photo-1773058373644-74e4120bfc77?q=80&w=2832&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                cards={[
                    {
                        title: "Going Zero to One",
                        description: "If you've navigating a new business... breaking into a new market.",
                        bgColor: "#e2e2e2",
                        textColor: "#111111"
                    },
                    {
                        title: "Scaling from One to N",
                        description: "If you've achieved Product/Market Fit...",
                        bgColor: "#1a5bcf",
                        textColor: "#ffffff"
                    },
                    {
                        title: "Need Quick Solutions",
                        description: "If you know exactly what you want and need...",
                        bgColor: "#1c1c1c",
                        textColor: "#ffffff"
                    }
                ]}
            />
        </div>
    )
}