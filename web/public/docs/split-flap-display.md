# Split Flap Display

- Categories: Grids & Layouts
- Tags: canvas, autoplay, responsive
- Import: `@/components/ui/split-flap-display`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/split-flap-display.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `fit` | `SplitFlapDisplayFit` | `"contain"` | — |
| `className` | `string` | — | — |
| `style` | `CSSProperties` | — | — |
| `config` | `{ cols?: number; rows?: number; cellAspectRatio?: number;…` | — | — |
| `content` | `SplitFlapDisplayContent` | — | — |
| `ariaLabel` | `string` | `"Split flap display"` | — |

## Usage

```tsx
import SplitFlapDisplay, { SplitFlapDisplayProps } from "./component";
import { CSSProperties } from "react";

type SplitFlapDisplayWrapperProps = SplitFlapDisplayProps & {
    wrapperClassName?: string;
    wrapperStyle?: CSSProperties;
    minHeight?: CSSProperties["minHeight"];
};

function SplitFlapDisplayWrapper({
    wrapperClassName,
    wrapperStyle,
    minHeight = "100vh",
    fit = "contain",
    ...splitFlapDisplayProps
}: SplitFlapDisplayWrapperProps) {
    return (
        <div
            className={wrapperClassName}
            style={{
                boxSizing: "border-box",
                display: "flex",
                minHeight,
                minWidth: 0,
                width: "100%",
                ...wrapperStyle,
            }}
        >
            <SplitFlapDisplay fit={fit} {...splitFlapDisplayProps} />
        </div>
    );
}

export default function SplitFlapDisplayUsage() {
    return (
        <div>
            <SplitFlapDisplayWrapper
                fit="contain"
                minHeight="100vh"
                wrapperStyle={{
                    display: "flex",
                    minHeight: "100vh",
                }}
                content={["Hello", "World"]}
            />
        </div>
    );
}
```

## Source

### `components/ui/split-flap-display.tsx`

