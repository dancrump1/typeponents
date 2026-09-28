# Curtain Reveal Card

- Categories: Cards
- Tags: hover
- Import: `@/components/ui/curtain-reveal-card`
- Inspiration: systaliko-ui.vercel.app (adaptation) — https://systaliko-ui.vercel.app/docs/cards/card-curtain-reveal

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/curtain-reveal-card.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `clsx`
- `lucide-react`

## Registry dependencies

- `button`

## Usage

```tsx
import { Button } from '@/components/ui/button';
import {
    CardCurtain,
    CardCurtainReveal,
    CardCurtainRevealBody,
    CardCurtainRevealDescription,
    CardCurtainRevealFooter,
    CardCurtainRevealTitle,
} from './component';
import { ArrowUpRight } from 'lucide-react';

export default function Usage() {
    return (
        <CardCurtainReveal className="h-[560px] w-96 border bg-foreground  text-background shadow">
            <CardCurtainRevealBody>
                <CardCurtainRevealTitle className="text-3xl font-medium tracking-tight">
                    Behind <br />
                    the Curtain
                </CardCurtainRevealTitle>
                <CardCurtainRevealDescription className="my-4 ">
                    <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
                        voluptate, eum quia temporibus fugiat rerum nobis modi dolor,
                        delectus laboriosam, quae adipisci reprehenderit officiis quidem
                        iure ducimus incidunt officia. Magni, eligendi repellendus. Fugiat,
                        natus aut?
                    </p>
                </CardCurtainRevealDescription>
                <Button
                    variant={'secondary'}
                    size={'icon'}
                    className="aspect-square rounded-full"
                >
                    <ArrowUpRight />
                </Button>

                <CardCurtain className="bg-background" />
            </CardCurtainRevealBody>

            <CardCurtainRevealFooter className="mt-auto">
                <img
                    alt="street"
                    className="size-full"
                    src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=2388&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                />
            </CardCurtainRevealFooter>
        </CardCurtainReveal>
    );
};
```

## Source

### `components/ui/curtain-reveal-card.tsx`

```tsx
'use client';

import * as React from 'react';

import { cn } from '@/lib/utils';
import { ClassValue } from 'clsx';

// Credit:
// https://systaliko-ui.vercel.app/docs/cards/card-curtain-reveal

const clipPathVariants: ClassValue =
    'delay-[0.1] duration-400 ease-out transition-[clip-path] [clip-path:polygon(50%_0,50%_0,50%_100%,50%_100%)] group-hover:[clip-path:polygon(0_0,100%_0,100%_100%,0_100%)]';

export function CardCurtainReveal({
    children,
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            className={cn(
                'group relative flex flex-col gap-2 overflow-hidden  ',
                className,
            )}
            {...props}
        >
            {children}
        </div>
    );
}

export function CardCurtainRevealFooter({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return <div className={cn(clipPathVariants, className)} {...props} />;
}

export function CardCurtainRevealBody({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return <div className={cn('flex-1 p-6', className)} {...props} />;
}

export function CardCurtainRevealTitle({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <h2
            className={cn(
                'group-hover:translate-y-0 translate-y-[170px] duration-300 ease-out transition-transform',
                className,
            )}
            {...props}
        />
    );
}

export function CardCurtain({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return (
        <div
            className={cn(
                'pointer-events-none absolute inset-0 size-full mix-blend-difference',
                clipPathVariants,
                className,
            )}
            {...props}
        />
    );
}

export function CardCurtainRevealDescription({
    className,
    ...props
}: React.ComponentProps<'div'>) {
    return <div className={cn(clipPathVariants, className)} {...props} />;
}
```

## Attribution

Source: systaliko-ui.vercel.app · Original: https://systaliko-ui.vercel.app/docs/cards/card-curtain-reveal

Adapted from the original. Credit the original author when you ship this.
