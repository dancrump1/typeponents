import { CutoutCardInsetLabel, CutoutCardImage, CutoutCardMedia, CutoutCard, cutoutCardSurfaceClassName, CutoutCorner, CutoutCardAction, CutoutCardContent, CutoutCardOverlay } from "./component";

export default function Usage() {
    return (
        <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
            <CutoutCard className={cutoutCardSurfaceClassName}>
                <CutoutCardMedia className="h-72">
                    <CutoutCardImage alt="Preview" src="/itjustworks.jpg" />
                    <CutoutCardOverlay />
                    <CutoutCardInsetLabel className="bottom-0 left-0 rounded-tr-[20px] bg-stone-50 px-5 py-3">
                        <span className="text-[11px] font-semibold uppercase tracking-widest text-stone-500">
                            Featured
                        </span>
                        <CutoutCorner className="absolute -right-[31px] -bottom-px rotate-90 text-stone-50" />
                        <CutoutCorner className="absolute -top-[31px] -left-px rotate-90 text-stone-50" />
                    </CutoutCardInsetLabel>
                </CutoutCardMedia>
                <CutoutCardContent>{/* title, body */}</CutoutCardContent>
                <CutoutCardAction className="right-6 bottom-6">{/* e.g. button */}</CutoutCardAction>
            </CutoutCard>		</div>
    );
}