```tsx
import {
    createContext,
    startTransition,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef,
    useState,
    type CSSProperties,
    type ReactNode,
} from "react";

export const SPLIT_FLAP_DISPLAY_COLS = 15;
export const SPLIT_FLAP_DISPLAY_ROWS = 5;
export const SPLIT_FLAP_DISPLAY_CELL_ASPECT_RATIO = 9 / 14;
export const SPLIT_FLAP_DISPLAY_ASPECT_RATIO =
    (SPLIT_FLAP_DISPLAY_COLS / SPLIT_FLAP_DISPLAY_ROWS) * SPLIT_FLAP_DISPLAY_CELL_ASPECT_RATIO;
export const SPLIT_FLAP_DISPLAY_GUTTER_REF_MODULE_COUNT = 15 * 5;

const MAX_CANVAS_DPR = 2;
const FLAP_CHARACTER_STEP_DURATION_MS = 100;
const FLAP_PATH_EASE_OUT_POWER = 2;
const FLAP_SIDE_INSET_FRAC = 0.04;
const FLAP_SIDE_INSET_T0 = 0.2;
const FLAP_SIDE_INSET_T1 = 0.8;

export const SPLIT_FLAP_DISPLAY_CHAR_POOL =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" +
    " !\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~\u20ac\u00a3\u00a5";

export type SplitFlapDisplayColorCell = {
    kind: "color";
    name: string;
    color: string;
};

export type SplitFlapDisplayCell = string | SplitFlapDisplayColorCell;

export const SPLIT_FLAP_DISPLAY_COLOR_FLAP_POOL: readonly SplitFlapDisplayColorCell[] = [
    { kind: "color", name: "red", color: "#ff3b42" },
    { kind: "color", name: "orange", color: "#F54900" },
    { kind: "color", name: "yellow", color: "#F5F300" },
    { kind: "color", name: "green", color: "#32d74b" },
    { kind: "color", name: "blue", color: "#32ade6" },
    { kind: "color", name: "purple", color: "#7300F5" },
    { kind: "color", name: "teal", color: "#00F5D4" },
    { kind: "color", name: "white", color: "#f5f5f0" },
];

function interleaveCharPoolWithColorFlaps(
    charPool: string,
    colors: readonly SplitFlapDisplayColorCell[]
): SplitFlapDisplayCell[] {
    const letters = Array.from(charPool);
    const n = letters.length;
    const m = colors.length;
    if (m === 0) {
        return letters;
    }

    const groupCount = m + 1;
    const base = Math.floor(n / groupCount);
    const remainder = n % groupCount;
    const out: SplitFlapDisplayCell[] = [];
    let i = 0;

    for (let group = 0; group < groupCount; group++) {
        const runLength = base + (group < remainder ? 1 : 0);
        for (let s = 0; s < runLength; s++) {
            out.push(letters[i++] ?? "");
        }
        if (group < m) {
            out.push(colors[group]!);
        }
    }

    return out;
}

export const SPLIT_FLAP_DISPLAY_CELL_POOL: readonly SplitFlapDisplayCell[] =
    interleaveCharPoolWithColorFlaps(
        SPLIT_FLAP_DISPLAY_CHAR_POOL,
        SPLIT_FLAP_DISPLAY_COLOR_FLAP_POOL
    );

export function isSplitFlapDisplayColorCell(
    cell: SplitFlapDisplayCell
): cell is SplitFlapDisplayColorCell {
    return typeof cell !== "string" && cell.kind === "color";
}

export function splitFlapDisplayCellKey(cell: SplitFlapDisplayCell): string {
    if (typeof cell === "string") {
        return `text:${cell}`;
    }
    return `color:${cell.color.toLowerCase()}`;
}

export function splitFlapDisplayCellsEqual(
    a: SplitFlapDisplayCell,
    b: SplitFlapDisplayCell
): boolean {
    return splitFlapDisplayCellKey(a) === splitFlapDisplayCellKey(b);
}

export function getSplitFlapDisplayCellText(cell: SplitFlapDisplayCell): string {
    return typeof cell === "string" ? cell : "";
}

export function getSplitFlapDisplayCellColor(cell: SplitFlapDisplayCell): string | null {
    return isSplitFlapDisplayColorCell(cell) ? cell.color : null;
}

function cellPoolIndex(cell: SplitFlapDisplayCell): number {
    const key = splitFlapDisplayCellKey(cell);
    return SPLIT_FLAP_DISPLAY_CELL_POOL.findIndex((option) => {
        return splitFlapDisplayCellKey(option) === key;
    });
}

export function cellPathThroughPool(
    base: SplitFlapDisplayCell,
    target: SplitFlapDisplayCell
): SplitFlapDisplayCell[] {
    if (splitFlapDisplayCellsEqual(base, target)) {
        return [base];
    }
    if (base === "") {
        const targetIndex = cellPoolIndex(target);
        if (targetIndex === -1) {
            return [base, target];
        }
        return ["", ...SPLIT_FLAP_DISPLAY_CELL_POOL.slice(0, targetIndex + 1)];
    }
    if (target === "") {
        const baseIndex = cellPoolIndex(base);
        if (baseIndex === -1) {
            return [base, target];
        }
        return [...SPLIT_FLAP_DISPLAY_CELL_POOL.slice(0, baseIndex + 1).reverse(), ""];
    }

    const baseIndex = cellPoolIndex(base);
    const targetIndex = cellPoolIndex(target);
    if (baseIndex === -1 || targetIndex === -1) {
        return [base, target];
    }
    if (baseIndex < targetIndex) {
        return SPLIT_FLAP_DISPLAY_CELL_POOL.slice(baseIndex, targetIndex + 1);
    }
    if (baseIndex > targetIndex) {
        return SPLIT_FLAP_DISPLAY_CELL_POOL.slice(targetIndex, baseIndex + 1).reverse();
    }
    return [base];
}

export function charPathThroughPool(base: string, target: string): string[] {
    return cellPathThroughPool(base, target).filter(
        (cell): cell is string => typeof cell === "string"
    );
}

const SPLIT_FLAP_DISPLAY_PLACEHOLDER_LINES = [
    "",
    "BEEP",
    "BOOP",
    "* WHIRRR *",
    "",
] as const;

export function splitFlapDisplayGridGutterScale(
    cols: number,
    rows: number,
    refModuleCount: number = SPLIT_FLAP_DISPLAY_GUTTER_REF_MODULE_COUNT
): number {
    const n = cols * rows;
    if (n <= 0) {
        return 1;
    }
    return Math.min(1, Math.sqrt(refModuleCount / n));
}

export type SplitFlapDisplayCellGrid = SplitFlapDisplayCell[][];

export type SplitFlapDisplayContent =
    | string
    | readonly string[]
    | readonly (readonly SplitFlapDisplayCell[])[];

export function isSplitFlapDisplayBlankSlot(cell: SplitFlapDisplayCell): boolean {
    return typeof cell === "string" && (cell === "" || cell === " ");
}

export function createEmptySplitFlapDisplayCells(
    cols: number,
    rows: number
): SplitFlapDisplayCellGrid {
    return Array.from({ length: rows }, () =>
        Array.from({ length: cols }, () => "")
    );
}

function centeredSplitFlapDisplayTextRow(text: string, cols: number) {
    const clipped = text.slice(0, cols);
    const offset = Math.max(0, Math.floor((cols - clipped.length) / 2));
    return Array.from({ length: cols }, (_, col) => clipped[col - offset] ?? "");
}

export function createPlaceholderSplitFlapDisplayCells(
    cols: number,
    rows: number
): SplitFlapDisplayCellGrid {
    const cells = createEmptySplitFlapDisplayCells(cols, rows);
    const rowOffset = Math.max(
        0,
        Math.floor((rows - SPLIT_FLAP_DISPLAY_PLACEHOLDER_LINES.length) / 2)
    );

    for (let i = 0; i < SPLIT_FLAP_DISPLAY_PLACEHOLDER_LINES.length; i++) {
        const row = rowOffset + i;
        if (row >= rows) {
            break;
        }
        cells[row] = centeredSplitFlapDisplayTextRow(
            SPLIT_FLAP_DISPLAY_PLACEHOLDER_LINES[i] ?? "",
            cols
        );
    }

    if (cols > 0 && rows > 0) {
        const lastCol = cols - 1;
        const lastRow = rows - 1;
        const cornerFlap = SPLIT_FLAP_DISPLAY_COLOR_FLAP_POOL.at(-1) ?? "";
        cells[0]![0] = cornerFlap;
        cells[0]![lastCol] = cornerFlap;
        cells[lastRow]![0] = cornerFlap;
        cells[lastRow]![lastCol] = cornerFlap;
    }

    return cells;
}

function isCellGridShape(
    content: readonly string[] | readonly (readonly SplitFlapDisplayCell[])[]
): content is readonly (readonly SplitFlapDisplayCell[])[] {
    return content.length > 0 && Array.isArray(content[0]);
}

export function resolveSplitFlapDisplayContent(
    content: SplitFlapDisplayContent,
    cols: number,
    rows: number
): SplitFlapDisplayCellGrid {
    if (typeof content === "string") {
        const grid = createEmptySplitFlapDisplayCells(cols, rows);
        if (cols === 0 || rows === 0) {
            return grid;
        }
        const middleRow = Math.floor((rows - 1) / 2);
        grid[middleRow] = centeredSplitFlapDisplayTextRow(content, cols);
        return grid;
    }

    if (isCellGridShape(content)) {
        const grid = createEmptySplitFlapDisplayCells(cols, rows);
        for (let row = 0; row < Math.min(rows, content.length); row++) {
            const sourceRow = content[row] ?? [];
            for (let col = 0; col < Math.min(cols, sourceRow.length); col++) {
                grid[row]![col] = sourceRow[col]!;
            }
        }
        return grid;
    }

    const lines = content as readonly string[];
    const grid = createEmptySplitFlapDisplayCells(cols, rows);
    const visible = lines.slice(0, rows);
    const verticalOffset = Math.max(0, Math.floor((rows - visible.length) / 2));

    for (let i = 0; i < visible.length; i++) {
        const row = verticalOffset + i;
        if (row >= rows) {
            break;
        }
        grid[row] = centeredSplitFlapDisplayTextRow(visible[i] ?? "", cols);
    }

    return grid;
}

export type SplitFlapDisplayStageConfig = {
    gradientFrom: string;
    gradientTo: string;
    gradientDirection: string;
    padding: string;
    borderRadius: string;
    shadow: string;
};

export type SplitFlapDisplayBezelConfig = {
    gradientTop: string;
    gradientMiddle: string;
    gradientBottom: string;
    paddingScale: number;
    borderRadiusCqw: number;
    shadow: string;
};

export type SplitFlapDisplayFaceConfig = {
    gradientTop: string;
    gradientBottom: string;
    borderColor: string;
    borderRadiusCqw: number;
    shadow: string;
};

export type SplitFlapDisplayModuleConfig = {
    backgroundDetailed: string;
    backgroundSimple: string;
    borderDetailed: string;
    borderSimple: string;
};

export type SplitFlapDisplayFlapConfig = {
    gradientTop: string;
    gradientUpperMid: string;
    gradientLowerMid: string;
    gradientBottom: string;
    simpleColor: string;
    glyphColor: string;
};

export type SplitFlapDisplayMechanismConfig = {
    hingeColor: string;
    wheelGradientEnds: string;
    wheelGradientMid: string;
    capColor: string;
};

export type SplitFlapDisplayConfig = {
    cols: number;
    rows: number;
    cellAspectRatio: number;
    gutterRefModuleCount: number;
    content: SplitFlapDisplayContent;
    boardBackground: string;
    canvasPaddingScale: number;
    canvasGapScale: number;
    stage: SplitFlapDisplayStageConfig;
    bezel: SplitFlapDisplayBezelConfig;
    face: SplitFlapDisplayFaceConfig;
    module: SplitFlapDisplayModuleConfig;
    flap: SplitFlapDisplayFlapConfig;
    mechanism: SplitFlapDisplayMechanismConfig;
};

export const DEFAULT_SPLIT_FLAP_DISPLAY_CONFIG: SplitFlapDisplayConfig = {
    cols: SPLIT_FLAP_DISPLAY_COLS,
    rows: SPLIT_FLAP_DISPLAY_ROWS,
    cellAspectRatio: SPLIT_FLAP_DISPLAY_CELL_ASPECT_RATIO,
    gutterRefModuleCount: SPLIT_FLAP_DISPLAY_GUTTER_REF_MODULE_COUNT,
    content: createPlaceholderSplitFlapDisplayCells(SPLIT_FLAP_DISPLAY_COLS, SPLIT_FLAP_DISPLAY_ROWS),
    boardBackground: "#171717",
    canvasPaddingScale: 2,
    canvasGapScale: 0.5,
    stage: {
        gradientFrom: "#4F39F6",
        gradientTo: "#3729AB",
        gradientDirection: "to bottom right",
        padding: "3rem",
        borderRadius: "0.5rem",
        shadow: "inset 0 0 10px 3px rgba(0, 0, 0, 0.2)",
    },
    bezel: {
        gradientTop: "#262626",
        gradientMiddle: "#171717",
        gradientBottom: "#0a0a0a",
        paddingScale: 0.95,
        borderRadiusCqw: 1.625,
        shadow:
            "0 5px 16px -3px rgba(0,0,0,0.8), 0 2px 6px -2px rgba(0,0,0,0.38)",
    },
    face: {
        gradientTop: "#262626",
        gradientBottom: "#171717",
        borderColor: "rgba(82, 82, 82, 0.35)",
        borderRadiusCqw: 1.25,
        shadow:
            "inset 0 1px 0 rgba(255,255,255,0.1), 0 2px 12px rgba(0,0,0,0.45)",
    },
    module: {
        backgroundDetailed: "#020202",
        backgroundSimple: "#050505",
        borderDetailed: "rgba(55, 55, 55, 0.85)",
        borderSimple: "rgba(38, 38, 38, 0.62)",
    },
    flap: {
        gradientTop: "#262626",
        gradientUpperMid: "#191919",
        gradientLowerMid: "#101010",
        gradientBottom: "#171717",
        simpleColor: "#111111",
        glyphColor: "#e8e8e8",
    },
    mechanism: {
        hingeColor: "rgba(39, 39, 42, 0.9)",
        wheelGradientEnds: "#171717",
        wheelGradientMid: "#525252",
        capColor: "rgba(58, 58, 60, 0.82)",
    },
};

type DeepPartial<T> = T extends readonly unknown[]
    ? T
    : T extends object
    ? { [K in keyof T]?: DeepPartial<T[K]> }
    : T;

export type PartialSplitFlapDisplayConfig = DeepPartial<SplitFlapDisplayConfig>;

export function resolveSplitFlapDisplayConfig(
    overrides?: PartialSplitFlapDisplayConfig
): SplitFlapDisplayConfig {
    if (!overrides) {
        return DEFAULT_SPLIT_FLAP_DISPLAY_CONFIG;
    }
    return {
        ...DEFAULT_SPLIT_FLAP_DISPLAY_CONFIG,
        ...overrides,
        stage: { ...DEFAULT_SPLIT_FLAP_DISPLAY_CONFIG.stage, ...overrides.stage },
        bezel: { ...DEFAULT_SPLIT_FLAP_DISPLAY_CONFIG.bezel, ...overrides.bezel },
        face: { ...DEFAULT_SPLIT_FLAP_DISPLAY_CONFIG.face, ...overrides.face },
        module: { ...DEFAULT_SPLIT_FLAP_DISPLAY_CONFIG.module, ...overrides.module },
        flap: { ...DEFAULT_SPLIT_FLAP_DISPLAY_CONFIG.flap, ...overrides.flap },
        mechanism: {
            ...DEFAULT_SPLIT_FLAP_DISPLAY_CONFIG.mechanism,
            ...overrides.mechanism,
        },
    };
}

type SplitFlapDisplayAnimation = {
    path: SplitFlapDisplayCell[];
    start: number;
    target: SplitFlapDisplayCell;
    duration: number;
};

type SplitFlapDisplayCanvasState = {
    animations: Map<number, SplitFlapDisplayAnimation>;
    cells: SplitFlapDisplayCellGrid;
    config: SplitFlapDisplayConfig;
    dpr: number;
    gutterScale: number;
    height: number;
    raf: number;
    width: number;
};

type CellMetrics = {
    cellHeight: number;
    cellWidth: number;
    detailed: boolean;
    gap: number;
    padding: number;
};

export type SplitFlapDisplayFit = "width" | "contain";

type SplitFlapDisplayContextValue = {
    config: SplitFlapDisplayConfig;
    gutterScale: number;
    boardAspect: number;
    cells: SplitFlapDisplayCellGrid;
    fit: SplitFlapDisplayFit;
    ariaLabel: string;
};

const SplitFlapDisplayContext = createContext<SplitFlapDisplayContextValue | null>(null);

export function useSplitFlapDisplay() {
    const value = useContext(SplitFlapDisplayContext);
    if (!value) {
        throw new Error(
            "useSplitFlapDisplay must be used within SplitFlapDisplay"
        );
    }
    return value;
}

function clamp(value: number, min: number, max: number) {
    return Math.max(min, Math.min(max, value));
}

function easeOutPathProgress(linearT: number, power: number) {
    const t = clamp(linearT, 0, 1);
    return 1 - (1 - t) ** power;
}

function getCell(cells: SplitFlapDisplayCellGrid, row: number, col: number) {
    return cells[row]?.[col] ?? "";
}

function getAnimationChar(animation: SplitFlapDisplayAnimation, now: number) {
    const linearProgress = clamp(
        (now - animation.start) / animation.duration,
        0,
        1
    );

    if (linearProgress >= 1) {
        return {
            done: true,
            flip: 1,
            from: animation.target,
            progress: linearProgress,
            to: animation.target,
        };
    }

    const steps = Math.max(1, animation.path.length - 1);
    const pathT = easeOutPathProgress(linearProgress, FLAP_PATH_EASE_OUT_POWER);
    const position = pathT * steps;
    const pathIndex = clamp(Math.floor(position), 0, animation.path.length - 2);

    return {
        done: false,
        flip: position - Math.floor(position),
        from: animation.path[pathIndex] ?? "",
        progress: linearProgress,
        to: animation.path[pathIndex + 1] ?? animation.target,
    };
}

function roundedRect(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number
) {
    const r = Math.min(radius, width / 2, height / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.lineTo(x + width - r, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + r);
    ctx.lineTo(x + width, y + height - r);
    ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
    ctx.lineTo(x + r, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - r);
    ctx.lineTo(x, y + r);
    ctx.quadraticCurveTo(x, y, x + r, y);
    ctx.closePath();
}

function flapFacePath(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    chamfer: number
) {
    const c = Math.min(chamfer, width / 2, height / 2);
    if (c <= 0) {
        ctx.rect(x, y, width, height);
        return;
    }

    const sideInset = Math.max(0, width * FLAP_SIDE_INSET_FRAC);
    const y0 = y + height * FLAP_SIDE_INSET_T0;
    const y1 = y + height * FLAP_SIDE_INSET_T1;
    const yTop = y + c;
    const yBottom = y + height - c;
    const y0c = Math.max(y0, yTop);
    const y1c = Math.min(y1, yBottom);
    const notched = sideInset > 0 && y0c < y1c - 0.5;

    ctx.beginPath();
    if (!notched) {
        ctx.moveTo(x + c, y);
        ctx.lineTo(x + width - c, y);
        ctx.lineTo(x + width, y + c);
        ctx.lineTo(x + width, y + height - c);
        ctx.lineTo(x + width - c, y + height);
        ctx.lineTo(x + c, y + height);
        ctx.lineTo(x, y + height - c);
        ctx.lineTo(x, y + c);
        ctx.closePath();
        return;
    }

    const xl = x + sideInset;
    const xr = x + width - sideInset;

    ctx.moveTo(x + c, y);
    ctx.lineTo(x + width - c, y);
    ctx.lineTo(x + width, y + c);
    if (y0c > y + c) {
        ctx.lineTo(x + width, y0c);
    }
    ctx.lineTo(xr, y0c);
    ctx.lineTo(xr, y1c);
    ctx.lineTo(x + width, y1c);
    if (y1c < yBottom) {
        ctx.lineTo(x + width, yBottom);
    }
    ctx.lineTo(x + width - c, y + height);
    ctx.lineTo(x + c, y + height);
    ctx.lineTo(x, y + height - c);
    if (y1c < yBottom) {
        ctx.lineTo(x, y1c);
    }
    ctx.lineTo(xl, y1c);
    ctx.lineTo(xl, y0c);
    ctx.lineTo(x, y0c);
    if (y0c > y + c) {
        ctx.lineTo(x, y + c);
    }
    ctx.closePath();
}

function drawModuleBackground(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    detailed: boolean,
    moduleConfig: SplitFlapDisplayModuleConfig
) {
    const radius = detailed ? Math.min(width, height) * 0.08 : 0;
    roundedRect(ctx, x, y, width, height, radius);

    if (detailed) {
        ctx.fillStyle = moduleConfig.backgroundDetailed;
        ctx.fill();
        ctx.save();
        roundedRect(ctx, x, y, width, height, radius);
        ctx.clip();

        const topGradient = ctx.createLinearGradient(x, y, x, y + height * 0.45);
        topGradient.addColorStop(0, "rgba(255,255,255,0.028)");
        topGradient.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = topGradient;
        ctx.fillRect(x, y, width, height);

        const leftGradient = ctx.createLinearGradient(
            x,
            y,
            x + width * 0.38,
            y
        );
        leftGradient.addColorStop(0, "rgba(255,255,255,0.014)");
        leftGradient.addColorStop(0.6, "rgba(0,0,0,0)");
        ctx.fillStyle = leftGradient;
        ctx.fillRect(x, y, width, height);

        const bottomGradient = ctx.createLinearGradient(
            x,
            y + height * 0.55,
            x,
            y + height
        );
        bottomGradient.addColorStop(0, "rgba(0,0,0,0)");
        bottomGradient.addColorStop(1, "rgba(0,0,0,0.42)");
        ctx.fillStyle = bottomGradient;
        ctx.fillRect(x, y, width, height);

        const rightGradient = ctx.createLinearGradient(
            x + width * 0.6,
            y,
            x + width,
            y
        );
        rightGradient.addColorStop(0, "rgba(0,0,0,0)");
        rightGradient.addColorStop(1, "rgba(0,0,0,0.32)");
        ctx.fillStyle = rightGradient;
        ctx.fillRect(x, y, width, height);
        ctx.restore();
    } else {
        ctx.fillStyle = moduleConfig.backgroundSimple;
        ctx.fill();
    }

    ctx.strokeStyle = detailed
        ? moduleConfig.borderDetailed
        : moduleConfig.borderSimple;
    ctx.lineWidth = detailed ? 1 : 0.5;
    ctx.stroke();
}

function drawFlapPlate(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    detailed: boolean,
    chamfer: number,
    color: string | null,
    flapConfig: SplitFlapDisplayFlapConfig
) {
    if (!detailed) {
        ctx.fillStyle = color ?? flapConfig.simpleColor;
        ctx.fillRect(x, y, width, height);
        return;
    }

    flapFacePath(ctx, x, y, width, height, chamfer);
    if (color) {
        ctx.fillStyle = color;
    } else {
        const fill = ctx.createLinearGradient(x, y, x, y + height);
        fill.addColorStop(0, flapConfig.gradientTop);
        fill.addColorStop(0.5, flapConfig.gradientUpperMid);
        fill.addColorStop(0.5, flapConfig.gradientLowerMid);
        fill.addColorStop(1, flapConfig.gradientBottom);
        ctx.fillStyle = fill;
    }
    ctx.fill();

    if (color) {
        ctx.save();
        flapFacePath(ctx, x, y, width, height, chamfer);
        ctx.clip();
        const sheen = ctx.createLinearGradient(x, y, x, y + height);
        sheen.addColorStop(0, "rgba(255,255,255,0.36)");
        sheen.addColorStop(0.5, "rgba(255,255,255,0.02)");
        sheen.addColorStop(0.5, "rgba(0,0,0,0.12)");
        sheen.addColorStop(1, "rgba(0,0,0,0.34)");
        ctx.fillStyle = sheen;
        ctx.fillRect(x, y, width, height);
        ctx.restore();
    }
}

function drawMechanism(
    ctx: CanvasRenderingContext2D,
    moduleX: number,
    moduleY: number,
    moduleW: number,
    moduleH: number,
    moduleRadius: number,
    flapX: number,
    flapY: number,
    flapW: number,
    flapH: number,
    inset: number,
    mechanism: SplitFlapDisplayMechanismConfig
) {
    ctx.save();
    roundedRect(ctx, moduleX, moduleY, moduleW, moduleH, moduleRadius);
    ctx.clip();

    const hingeY = flapY + flapH / 2;
    const lineH = Math.max(0.5, flapH * 0.018);
    ctx.fillStyle = mechanism.hingeColor;
    ctx.fillRect(flapX, hingeY - lineH / 2, flapW, lineH);

    const wheelH = moduleH * 0.1;
    const wheelW = Math.max(1, moduleW * 0.032);
    const wheelR = Math.min(wheelW / 2, wheelH * 0.2);
    const gutterPad = Math.max(0, (inset - wheelW) / 2);
    const leftWheelX = moduleX + gutterPad;
    const rightWheelX = moduleX + moduleW - inset + gutterPad;
    const wheelY = hingeY - wheelH / 2;

    const leftWheelGradient = ctx.createLinearGradient(
        leftWheelX,
        wheelY,
        leftWheelX,
        wheelY + wheelH
    );
    leftWheelGradient.addColorStop(0, mechanism.wheelGradientEnds);
    leftWheelGradient.addColorStop(0.5, mechanism.wheelGradientMid);
    leftWheelGradient.addColorStop(1, mechanism.wheelGradientEnds);
    roundedRect(ctx, leftWheelX, wheelY, wheelW, wheelH, wheelR);
    ctx.fillStyle = leftWheelGradient;
    ctx.fill();

    const rightWheelGradient = ctx.createLinearGradient(
        rightWheelX,
        wheelY,
        rightWheelX,
        wheelY + wheelH
    );
    rightWheelGradient.addColorStop(0, mechanism.wheelGradientEnds);
    rightWheelGradient.addColorStop(0.5, mechanism.wheelGradientMid);
    rightWheelGradient.addColorStop(1, mechanism.wheelGradientEnds);
    roundedRect(ctx, rightWheelX, wheelY, wheelW, wheelH, wheelR);
    ctx.fillStyle = rightWheelGradient;
    ctx.fill();

    const capH = Math.max(2, inset * 1.2);
    const capW = moduleW * 0.1;
    const capX = moduleX + (moduleW - capW) / 2;
    const capTop = moduleY;
    const tipW = capW * 0.4;
    const tipTopY = capTop + capH * 0.55;
    const tipLeft = capX + (capW - tipW) / 2;
    const tipRight = tipLeft + tipW;

    ctx.beginPath();
    ctx.moveTo(capX, capTop);
    ctx.lineTo(capX + capW, capTop);
    ctx.lineTo(capX + capW, tipTopY);
    ctx.lineTo(tipRight, capTop + capH);
    ctx.lineTo(tipLeft, capTop + capH);
    ctx.lineTo(capX, tipTopY);
    ctx.closePath();
    ctx.fillStyle = mechanism.capColor;
    ctx.fill();
    ctx.restore();
}

function clipFlapFace(
    ctx: CanvasRenderingContext2D,
    x: number,
    y: number,
    width: number,
    height: number,
    detailed: boolean,
    chamfer: number
) {
    if (detailed) {
        flapFacePath(ctx, x, y, width, height, chamfer);
    } else {
        ctx.beginPath();
        ctx.rect(x, y, width, height);
    }
    ctx.clip();
}

function drawGlyphText(
    ctx: CanvasRenderingContext2D,
    char: string,
    x: number,
    y: number,
    width: number,
    height: number,
    fontFamily: string,
    glyphColor: string
) {
    const fontSize = Math.max(2, Math.min(width * 0.78, height * 0.78));
    const centerX = x + width / 2;
    const centerY = y + height / 2 + fontSize * 0.04;

    ctx.fillStyle = glyphColor;
    ctx.font = `300 ${fontSize}px ${fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(char, centerX, centerY);
}

