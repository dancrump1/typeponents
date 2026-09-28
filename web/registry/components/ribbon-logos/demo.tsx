import RibbonLogos, { LogoItemsTop, LogoItemsBottom, TranslateWrapper } from "./component";

export default function RibbonLogosUsage() {
    return (
        <section className="bg-amber-200 py-24">
            <h2 className="mx-4 mb-12 text-center text-2xl font-medium text-neutral-900 md:text-4xl">
                1B+ requests tracked for users like...
            </h2>
            <div className="flex translate-y-[50%] rotate-[7deg] scale-110 overflow-hidden border-y-4 border-neutral-900 bg-neutral-50">
                <TranslateWrapper>
                    <LogoItemsTop />
                </TranslateWrapper>
                <TranslateWrapper>
                    <LogoItemsTop />
                </TranslateWrapper>
                <TranslateWrapper>
                    <LogoItemsTop />
                </TranslateWrapper>
            </div>
            <div className="flex -translate-y-[50%] -rotate-[7deg] scale-110 overflow-hidden border-y-4 border-neutral-900 bg-neutral-50">
                <TranslateWrapper reverse>
                    <LogoItemsBottom />
                </TranslateWrapper>
                <TranslateWrapper reverse>
                    <LogoItemsBottom />
                </TranslateWrapper>
                <TranslateWrapper reverse>
                    <LogoItemsBottom />
                </TranslateWrapper>
            </div>
        </section>
    )
}