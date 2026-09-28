# Status Indicator

A coloured status dot with an optional label, in green, red, yellow or grey for active, down, fixing and idle.

**Interaction.** Runs on its own — every state except idle sends a matching halo pulsing outward from the dot in a slow repeating loop, and nothing responds to the pointer.

- Categories: Special Effects & FX
- Import: `@/components/ui/status-indicator`
- Inspiration: ui.8starlabs.com (adaptation) — https://ui.8starlabs.com/docs/components/status-indicator

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/status-indicator.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `state` | `"active" | "down" | "fixing" | "idle"` | `"idle"` | — |
| `color` | `string` | — | — |
| `label` | `string` | — | — |
| `className` | `string` | — | — |
| `size` | `"sm" | "md" | "lg"` | `"md"` | — |
| `labelClassName` | `string` | — | — |

## Usage

```tsx
import StatusIndicator from "./component";

export default function Usage() {
    return (
        <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
            <StatusIndicator state="active" label="All systems operational" />
            <StatusIndicator state="down" label="Systems down" />
            <StatusIndicator state="idle" label="Systems idle" />
            <StatusIndicator state="fixing" label="Diagnosing issue, fixing" />		</div>
    );
}
```

## Source

### `components/ui/status-indicator.tsx`

```tsx
import React from "react";
import { cn } from "@/lib/utils";

// Credit:
// https://ui.8starlabs.com/docs/components/status-indicator

interface StatusIndicatorProps {
    state: "active" | "down" | "fixing" | "idle";
    color?: string;
    label?: string;
    className?: string;
    size?: "sm" | "md" | "lg";
    labelClassName?: string;
}

const getStateColors = (state: StatusIndicatorProps["state"]) => {
    switch (state) {
        case "active":
            return { dot: "bg-green-500", ping: "bg-green-300" };
        case "down":
            return { dot: "bg-red-500", ping: "bg-red-300" };
        case "fixing":
            return { dot: "bg-yellow-500", ping: "bg-yellow-300" };
        case "idle":
        default:
            return { dot: "bg-slate-700", ping: "bg-slate-400" };
    }
};

const getSizeClasses = (size: StatusIndicatorProps["size"]) => {
    switch (size) {
        case "sm":
            return { dot: "h-2 w-2", ping: "h-2 w-2" };
        case "lg":
            return { dot: "h-4 w-4", ping: "h-4 w-4" };
        case "md":
        default:
            return { dot: "h-3 w-3", ping: "h-3 w-3" };
    }
};

const StatusIndicator: React.FC<StatusIndicatorProps> = ({
    state = "idle",
    color,
    label,
    className,
    size = "md",
    labelClassName
}) => {
    const shouldAnimate =
        state === "active" || state === "fixing" || state === "down";
    const colors = getStateColors(state);
    const sizeClasses = getSizeClasses(size);

    return (
        <div className={cn("flex items-center gap-2", className)}>
            <div className="relative flex items-center">
                {shouldAnimate && (
                    <span
                        className={cn(
                            "absolute inline-flex rounded-full opacity-75 animate-ping",
                            sizeClasses.ping,
                            colors.ping
                        )}
                    />
                )}
                <span
                    className={cn(
                        "relative inline-flex rounded-full",
                        sizeClasses.dot,
                        colors.dot
                    )}
                />
            </div>
            {label && (
                <p
                    className={cn(
                        "text-sm text-slate-700 dark:text-slate-300",
                        labelClassName
                    )}
                >
                    {label}
                </p>
            )}
        </div>
    );
};

export default StatusIndicator;
```

## Attribution

Source: ui.8starlabs.com · Original: https://ui.8starlabs.com/docs/components/status-indicator

Adapted from the original. Credit the original author when you ship this.