function drawCellHalf(
    ctx: CanvasRenderingContext2D,
    cell: SplitFlapDisplayCell,
    half: "top" | "bottom",
    x: number,
    y: number,
    width: number,
    height: number,
    fontFamily: string,
    detailed: boolean,
    chamfer: number,
    flapConfig: SplitFlapDisplayFlapConfig
) {
    const halfHeight = height / 2;
    const clipY = half === "top" ? y : y + halfHeight;
    const color = getSplitFlapDisplayCellColor(cell);
    const text = getSplitFlapDisplayCellText(cell);

    ctx.save();
    clipFlapFace(ctx, x, y, width, height, detailed, chamfer);
    ctx.beginPath();
    ctx.rect(x, clipY, width, halfHeight);
    ctx.clip();
    drawFlapPlate(ctx, x, y, width, height, detailed, chamfer, color, flapConfig);
    if (text) {
        drawGlyphText(
            ctx,
            text,
            x,
            y,
            width,
            height,
            fontFamily,
            flapConfig.glyphColor
        );
    }
    ctx.restore();
}

function drawFoldingCellHalf(
    ctx: CanvasRenderingContext2D,
    cell: SplitFlapDisplayCell,
    half: "top" | "bottom",
    scale: number,
    x: number,
    y: number,
    width: number,
    height: number,
    fontFamily: string,
    detailed: boolean,
    chamfer: number,
    flapConfig: SplitFlapDisplayFlapConfig
) {
    const halfHeight = height / 2;
    const hingeY = y + halfHeight;
    const visibleHeight = halfHeight * clamp(scale, 0, 1);
    if (visibleHeight < 0.5) {
        return;
    }

    const destY = half === "top" ? hingeY - visibleHeight : hingeY;
    const color = getSplitFlapDisplayCellColor(cell);
    const text = getSplitFlapDisplayCellText(cell);

    ctx.save();
    clipFlapFace(ctx, x, y, width, height, detailed, chamfer);
    ctx.beginPath();
    ctx.rect(x, destY, width, visibleHeight);
    ctx.clip();
    drawFlapPlate(ctx, x, y, width, height, detailed, chamfer, color, flapConfig);
    ctx.translate(0, hingeY);
    ctx.scale(1, Math.max(0.001, scale));
    ctx.translate(0, -hingeY);
    if (text) {
        drawGlyphText(
            ctx,
            text,
            x,
            y,
            width,
            height,
            fontFamily,
            flapConfig.glyphColor
        );
    }
    ctx.restore();
}

