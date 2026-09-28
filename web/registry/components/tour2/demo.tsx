import { useTour } from "./component"
import { Button } from "@/components/ui/button"

export default function Tour2Usage() {
    const tour = useTour()

    return (
        <div>

            <Button size="lg" onClick={() => tour.start("main")}>
                Start Tour
            </Button>

            <div data-tour-step-id="step1">step 1 in the tour wooooot</div>
            <div data-tour-step-id="step2">step 2 in the tour wooooot</div>
        </div>

    )
}