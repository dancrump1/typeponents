# Tooltip Dog

- Categories: Cursor & Pointer Effects, Special Effects & FX
- Tags: hover
- Import: `@/components/ui/tooltip-dog`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/tooltip-dog.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `containerClasses` | `string` | — | — |
| `wrapperClasses` | `string` | — | — |
| `dogClasses` | `string` | — | — |
| `dogGradientClasses` | `string` | — | — |

## Usage

```tsx
import TooltipDog from "./component";

export default function TooltipDogUsage() {
    return (
        <div className="relative w-full flex items-center justify-center">
            <TooltipDog>
                <h1>Tooltip Dog</h1>
            </TooltipDog>
        </div>
    );
}
```

## Source

### `components/ui/tooltip-dog.tsx`

```tsx
'use client'

import { ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface Props {
    children?: ReactNode
    containerClasses?: string
    wrapperClasses?: string
    dogClasses?: string
    dogGradientClasses?: string
}

export default function TooltipDog({
    children,
    containerClasses,
    wrapperClasses,
    dogClasses,
    dogGradientClasses,
}: Props) {
    return (
        <div
            className={cn(
                'mouse-detector group relative -m-5 w-full p-5 max-md:m-0 max-md:p-0',
                containerClasses
            )}
        >
            <div
                className={cn(
                    'dog-light absolute top-0 right-0 h-36 w-36 rounded-full blur-xl transition duration-500 ease-in group-hover:bg-amber-200/10 max-md:hidden',
                    dogGradientClasses
                )}
            />
            <div className={cn('dog relative scale-100 p-5 pt-0!', wrapperClasses)}>
                <div
                    className={cn(
                        'pointer-events-none relative z-20 -mb-15 flex w-full justify-end',
                        dogClasses
                    )}
                >
                    <div className={cn('thedog relative max-w-max')}>
                        <div className='sleep-symbol absolute top-2.5 right-30 w-max group-hover:invisible'>
                            {Array.from({ length: 3 }).map((_, index) => (
                                <span
                                    className='relative inline-block scale-100 animate-[sleep_4s_ease-in-out_infinite] opacity-100'
                                    key={index}
                                >
                                    z
                                </span>
                            ))}
                        </div>

                        <svg
                            width='45.952225mm'
                            height='35.678726mm'
                            viewBox='0 0 45.952225 35.678726'
                            version='1.1'
                            id='dog-svg'
                            xmlns='http://www.w3.org/2000/svg'
                            aria-hidden
                            className='overflow-visible!'
                        >
                            <g
                                id='layer1'
                                className='inline'
                                transform='translate(-121.80376,-101.90461)'
                            >
                                <path
                                    className='inline fill-[#C9A66B] stroke-none stroke-[0.264583] [stroke-dasharray:none] [stroke-linecap:round] [stroke-linejoin:round] [stroke-opacity:0.988235]'
                                    d='m 144.95859,104.74193 c 6.01466,-2.1201 14.02915,-0.85215 17.62787,2.77812 3.59872,3.63027 2.91927,7.6226 -0.0661,11.80703 -2.98542,4.18443 -9.54667,3.58363 -15.1474,3.43959 -5.60073,-0.14404 -10.30411,-0.0586 -11.67474,-3.9026 7.85671,-2.22341 3.24576,-12.00205 9.26042,-14.12214 z'
                                    id='head-top'
                                />
                                <path
                                    className='inline fill-[#C9A66B] stroke-none stroke-[0.264583] [stroke-dasharray:none] [stroke-linecap:round] [stroke-linejoin:round] [stroke-opacity:0.988235]'
                                    d='m 156.30732,121.30486 c 0,0 -3.82398,2.52741 -4.14054,3.7997 -0.31656,1.2723 0.31438,2.18109 0.95701,2.55128 0.64264,0.3702 1.59106,-0.085 2.13559,-0.75306 0.54452,-0.6681 1.5629,-2.25488 2.47945,-3.20579 0.91654,-0.95091 2.96407,-2.74361 2.96407,-2.74361 l 0.73711,-3.60348 z'
                                    id='leg-front-right'
                                />
                                <path
                                    className='inline fill-[#C9A66B] stroke-none stroke-[0.264583] [stroke-dasharray:none] [stroke-linecap:round] [stroke-linejoin:round] [stroke-opacity:0.988235]'
                                    d='m 136.93356,123.08347 c 0,0 -3.20149,3.2804 -3.24123,4.59088 -0.0397,1.31049 0.60411,1.83341 1.3106,2.05901 0.7065,0.22559 1.60304,-0.55255 1.99363,-1.32084 0.39056,-0.76832 1.14875,-2.30337 2.04139,-3.29463 0.89264,-0.99126 3.37363,-3.37561 3.37363,-3.37561 l -1.30007,-3.61169 z'
                                    id='leg-front-left'
                                />
                                <path
                                    className='inline fill-[#C9A66B] stroke-none stroke-[0.264583] [stroke-dasharray:none] [stroke-linecap:round] [stroke-linejoin:round] [stroke-opacity:0.988235]'
                                    d='m 130.12859,121.60522 c -2.15849,1.92962 -3.38576,3.23532 -3.61836,4.5256 -0.23257,1.2903 0.0956,1.80324 0.76105,2.13059 0.66549,0.32733 1.66701,-0.31006 2.16665,-1.01233 0.49961,-0.70231 1.04598,-1.14963 2.83575,-3.05671 1.78977,-1.90708 5.91823,-3.27102 5.91823,-3.27102 l -0.75313,-3.99546 c 0,0 -5.15171,2.7497 -7.31019,4.67933 z'
                                    id='leg-back-left'
                                />
                                <path
                                    id='face'
                                    className='inline fill-[#C9A66B] stroke-none stroke-[0.292536] [stroke-dasharray:none] [stroke-linecap:round] [stroke-linejoin:round] [stroke-opacity:0.988235]'
                                    d='m 147.59927,113.85404 c 0.68896,4.40837 -4.04042,7.93759 -10.51533,8.9455 -6.47491,1.00791 -12.24344,-0.88717 -12.9324,-5.29555 -0.68895,-4.40838 3.44199,-9.94186 9.9169,-10.94977 6.47491,-1.0079 12.84186,2.89144 13.53083,7.29982 z'
                                />
                                {/* Floppy left ear */}
                                <path
                                    className='inline fill-[#B8895A] stroke-none stroke-[0.264583] [stroke-dasharray:none] [stroke-linecap:round] [stroke-linejoin:round] [stroke-opacity:0.988235]'
                                    d='m 125.2,112.8 c -4.8,-0.8 -7.2,3.2 -6.2,7.2 1,4 5.2,5.2 8.2,2.8 1.2,-1.6 0.5,-6.5 -2,-10 z'
                                    id='ear-left'
                                />
                                {/* Floppy right ear */}
                                <path
                                    className='inline fill-[#B8895A] stroke-none stroke-[0.264583] [stroke-dasharray:none] [stroke-linecap:round] [stroke-linejoin:round] [stroke-opacity:0.988235]'
                                    d='m 144.8,112.8 c 4.8,-0.8 7.2,3.2 6.2,7.2 -1,4 -5.2,5.2 -8.2,2.8 -1.2,-1.6 -0.5,-6.5 2,-10 z'
                                    id='ear-right'
                                />
                                {/* White snout / muzzle */}
                                <ellipse
                                    className='inline fill-[#FFFBF5] stroke-none'
                                    cx='137.02'
                                    cy='119.2'
                                    rx='4.2'
                                    ry='3.1'
                                    id='snout'
                                />
                                {/* White cheek markings */}
                                <ellipse
                                    className='inline fill-[#FFFBF5] stroke-none stroke-[0.56967] [stroke-dasharray:none] [stroke-linecap:round] [stroke-linejoin:round] [stroke-opacity:0.988235]'
                                    cx='142.61723'
                                    cy='108.6707'
                                    rx='3.0261719'
                                    ry='3.0757811'
                                    transform='rotate(1.8105864)'
                                />
                                <ellipse
                                    className='inline fill-black stroke-none stroke-[0.597086] [stroke-dasharray:none] [stroke-linecap:round] [stroke-linejoin:round] [stroke-opacity:0.988235]'
                                    cx='112.57543'
                                    cy='138.29808'
                                    rx='1.0380507'
                                    ry='1.3097118'
                                    transform='matrix(0.98048242,-0.19660678,0.20800608,0.97812753,0,0)'
                                />
                                <ellipse
                                    className='inline fill-[#f9f9f9] stroke-none stroke-[0.184905] [stroke-dasharray:none] [stroke-linecap:round] [stroke-linejoin:round] [stroke-opacity:0.988235]'
                                    cx='112.70263'
                                    cy='137.817'
                                    rx='0.32146212'
                                    ry='0.40558979'
                                    transform='matrix(0.98048242,-0.19660678,0.20800608,0.97812753,0,0)'
                                />
                                <ellipse
                                    className='inline fill-[#FFFBF5] stroke-none stroke-[0.56967] [stroke-dasharray:none] [stroke-linecap:round] [stroke-linejoin:round] [stroke-opacity:0.988235]'
                                    cx='135.40735'
                                    cy='110.12592'
                                    rx='3.0261719'
                                    ry='3.0757811'
                                    transform='rotate(1.8105864)'
                                />
                                <ellipse
                                    className='inline fill-black stroke-none stroke-[0.597086] [stroke-dasharray:none] [stroke-linecap:round] [stroke-linejoin:round] [stroke-opacity:0.988235]'
                                    cx='105.22613'
                                    cy='138.07497'
                                    rx='1.0380507'
                                    ry='1.3097118'
                                    transform='matrix(0.98048242,-0.19660678,0.20800608,0.97812753,0,0)'
                                />
                                <ellipse
                                    className='inline fill-[#f9f9f9] stroke-none stroke-[0.184905] [fill-opacity:1] [stroke-dasharray:none] [stroke-linecap:round] [stroke-linejoin:round] [stroke-opacity:0.988235]'
                                    cx='105.35332'
                                    cy='137.59389'
                                    rx='0.32146212'
                                    ry='0.40558979'
                                    transform='matrix(0.98048242,-0.19660678,0.20800608,0.97812753,0,0)'
                                />
                                {/* Dog tail — short, upturned */}
                                <path
                                    className='visible inline fill-[#C9A66B] stroke-none stroke-[0.529167] [fill-opacity:1] [stroke-dasharray:none] [stroke-linecap:round] [stroke-linejoin:round] [stroke-opacity:0.988235]'
                                    d='m 161.8,117.5 c 2.8,1.2 5.2,5.5 4.8,10.5 -0.3,3.5 -2.8,4.2 -4.8,1.8 -1.5,-2 -1.2,-7.5 0,-12.3 z'
                                    id='tail'
                                />
                                <path
                                    className='inline fill-[#C9A66B] stroke-none stroke-[0.264583] [stroke-dasharray:none] [stroke-linecap:round] [stroke-linejoin:round] [stroke-opacity:0.988235]'
                                    d='m 159.74981,121.34445 c 0,0 -2.98896,3.47517 -2.94624,4.78555 0.0427,1.31039 0.89775,2.01247 1.61702,2.1932 0.71928,0.18075 1.50745,-0.51603 1.84897,-1.30735 0.34149,-0.79135 0.88811,-2.59584 1.51032,-3.76081 0.62219,-1.16497 2.10268,-3.44845 2.10268,-3.44845 l -0.27441,-3.66785 z'
                                    id='leg-back-right'
                                />
                                <g id='lefteyelid' className='inline group-hover:invisible'>
                                    <ellipse
                                        className='fill-[#8B6F47] stroke-none stroke-[0.529167] [fill-opacity:1] [stroke-dasharray:none] [stroke-linecap:round] [stroke-linejoin:round] [stroke-opacity:0.988235]'
                                        cx='131.94429'
                                        cy='114.29948'
                                        rx='3.1571214'
                                        ry='3.2155864'
                                    />
                                    <path
                                        className='stroke-white stroke-[0.529167] [fill-opacity:1] [stroke-dasharray:none] [stroke-linecap:round] [stroke-linejoin:round] [stroke-opacity:0.988235]'
                                        d='m 129.32504,114.80228 c 2.54908,-1.14592 4.60706,-0.65481 4.60706,-0.65481'
                                    />
                                </g>
                                <g id='righteyelid' className='inline'>
                                    <ellipse
                                        className='fill-[#8B6F47] stroke-none stroke-[0.529167] [fill-opacity:1] [stroke-dasharray:none] [stroke-linecap:round] [stroke-linejoin:round] [stroke-opacity:0.988235]'
                                        cx='139.07704'
                                        cy='113.0834'
                                        rx='3.1571214'
                                        ry='3.2155864'
                                    />
                                    <path
                                        className='fill-[#C9A66B] stroke-[#FFFBF5] stroke-[0.529167] [fill-opacity:1] [stroke-dasharray:none] [stroke-linecap:round] [stroke-linejoin:round] [stroke-opacity:0.988235]'
                                        d='m 136.48089,113.70683 c 2.48528,-1.2784 4.56624,-0.89621 4.56624,-0.89621'
                                    />
                                </g>
                                <g id='eyesdown'>
                                    <ellipse
                                        className='fill-[#FFFBF5] stroke-none stroke-[0.529167] [fill-opacity:1] [stroke-dasharray:none] [stroke-linecap:round] [stroke-linejoin:round] [stroke-opacity:0.988235]'
                                        cx='139.12122'
                                        cy='113.61373'
                                        rx='1.8686198'
                                        ry='2.0422525'
                                    />
                                    <ellipse
                                        className='fill-black stroke-none stroke-[0.597086] [stroke-dasharray:none] [stroke-linecap:round] [stroke-linejoin:round] [stroke-opacity:0.988235]'
                                        cx='112.24622'
                                        cy='139.77037'
                                        rx='1.0380507'
                                        ry='1.3097118'
                                        transform='matrix(0.98048242,-0.19660678,0.20800608,0.97812753,0,0)'
                                    />
                                    <ellipse
                                        className='fill-[#f9f9f9] stroke-none stroke-[0.184905] [fill-opacity:1] [stroke-dasharray:none] [stroke-linecap:round] [stroke-linejoin:round] [stroke-opacity:0.988235]'
                                        cx='112.37342'
                                        cy='139.28929'
                                        rx='0.32146212'
                                        ry='0.40558979'
                                        transform='matrix(0.98048242,-0.19660678,0.20800608,0.97812753,0,0)'
                                    />
                                    <ellipse
                                        className='fill-[#FFFBF5] stroke-none stroke-[0.529167] [fill-opacity:1] [stroke-dasharray:none] [stroke-linecap:round] [stroke-linejoin:round] [stroke-opacity:0.988235]'
                                        cx='131.994'
                                        cy='114.92011'
                                        rx='1.8686198'
                                        ry='2.0422525'
                                    />
                                    <ellipse
                                        className='fill-black stroke-none stroke-[0.597086] [stroke-dasharray:none] [stroke-linecap:round] [stroke-linejoin:round] [stroke-opacity:0.988235]'
                                        cx='105.00267'
                                        cy='139.64998'
                                        rx='1.0380507'
                                        ry='1.3097118'
                                        transform='matrix(0.98048242,-0.19660678,0.20800608,0.97812753,0,0)'
                                    />
                                    <ellipse
                                        className='fill-[#f9f9f9] stroke-none stroke-[0.184905] [fill-opacity:1] [stroke-dasharray:none] [stroke-linecap:round] [stroke-linejoin:round] [stroke-opacity:0.988235]'
                                        cx='105.12987'
                                        cy='139.1689'
                                        rx='0.32146212'
                                        ry='0.40558979'
                                        transform='matrix(0.98048242,-0.19660678,0.20800608,0.97812753,0,0)'
                                    />
                                </g>
                                {/* Nose */}
                                <ellipse
                                    className='inline fill-[#1a1a1a] stroke-none'
                                    cx='137.02'
                                    cy='118.3'
                                    rx='1.35'
                                    ry='1.05'
                                    id='nose'
                                />
                                {/* Tongue — shows on hover */}
                                <path
                                    id='tongue'
                                    className='inline fill-red-500 opacity-0 transition-opacity group-hover:opacity-100'
                                    d='m 135.2,120.2 c 0.5,2.2 2.2,3.8 4.2,3.6 2,-0.2 3.5,-2 3.8,-4.2 -1.2,0.6 -2.5,0.9 -4,0.9 -1.5,0 -2.8,-0.3 -4,-0.9 z'
                                />
                            </g>
                        </svg>
                    </div>
                </div>

                <div className='dog-tooltip tracking-two bg-card invisible absolute -top-8 right-40 z-10 flex w-72 max-w-max flex-col gap-1 rounded-lg rounded-br-none border px-3 py-1.5 text-left font-mono text-xs font-medium opacity-0 transition-all delay-[4s] ease-out select-none group-hover:visible group-hover:opacity-100 group-hover:select-auto max-md:hidden'>
                    <span>Woof!</span>
                    <span>Like this component?</span>
                    <button className='mt-1 max-h-max max-w-max cursor-pointer text-xs underline'>
                        <a
                            target='_blank'
                            rel='noopener'
                            href='https://github.com/Shatlyk1011/emerald-ui'
                        >
                            Give it a star ⭐
                        </a>
                    </button>
                    <span className='absolute top-[-1.5] left-4 z-[-2] text-3xl opacity-5 dark:opacity-20'>
                        🐾
                    </span>
                    <span className='absolute top-[-1.5] right-16 z-[-2] text-3xl opacity-5 dark:opacity-20'>
                        🐾
                    </span>
                    <span className='absolute top-1 right-4 z-[-2] text-3xl opacity-5 dark:opacity-20'>
                        🐾
                    </span>
                    <span className='absolute bottom-0 left-4 z-[-2] text-3xl opacity-5 dark:opacity-20'>
                        🐾
                    </span>
                    <span className='absolute right-7 bottom-2 z-[-2] text-3xl opacity-5 dark:opacity-20'>
                        🐾
                    </span>
                </div>

                <div className='content'>{children}</div>
            </div>
        </div>
    )
}
```