function drawSplitFlapCell(
    ctx: CanvasRenderingContext2D,
    cell: SplitFlapDisplayCell,
    transition: ReturnType<typeof getAnimationChar> | null,
    x: number,
    y: number,
    width: number,
    height: number,
    fontFamily: string,
    detailed: boolean,
    chamfer: number,
    flapConfig: SplitFlapDisplayFlapConfig
) {
    if (!transition || transition.done) {
        const settledCell = transition?.to ?? cell;
        drawCellHalf(
            ctx,
            settledCell,
            "top",
            x,
            y,
            width,
            height,
            fontFamily,
            detailed,
            chamfer,
            flapConfig
        );
        drawCellHalf(
            ctx,
            settledCell,
            "bottom",
            x,
            y,
            width,
            height,
            fontFamily,
            detailed,
            chamfer,
            flapConfig
        );
        return;
    }

    const fold = transition.flip;
    const oldTopScale = Math.max(0, Math.cos(fold * Math.PI));
    const newBottomScale = Math.max(0, -Math.cos(fold * Math.PI));

    drawCellHalf(
        ctx,
        transition.to,
        "top",
        x,
        y,
        width,
        height,
        fontFamily,
        detailed,
        chamfer,
        flapConfig
    );
    drawCellHalf(
        ctx,
        transition.from,
        "bottom",
        x,
        y,
        width,
        height,
        fontFamily,
        detailed,
        chamfer,
        flapConfig
    );

    if (fold < 0.5) {
        drawFoldingCellHalf(
            ctx,
            transition.from,
            "top",
            oldTopScale,
            x,
            y,
            width,
            height,
            fontFamily,
            detailed,
            chamfer,
            flapConfig
        );
    } else {
        drawFoldingCellHalf(
            ctx,
            transition.to,
            "bottom",
            newBottomScale,
            x,
            y,
            width,
            height,
            fontFamily,
            detailed,
            chamfer,
            flapConfig
        );
    }
}

