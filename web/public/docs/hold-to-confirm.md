# Hold To Confirm

- Categories: Buttons
- Import: `@/components/ui/hold-to-confirm`
- Inspiration: ScrollX UI (adaptation) — https://scrollxui.dev/docs/components/hold-toconfirm

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/hold-to-confirm.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `motion`

## Registry dependencies

- `button`

## Usage

```tsx
'use client';

import { HoldToConfirm } from './component';
import { motion } from 'motion/react';

export default function HoldToConfirmDemo() {
    return (
        <div className='flex  items-center justify-center '>
            <div className='w-full max-w-md rounded-2xl border bg-card p-6 shadow-lg text-center space-y-4'>
                <h2 className='text-xl font-semibold text-foreground'>
                    Confirm Payment
                </h2>
                <p className='text-sm text-muted-foreground'>
                    You are about to{' '}
                    <span className='font-medium'>buy the Pro subscription</span>
                    for <span className='font-medium'>$49.99</span>. Hold the button below
                    to confirm. This purchase will be processed securely.
                </p>

                <HoldToConfirm
                    variant='outline'
                    size='lg'
                    animation='fill'
                    fillClassName='bg-green-600 dark:bg-green-500 text-white dark:text-black'
                    confirmedClassName='text-white dark:text-black font-semibold'
                    showProgressOnConfirm={true}
                    confirmedChildren={
                        <>
                            <motion.svg
                                xmlns='http://www.w3.org/2000/svg'
                                viewBox='0 0 24 24'
                                fill='none'
                                strokeWidth={2}
                                stroke='currentColor'
                                className='w-5 h-5 text-white dark:text-black'
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{
                                    delay: 0.6,
                                    type: 'spring',
                                    stiffness: 300,
                                    damping: 10,
                                }}
                            >
                                <motion.path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    d='M5 13l4 4L19 7'
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{
                                        duration: 0.6,
                                        ease: 'easeInOut',
                                    }}
                                />
                            </motion.svg>
                            <span className='ml-2'>Payment Successful!</span>
                        </>
                    }
                    resetAfter={3000}
                >
                    Hold to Pay $49.99
                </HoldToConfirm>
            </div>
        </div>
    );
}
```

## Source

### `components/ui/hold-to-confirm.tsx`

