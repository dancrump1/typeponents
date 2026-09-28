import { WavyBlock, WavyBlockItem } from "./component";

export default function Usage() {

    const titles = [
        'Flexible',
        'Animated',
        'Customizable',
        'Optimized',
        'Lightweight',
        'Responsive',
        'UI Blocks',
    ];
    return (
        <div className="relative w-full flex items-center justify-center">
            <WavyBlock className="flex flex-col justify-start items-start gap-6">
                {titles.map((title, index) => (
                    <WavyBlockItem key={title} index={index}>
                        <h2 className=" text-[7.3vw] font-bold leading-none tracking-tighter uppercase whitespace-nowrap">
                            {title}
                        </h2>
                    </WavyBlockItem>
                ))}
            </WavyBlock>
        </div>
    );
}