function drawSplitFlapDisplayFrame(
    ctx: CanvasRenderingContext2D,
    state: SplitFlapDisplayCanvasState,
    now: number,
    fontFamily: string
) {
    const { animations, cells, config, gutterScale, height, width } = state;
    const { cols, rows } = config;

    ctx.clearRect(0, 0, width, height);
    ctx.fillStyle = config.boardBackground;
    ctx.fillRect(0, 0, width, height);

    if (cols <= 0 || rows <= 0) {
        return false;
    }

    const unit = width / 100;
    const padding = config.canvasPaddingScale * gutterScale * unit;
    const gap = config.canvasGapScale * gutterScale * unit;
    const cellWidth = (width - padding * 2 - gap * (cols - 1)) / cols;
    const cellHeight = (height - padding * 2 - gap * (rows - 1)) / rows;
    const detailed = cellWidth >= 18 && cellHeight >= 28;
    const metrics: CellMetrics = {
        cellHeight,
        cellWidth,
        detailed,
        gap,
        padding,
    };
    let hasActiveAnimations = false;

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            const index = row * cols + col;
            const x = metrics.padding + col * (metrics.cellWidth + metrics.gap);
            const y = metrics.padding + row * (metrics.cellHeight + metrics.gap);
            const inset = metrics.detailed
                ? Math.min(metrics.cellWidth, metrics.cellHeight) * 0.04
                : 0;
            const flapX = x + inset;
            const flapY = y + inset;
            const flapWidth = Math.max(0, metrics.cellWidth - inset * 2);
            const flapHeight = Math.max(0, metrics.cellHeight - inset * 2);
            const outerRadius = metrics.detailed
                ? Math.min(metrics.cellWidth, metrics.cellHeight) * 0.08
                : 0;
            const faceChamfer = metrics.detailed
                ? Math.max(
                    0.5,
                    Math.min(flapWidth, flapHeight) * 0.05,
                    outerRadius - inset
                )
                : 0;
            const animation = animations.get(index);
            const animationState = animation
                ? getAnimationChar(animation, now)
                : null;
            const cell = getCell(cells, row, col);

            if (animationState?.done) {
                animations.delete(index);
            } else if (animationState) {
                hasActiveAnimations = true;
            }

            drawModuleBackground(
                ctx,
                x,
                y,
                metrics.cellWidth,
                metrics.cellHeight,
                metrics.detailed,
                config.module
            );
            drawFlapPlate(
                ctx,
                flapX,
                flapY,
                flapWidth,
                flapHeight,
                metrics.detailed,
                faceChamfer,
                getSplitFlapDisplayCellColor(cell),
                config.flap
            );
            drawSplitFlapCell(
                ctx,
                cell,
                animationState,
                flapX,
                flapY,
                flapWidth,
                flapHeight,
                fontFamily,
                metrics.detailed,
                faceChamfer,
                config.flap
            );

            if (metrics.detailed) {
                drawMechanism(
                    ctx,
                    x,
                    y,
                    metrics.cellWidth,
                    metrics.cellHeight,
                    outerRadius,
                    flapX,
                    flapY,
                    flapWidth,
                    flapHeight,
                    inset,
                    config.mechanism
                );
            } else if (metrics.cellHeight >= 8) {
                ctx.fillStyle = config.mechanism.hingeColor;
                ctx.fillRect(
                    flapX,
                    flapY + flapHeight / 2,
                    flapWidth,
                    Math.max(0.5, metrics.cellHeight * 0.035)
                );
            }
        }
    }

    return hasActiveAnimations;
}