```tsx
'use client';

import * as React from 'react';
import {
    motion,
    AnimatePresence,
    useMotionValue,
    animate,
    useTransform,
} from 'motion/react';
import { cn } from '@/lib/utils';
import { buttonVariants, type ButtonProps } from '@/components/ui/button';

// Credit:
// https://scrollxui.dev/docs/components/hold-toconfirm

interface HoldToConfirmProps extends Omit<ButtonProps, 'asChild'> {
    asChild?: boolean;
    duration?: number;
    onConfirm?: () => void;
    animation?: 'border' | 'fill';
    fillClassName?: string;
    confirmedChildren?: React.ReactNode;
    confirmedClassName?: string;
    resetAfter?: number;
    showProgressOnConfirm?: boolean;
}

const HoldToConfirm = React.forwardRef<HTMLButtonElement, HoldToConfirmProps>(
    (
        {
            duration = 2000,
            onConfirm,
            animation = 'fill',
            variant,
            size,
            className,
            fillClassName,
            confirmedChildren,
            confirmedClassName,
            resetAfter = 2000,
            showProgressOnConfirm = false,
            asChild = false,
            children = 'Hold to confirm',
            ...props
        },
        ref,
    ) => {
        const [confirmed, setConfirmed] = React.useState(false);
        const textRef = React.useRef<HTMLSpanElement>(null);

        const progress = useMotionValue(0);
        const controlsRef = React.useRef<ReturnType<typeof animate> | null>(null);
        const holdTimerRef = React.useRef<NodeJS.Timeout | null>(null);
        const resetTimerRef = React.useRef<NodeJS.Timeout | null>(null);

        const resetHold = (smooth: boolean) => {
            controlsRef.current?.stop();
            if (smooth) {
                controlsRef.current = animate(progress, 0, {
                    duration: 0.3,
                    ease: 'easeOut',
                });
            } else {
                progress.set(0);
            }
        };

        const startHold = () => {
            if (confirmed) return;

            controlsRef.current = animate(progress, 1, {
                duration: duration / 1000,
                ease: 'linear',
            });

            holdTimerRef.current = setTimeout(() => {
                setConfirmed(true);
                onConfirm?.();

                if (!showProgressOnConfirm) {
                    resetHold(false);
                } else {
                    controlsRef.current?.stop();
                    progress.set(1);
                }

                if (resetAfter > 0) {
                    resetTimerRef.current = setTimeout(() => {
                        setConfirmed(false);
                        resetHold(true);
                    }, resetAfter);
                }
            }, duration);
        };

        const cancelHold = () => {
            if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
            if (!confirmed) resetHold(true);
        };

        const width = useTransform(progress, [0, 1], ['0%', '100%']);
        const borderClip = useTransform(
            progress,
            [0, 1],
            ['inset(0 100% 0 0 round 0.375rem)', 'inset(0 0% 0 0 round 0.375rem)'],
        );

        const textProgress = useTransform(progress, (value) => {
            if (!textRef.current) return 0;

            const buttonRect = textRef.current
                .closest('button')
                ?.getBoundingClientRect();
            const textRect = textRef.current.getBoundingClientRect();

            if (!buttonRect || !textRect) return 0;

            const textStartPercent =
                (textRect.left - buttonRect.left) / buttonRect.width;
            const fillPosition = value;

            if (fillPosition <= textStartPercent) return 0;

            const textWidth = textRect.width / buttonRect.width;
            const adjustedProgress = (fillPosition - textStartPercent) / textWidth;

            return Math.min(Math.max(adjustedProgress, 0), 1);
        });

        const textWidth = useTransform(textProgress, [0, 1], ['0%', '100%']);

        React.useEffect(() => {
            return () => {
                controlsRef.current?.stop();
                if (holdTimerRef.current) clearTimeout(holdTimerRef.current);
                if (resetTimerRef.current) clearTimeout(resetTimerRef.current);
            };
        }, []);

        const Comp = asChild ? 'span' : 'button';

        return (
            <Comp
                ref={ref}
                {...props}
                onMouseDown={startHold}
                onMouseUp={cancelHold}
                onMouseLeave={cancelHold}
                onTouchStart={startHold}
                onTouchEnd={cancelHold}
                className={cn(
                    'relative overflow-hidden',
                    buttonVariants({ variant, size }),
                    className,
                )}
            >
                {animation === 'fill' && (!confirmed || showProgressOnConfirm) && (
                    <motion.div
                        className={cn('absolute left-0 top-0 h-full', fillClassName)}
                        style={{ width }}
                    />
                )}

                {animation === 'border' && (!confirmed || showProgressOnConfirm) && (
                    <motion.div
                        className={cn(
                            'absolute inset-0 border-2 rounded-md pointer-events-none',
                            fillClassName,
                        )}
                        style={{ clipPath: borderClip }}
                    />
                )}

                <span className='relative z-10 flex items-center justify-center w-full'>
                    <AnimatePresence mode='wait'>
                        {confirmed && confirmedChildren ? (
                            <motion.span
                                key='confirmed'
                                initial={{ opacity: 0, scale: 0.9, y: 8 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: -8 }}
                                transition={{ duration: 0.3 }}
                                className={cn('flex items-center gap-2', confirmedClassName)}
                            >
                                {confirmedChildren}
                            </motion.span>
                        ) : (
                            <motion.span
                                key='default'
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.25 }}
                                className='relative flex items-center gap-2'
                            >
                                <span ref={textRef} className='relative'>
                                    {children}
                                    {animation === 'fill' && (
                                        <motion.span
                                            className={cn(
                                                'absolute inset-0 overflow-hidden',
                                                fillClassName?.includes('text-')
                                                    ? fillClassName
                                                    : 'text-white dark:text-black',
                                            )}
                                            style={{ width: textWidth }}
                                        >
                                            {children}
                                        </motion.span>
                                    )}
                                </span>
                            </motion.span>
                        )}
                    </AnimatePresence>
                </span>
            </Comp>
        );
    },
);

HoldToConfirm.displayName = 'HoldToConfirm';

export { HoldToConfirm };
```

## Attribution

Source: ScrollX UI · Original: https://scrollxui.dev/docs/components/hold-toconfirm

Adapted from the original. Credit the original author when you ship this.
