import ClipDiv from "./component";

export default function ClipPathSvgMaskUsage() {
    return (
        <div className="relative flex h-full w-full items-center justify-center bg-[#f5f4f3]">
            <ClipDiv imgSrc="/itjustworks.jpg">
                <h1 className="font-cal-sans text-4xl text-red-500">Hover Me </h1>
            </ClipDiv>
        </div>);
}