function SplitFlapDisplayModuleGrid() {
    const { cells, config, gutterScale, ariaLabel } = useSplitFlapDisplay();
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const frameRef = useRef<HTMLDivElement | null>(null);
    const stateRef = useRef<SplitFlapDisplayCanvasState>({
        animations: new Map(),
        cells,
        config,
        dpr: 1,
        gutterScale,
        height: 0,
        raf: 0,
        width: 0,
    });

    const syncCanvasSize = useCallback(() => {
        const canvas = canvasRef.current;
        const frame = frameRef.current;
        if (!canvas || !frame) {
            return false;
        }

        const { height, width } = frame.getBoundingClientRect();
        const dpr = Math.min(window.devicePixelRatio || 1, MAX_CANVAS_DPR);
        const canvasWidth = Math.max(1, Math.round(width * dpr));
        const canvasHeight = Math.max(1, Math.round(height * dpr));
        const state = stateRef.current;
        const hadNoLayoutSize = state.width <= 0 || state.height <= 0;
        const didResize =
            state.width !== width ||
            state.height !== height ||
            state.dpr !== dpr ||
            canvas.width !== canvasWidth ||
            canvas.height !== canvasHeight;

        state.width = width;
        state.height = height;
        state.dpr = dpr;

        if (
            hadNoLayoutSize &&
            width > 0 &&
            height > 0 &&
            state.animations.size > 0
        ) {
            const t = performance.now();
            for (const animation of state.animations.values()) {
                animation.start = t;
            }
        }

        if (didResize) {
            canvas.width = canvasWidth;
            canvas.height = canvasHeight;
            const ctx = canvas.getContext("2d");
            ctx?.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        return didResize;
    }, []);

    const paint = useCallback((now: number) => {
        const canvas = canvasRef.current;
        const frame = frameRef.current;
        const state = stateRef.current;

        if (!canvas || !frame || state.width <= 0 || state.height <= 0) {
            return false;
        }

        const ctx = canvas.getContext("2d");
        if (!ctx) {
            return false;
        }

        ctx.setTransform(state.dpr, 0, 0, state.dpr, 0, 0);
        const fontFamily =
            getComputedStyle(frame).fontFamily || "ui-monospace, monospace";
        return drawSplitFlapDisplayFrame(ctx, state, now, fontFamily);
    }, []);

    const scheduleFrame = useCallback(() => {
        const state = stateRef.current;
        if (state.raf !== 0) {
            return;
        }

        const tick = (now: number) => {
            state.raf = 0;
            let hasActiveAnimations = paint(now);
            if (
                !hasActiveAnimations &&
                (stateRef.current.width <= 0 || stateRef.current.height <= 0) &&
                stateRef.current.animations.size > 0
            ) {
                for (const animation of stateRef.current.animations.values()) {
                    animation.start = now;
                }
                hasActiveAnimations = true;
            }
            if (hasActiveAnimations) {
                state.raf = window.requestAnimationFrame(tick);
            }
        };

        state.raf = window.requestAnimationFrame(tick);
    }, [paint]);

    useEffect(() => {
        const state = stateRef.current;
        const previousCells = state.cells;
        const previousConfig = state.config;
        const now = performance.now();
        const { cols, rows } = config;

        if (previousConfig.cols !== cols || previousConfig.rows !== rows) {
            state.animations.clear();
        }

        state.cells = cells;
        state.config = config;
        state.gutterScale = gutterScale;

        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const index = row * cols + col;
                const from = getCell(previousCells, row, col);
                const target = getCell(cells, row, col);
                const noMotion =
                    splitFlapDisplayCellsEqual(from, target) ||
                    (isSplitFlapDisplayBlankSlot(from) && isSplitFlapDisplayBlankSlot(target));
                if (noMotion) {
                    state.animations.delete(index);
                    continue;
                }

                const path = cellPathThroughPool(from, target);
                const duration =
                    Math.max(path.length - 1, 1) * FLAP_CHARACTER_STEP_DURATION_MS;

                state.animations.set(index, {
                    path,
                    start: now,
                    target,
                    duration,
                });
            }
        }

        syncCanvasSize();
        paint(performance.now());
        scheduleFrame();
    }, [cells, config, gutterScale, paint, scheduleFrame, syncCanvasSize]);

    useEffect(() => {
        const frame = frameRef.current;
        if (!frame) {
            return;
        }

        const handleResize = () => {
            syncCanvasSize();
            paint(performance.now());
            scheduleFrame();
        };

        handleResize();

        if (typeof ResizeObserver === "undefined") {
            window.addEventListener("resize", handleResize);
            return () => {
                window.removeEventListener("resize", handleResize);
            };
        }

        const observer = new ResizeObserver(handleResize);
        observer.observe(frame);

        return () => {
            observer.disconnect();
        };
    }, [paint, scheduleFrame, syncCanvasSize]);

    useEffect(() => {
        let cancelled = false;

        void document.fonts?.ready.then(() => {
            if (!cancelled) {
                paint(performance.now());
                scheduleFrame();
            }
        });

        return () => {
            cancelled = true;
        };
    }, [paint, scheduleFrame]);

    useEffect(() => {
        const state = stateRef.current;
        return () => {
            if (state.raf !== 0) {
                window.cancelAnimationFrame(state.raf);
                state.raf = 0;
            }
        };
    }, []);

    return (
        <div
            ref={frameRef}
            style={{
                position: "relative",
                boxSizing: "border-box",
                height: "100%",
                minHeight: 0,
                width: "100%",
                minWidth: 0,
                overflow: "hidden",
                fontFamily:
                    'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
            }}
        >
            <canvas
                ref={canvasRef}
                aria-label={ariaLabel}
                role="img"
                style={{
                    display: "block",
                    height: "100%",
                    width: "100%",
                }}
            />
        </div>
    );
}

