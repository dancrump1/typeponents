# System Banner

- Categories: Utilities
- Import: `@/components/ui/system-banner`
- Inspiration: ui.8starlabs.com (adaptation) — https://ui.8starlabs.com/docs/components/system-banner

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/system-banner.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `text` | `string` | `"Development Mode"` | — |
| `color` | `string` | `"bg-orange-500"` | — |
| `size` | `"xs" | "sm" | "md" | "lg"` | `"xs"` | — |
| `show` | `boolean` | `true` | — |

## Usage

```tsx
import { SystemBanner } from "./component";

export default function Usage() {
    return (
        <div className="h-screen w-full flex items-center justify-center relative overflow-hidden bg-background">
            <SystemBanner text="Development Mode" color="bg-orange-500" size="xs" show={true} color="#f97316" size="md" />
        </div>
    );
}
```

## Source

### `components/ui/system-banner.tsx`

```tsx
// Credit:
// https://ui.8starlabs.com/docs/components/system-banner

interface SystemBannerProps {
    text?: string;
    color?: string;
    size?: "xs" | "sm" | "md" | "lg";
    show?: boolean;
}

const sizeClasses: Record<NonNullable<SystemBannerProps["size"]>, string> = {
    xs: "text-[10px] px-1 py-0.5",
    sm: "text-xs px-2 py-0.5",
    md: "text-sm px-3 py-1",
    lg: "text-base px-4 py-1.5"
};

export function SystemBanner({
    text = "Development Mode",
    color = "bg-orange-500",
    size = "xs",
    show = true
}: SystemBannerProps) {
    if (!show) return null;
    return (
        <div
            className={`
        fixed top-0 left-0 w-full h-0.5 z-50 flex justify-center
        ${typeof color === "string" && color.startsWith("#") ? "" : color}
      `}
            style={
                typeof color === "string" && color.startsWith("#")
                    ? { backgroundColor: color }
                    : undefined
            }
        >
            <span
                className={`
          absolute -bottom-4 text-white font-bold rounded shadow-md
          ${sizeClasses[size]}
          ${typeof color === "string" && color.startsWith("#") ? "" : color}
        `}
                style={
                    typeof color === "string" && color.startsWith("#")
                        ? { backgroundColor: color }
                        : undefined
                }
            >
                {text}
            </span>
        </div>
    );
}
```

## Attribution

Source: ui.8starlabs.com · Original: https://ui.8starlabs.com/docs/components/system-banner

Adapted from the original. Credit the original author when you ship this.