function SplitFlapDisplayStage({
    children,
    className,
    style,
}: {
    children: ReactNode;
    className?: string;
    style?: CSSProperties;
}) {
    const { config, fit } = useSplitFlapDisplay();
    const { stage } = config;
    const fitStyle: CSSProperties =
        fit === "contain"
            ? {
                containerType: "size",
                display: "flex",
                maxHeight: "100%",
                minHeight: 0,
                width: "100%",
                minWidth: 0,
                maxWidth: "100%",
                flex: "1 1 auto",
                alignSelf: "stretch",
                alignItems: "center",
                justifyContent: "center",
            }
            : {
                minHeight: 0,
                width: "100%",
                minWidth: 0,
            };

    return (
        <div
            className={className}
            style={{
                position: "relative",
                boxSizing: "border-box",
                overflow: "hidden",
                backgroundImage: `linear-gradient(${stage.gradientDirection}, ${stage.gradientFrom}, ${stage.gradientTo})`,
                padding: stage.padding,
                borderRadius: stage.borderRadius,
                boxShadow: stage.shadow,
                ...fitStyle,
                ...style,
            }}
        >
            {children}
        </div>
    );
}

function SplitFlapDisplayAspectFrame({ children }: { children: ReactNode }) {
    const { boardAspect, fit } = useSplitFlapDisplay();

    if (fit === "width") {
        return (
            <div
                style={{
                    boxSizing: "border-box",
                    marginInline: "auto",
                    width: "100%",
                    minWidth: 0,
                    maxWidth: "100%",
                    flexShrink: 0,
                    containerType: "size",
                    aspectRatio: `${boardAspect} / 1`,
                }}
            >
                {children}
            </div>
        );
    }

    return (
        <div
            style={{
                boxSizing: "border-box",
                marginInline: "auto",
                maxHeight: "100%",
                minHeight: 0,
                minWidth: 0,
                maxWidth: "100%",
                flexShrink: 0,
                containerType: "inline-size",
                aspectRatio: `${boardAspect} / 1`,
                width: `min(100cqw, calc(100cqh * (${boardAspect})))`,
            }}
        >
            {children}
        </div>
    );
}

function SplitFlapDisplayBezel({ children }: { children: ReactNode }) {
    const { config, gutterScale } = useSplitFlapDisplay();
    const { bezel } = config;

    return (
        <div
            style={{
                position: "relative",
                boxSizing: "border-box",
                display: "flex",
                height: "100%",
                width: "100%",
                flexDirection: "column",
                padding: `${bezel.paddingScale * gutterScale}cqw`,
                borderRadius: `${bezel.borderRadiusCqw}cqw`,
                backgroundImage: `linear-gradient(to bottom, ${bezel.gradientTop}, ${bezel.gradientMiddle}, ${bezel.gradientBottom})`,
                boxShadow: bezel.shadow,
            }}
        >
            {children}
        </div>
    );
}

function SplitFlapDisplayFace({ children }: { children: ReactNode }) {
    const { config } = useSplitFlapDisplay();
    const { face } = config;

    return (
        <div
            style={{
                boxSizing: "border-box",
                minHeight: 0,
                minWidth: 0,
                flex: "1 1 auto",
                overflow: "hidden",
                borderRadius: `${face.borderRadiusCqw}cqw`,
                border: `1px solid ${face.borderColor}`,
                backgroundImage: `linear-gradient(to bottom, ${face.gradientTop}, ${face.gradientBottom})`,
                boxShadow: face.shadow,
            }}
        >
            {children}
        </div>
    );
}

export type SplitFlapDisplayProps = {
    fit?: SplitFlapDisplayFit;
    className?: string;
    style?: CSSProperties;
    config?: PartialSplitFlapDisplayConfig;
    content?: SplitFlapDisplayContent;
    ariaLabel?: string;
};

export function SplitFlapDisplay({
    className,
    fit = "contain",
    style,
    config: configOverrides,
    content,
    ariaLabel = "Split flap display",
}: SplitFlapDisplayProps = {}) {
    const config = useMemo(() => {
        if (typeof content === "undefined") {
            return resolveSplitFlapDisplayConfig(configOverrides);
        }
        return resolveSplitFlapDisplayConfig({
            ...configOverrides,
            content,
        });
    }, [configOverrides, content]);
    const { cols, rows, cellAspectRatio, gutterRefModuleCount } = config;

    const targetCells = useMemo(
        () => resolveSplitFlapDisplayContent(config.content, cols, rows),
        [config.content, cols, rows]
    );

    const [cells, setCells] = useState(() =>
        createEmptySplitFlapDisplayCells(cols, rows)
    );

    useEffect(() => {
        startTransition(() => {
            setCells(targetCells);
        });
    }, [targetCells]);

    const gutterScale = useMemo(
        () => splitFlapDisplayGridGutterScale(cols, rows, gutterRefModuleCount),
        [cols, rows, gutterRefModuleCount]
    );

    const boardAspect = useMemo(
        () => (cols > 0 && rows > 0 ? (cols / rows) * cellAspectRatio : 1),
        [cols, rows, cellAspectRatio]
    );

    const contextValue = useMemo<SplitFlapDisplayContextValue>(
        () => ({
            config,
            gutterScale,
            boardAspect,
            cells,
            fit,
            ariaLabel,
        }),
        [config, gutterScale, boardAspect, cells, fit, ariaLabel]
    );

    return (
        <SplitFlapDisplayContext.Provider value={contextValue}>
            <SplitFlapDisplayStage className={className} style={style}>
                <SplitFlapDisplayAspectFrame>
                    <SplitFlapDisplayBezel>
                        <SplitFlapDisplayFace>
                            <SplitFlapDisplayModuleGrid />
                        </SplitFlapDisplayFace>
                    </SplitFlapDisplayBezel>
                </SplitFlapDisplayAspectFrame>
            </SplitFlapDisplayStage>
        </SplitFlapDisplayContext.Provider>
    );
}

export default SplitFlapDisplay;
```
