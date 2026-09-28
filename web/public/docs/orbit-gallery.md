# Orbit Gallery

WebGL gallery of image tiles laid out on concentric rings that orbit a shared centre at different speeds.

**Interaction.** The rings turn on their own; scrolling shoves them faster before they coast back to their normal pace. Hovering a tile dims it, clicking floats it to the centre as a large panel while the rings shrink back, and clicking the empty space or pressing Escape smears it away again.

- Categories: 3D & Canvas, Media Galleries
- Tags: webgl, keyboard
- Import: `@/components/ui/orbit-gallery`
- Inspiration: Atelier UI (adaptation) — https://www.atelier-ui.com/en/docs/components/background/orbit-gallery

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/orbit-gallery.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `@react-three/drei`
- `@react-three/fiber`
- `@react-three/postprocessing`
- `motion`
- `three`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `items` *(required)* | `{ src: string; alt: string; }[]` | — | — |
| `radius` *(required)* | `number` | — | — |
| `rings` *(required)* | `number` | — | — |
| `ringGap` *(required)* | `number` | — | — |
| `tileHeight` *(required)* | `number` | — | — |
| `cornerRadius` *(required)* | `number` | — | — |
| `spinSpeed` *(required)* | `number` | — | — |
| `spinStagger` *(required)* | `number` | — | — |
| `wheel` *(required)* | `boolean` | — | — |
| `wheelMultiplier` *(required)* | `number` | — | — |
| `revealDuration` *(required)* | `number` | — | — |
| `focusDuration` *(required)* | `number` | — | — |
| `className` | `string` | — | — |
| `onActiveChange` | `((index: number | null) => void)` | — | — |
| `onReady` | `(() => void)` | — | — |
| `mode` | `"texture" | "scissor"` | — | - texture: children render into an FBO each frame: Global post-processing will work on it.
- scissor: a scissored pass painted on top of the composed frame. lighter, but excluded from global post-processing. |
| `priority` | `number` | — | — |
| `zIndex` | `number` | — | — |
| `transparent` | `boolean` | — | — |

## Usage

```tsx
import { OrbitGallery, OrbitGalleryProps } from "./component"
import { motion } from "motion/react"
import { useState } from "react"

const ITEMS = Array.from({ length: 20 }, (_, index) => ({
    src: `/images/demo/shared/${index + 1}.webp`,
    alt: `Orbit gallery image ${index + 1}`,
}))

export default function OrbitGalleryDemo(controls: Partial<OrbitGalleryProps>) {
    const [webGlReady, setWebGlReady] = useState(false)

    return (
        <div className="h-screen">
            {webGlReady && (
                <motion.h1
                    initial={{ opacity: 0, filter: "blur(3px)" }}
                    animate={{ opacity: 1, filter: "blur(0px)" }}
                    transition={{
                        duration: 0.8,
                        ease: [0.2, 0.03, 0.26, 0.99],
                    }}
                    className="fixed inset-0 flex flex-col items-center justify-center pointer-events-none -z-1"
                >
                    <span className="text-4xl font-serif mb-0.5">Orbit gallery</span>
                    <span className="text-sm text-accent-3">Scroll or select a ring image</span>
                </motion.h1>
            )}

            <OrbitGallery
                items={ITEMS}
                onReady={() => setWebGlReady(true)}
                className="fixed inset-0 w-full h-full"
                {...controls}
            />
        </div>
    )
}
```

## Source

### `components/ui/orbit-gallery.tsx`

```tsx
"use client"

import { shaderMaterial, useTexture } from "@react-three/drei"
import { extend, type ThreeElement, useFrame } from "@react-three/fiber"
import type { Easing } from "motion"
import { animate } from "motion/react"
import {
    type ComponentRef,
    type RefObject,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from "react"
import * as THREE from "three"
import { useWebglReady } from "@/lib/webgl-provider"
import { WebglScene, WebglSceneProps } from "@/lib/webgl-scene"

// Credit:
// https://www.atelier-ui.com/en/docs/components/background/orbit-gallery


const TAU = Math.PI * 2
const ANIMATION_EASING = [0.7, 0, 0.1, 1] as Easing
const REVEAL_SPEED_BOOST = 50
const SELECT_SPEED_BOOST = 10
const RING_DOWNSCALE = 0.8
const TILE_ASPECT = 0.8
const FOCUS_TILE_SIZE = 5
const FOCUS_TILE_HIDDEN_SCALE = 2
const DISTORTION_AMOUNT = 0.5
const DISPERSION_AMOUNT = 5

const DEFAULT_PROPS = {
    radius: 2.8,
    rings: 3,
    ringGap: 1.6,
    tileHeight: 0.7,
    cornerRadius: 0.08,
    spinSpeed: 1,
    spinStagger: 0.2,
    wheel: true,
    wheelMultiplier: 3,
    revealDuration: 2,
    focusDuration: 1,
}

type TileProps = {
    texture: THREE.Texture
    angle: number
    radius: number
    isSelected: boolean
    ready: boolean
    onSelect: () => void
} & Pick<typeof DEFAULT_PROPS, "tileHeight" | "cornerRadius" | "revealDuration" | "focusDuration">

type RingProps = {
    radius: number
    count: number
    offset: number
    speed: number
    scale: number
    textures: THREE.Texture[]
    isSelected: boolean
    ready: boolean
    onSelect: (index: number) => void
    speedFactor: { current: number }
    revealBoost: { current: number }
} & Pick<typeof DEFAULT_PROPS, "tileHeight" | "cornerRadius" | "revealDuration" | "focusDuration">

type FocusTileProps = {
    texture: THREE.Texture | null
    cornerRadius: number
    focusDuration: number
    onDismiss: () => void
}

type OrbitSceneProps = {
    sources: string[]
    surface: RefObject<HTMLElement | null>
    activeIndex: number | null
    onSelect: (index: number) => void
    onDismiss: () => void
    onReady?: () => void
} & typeof DEFAULT_PROPS

type PlaneMesh<T extends THREE.Material> = THREE.Mesh<THREE.PlaneGeometry, T>

export type OrbitGalleryProps = {
    items: {
        src: string
        alt: string
    }[]
    className?: string
    onActiveChange?: (index: number | null) => void
    onReady?: () => void
} & Partial<typeof DEFAULT_PROPS> &
    Pick<WebglSceneProps, "mode" | "priority" | "zIndex" | "transparent">

declare module "@react-three/fiber" {
    interface ThreeElements {
        orbitTileMaterial: ThreeElement<typeof OrbitTileMaterial>
    }
}

/*
 * Shader material for each tile.
 * Draws the image, the rounded mask and the dispersion blur.
 */
const OrbitTileMaterial = shaderMaterial(
    {
        uMap: new THREE.Texture(),
        uTileSize: new THREE.Vector2(1, 1),
        uUvScale: new THREE.Vector2(1, 1),
        uUvOffset: new THREE.Vector2(0, 0),
        uRadius: 0,
        uOpacity: 1,
        uReveal: 1,
        uDistortion: 0,
        uDispersion: 0,
    },
    /* glsl */ `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    /* glsl */ `
        uniform sampler2D uMap;
        uniform vec2 uTileSize;
        uniform vec2 uUvScale;
        uniform vec2 uUvOffset;
        uniform float uRadius;
        uniform float uOpacity;
        uniform float uReveal;
        uniform float uDistortion;
        uniform float uDispersion;
        varying vec2 vUv;

        const int BLUR_SAMPLES = 16;
        const float RGB_SHIFT = 0.35;

        float sdRoundBox(vec2 point, vec2 halfSize, float radius) {
            vec2 corner = abs(point) - halfSize + radius;
            return min(max(corner.x, corner.y), 0.0) + length(max(corner, 0.0)) - radius;
        }

        vec4 sampleMap(vec2 uv) {
            return texture2D(uMap, uUvOffset + uv * uUvScale);
        }

        float roundBoxMask(vec2 uv) {
            vec2 point = (uv - 0.5) * uTileSize;
            vec2 halfSize = uTileSize * 0.5;
            float radius = min(uRadius, min(halfSize.x, halfSize.y));
            float boxDistance = sdRoundBox(point, halfSize, radius);
            float boxAntialias = fwidth(boxDistance);
            return smoothstep(boxAntialias, -boxAntialias, boxDistance);
        }

        void main() {
            vec2 centered = vUv - 0.5;
            vec2 uv = 0.5 + centered * (1.0 + uDistortion * (0.5 - dot(centered, centered)));

            vec4 texel = sampleMap(uv);
            vec3 color = texel.rgb;
            float alpha = texel.a;

            if (uDispersion > 0.0) {
                vec2 offset = uv - 0.5;
                float amount = uDispersion * dot(centered, centered);
                vec3 blurred = vec3(0.0);
                float total = 0.0;

                for (int sampleIndex = 0; sampleIndex < BLUR_SAMPLES; sampleIndex++) {
                    float progress = float(sampleIndex) / float(BLUR_SAMPLES - 1);
                    float weight = 1.0 - progress * 0.6;

                    float scale = 1.0 - amount * progress;
                    float spread = RGB_SHIFT * amount * progress;

                    blurred.r += sampleMap(0.5 + offset * (scale + spread)).r * weight;
                    blurred.g += sampleMap(0.5 + offset * scale).g * weight;
                    blurred.b += sampleMap(0.5 + offset * (scale - spread)).b * weight;

                    total += weight;
                }

                color = blurred / total;
            }

            float mask = roundBoxMask(uv);

            alpha *= mask;

            gl_FragColor = vec4(color, alpha * uOpacity * uReveal);
        }
    `,
)

extend({ OrbitTileMaterial })

/*
 * Image tile placed on a ring.
 * Handles the reveal, the fade and hover (opacity) transitions and click selection.
 */
function Tile({
    texture,
    angle,
    radius,
    tileHeight,
    cornerRadius,
    isSelected,
    ready,
    revealDuration,
    focusDuration,
    onSelect,
}: TileProps) {
    const [hovered, setHovered] = useState(false)
    const meshRef = useRef<PlaneMesh<InstanceType<typeof OrbitTileMaterial>>>(null)
    const wasSelected = useRef(isSelected)
    const width = tileHeight * TILE_ASPECT

    const crop = useMemo(() => {
        const image = texture.image as HTMLImageElement
        const imageAspect = image.width / image.height
        const scale =
            imageAspect > TILE_ASPECT
                ? new THREE.Vector2(TILE_ASPECT / imageAspect, 1)
                : new THREE.Vector2(1, imageAspect / TILE_ASPECT)
        return {
            scale,
            offset: new THREE.Vector2((1 - scale.x) / 2, (1 - scale.y) / 2),
        }
    }, [texture])

    const tilePlacement = useMemo(() => {
        return {
            position: new THREE.Vector3(Math.cos(angle) * radius, Math.sin(angle) * radius, 0),
            rotation: angle - Math.PI / 2,
        }
    }, [angle, radius])

    useEffect(() => {
        function tileFadeAnimation() {
            const material = meshRef.current?.material
            if (!material) return
            const selectionChanged = wasSelected.current !== isSelected
            wasSelected.current = isSelected
            const controls = animate(
                material,
                { uOpacity: isSelected ? 0 : hovered ? 0.7 : 1 },
                selectionChanged
                    ? { duration: focusDuration * 0.3, ease: ANIMATION_EASING, delay: 0.2 }
                    : { duration: hovered ? 0.2 : 0.3 },
            )
            return () => controls.stop()
        }

        return tileFadeAnimation()
    }, [isSelected, hovered, focusDuration])

    useEffect(() => {
        if (!ready) return
        function tileRevealAnimation() {
            const material = meshRef.current?.material
            if (!material) return
            const controls = animate(
                material,
                { uReveal: 1 },
                { duration: revealDuration, ease: ANIMATION_EASING },
            )
            return () => controls.stop()
        }

        return tileRevealAnimation()
    }, [ready, revealDuration])

    return (
        <group position={tilePlacement.position} rotation-z={tilePlacement.rotation}>
            <mesh
                ref={meshRef}
                raycast={isSelected ? () => null : THREE.Mesh.prototype.raycast}
                onClick={(event) => {
                    event.stopPropagation()
                    onSelect()
                }}
                onPointerOver={() => setHovered(true)}
                onPointerOut={() => setHovered(false)}
            >
                <planeGeometry args={[width, tileHeight]} />
                <orbitTileMaterial
                    key={OrbitTileMaterial.key}
                    uMap={texture}
                    uTileSize={new THREE.Vector2(width, tileHeight)}
                    uUvScale={crop.scale}
                    uUvOffset={crop.offset}
                    uRadius={cornerRadius}
                    uReveal={0}
                    transparent
                    depthWrite={false}
                />
            </mesh>
        </group>
    )
}

/*
 * One rotating ring of tiles.
 * Handles the spin and the fade-out when a tile is selected.
 */
function Ring({
    textures,
    radius,
    count,
    offset,
    speed,
    scale: ringScale,
    tileHeight,
    cornerRadius,
    isSelected,
    ready,
    revealDuration,
    focusDuration,
    onSelect,
    speedFactor,
    revealBoost,
}: RingProps) {
    const groupRef = useRef<THREE.Group>(null)
    const selectBoost = useRef(0)

    const tiles = useMemo(() => {
        return Array.from({ length: count }, (_, index) => {
            const textureIndex = (index + offset) % textures.length
            return {
                angle: (index / count) * TAU,
                textureIndex,
                texture: textures[textureIndex],
            }
        })
    }, [count, offset, textures])

    useEffect(() => {
        function ringFadeAnimation() {
            const group = groupRef.current
            if (!group) return
            const scale = isSelected ? ringScale : 1
            const controls = animate([
                [
                    group.scale,
                    { x: scale, y: scale, z: scale },
                    { duration: focusDuration * 0.8, ease: ANIMATION_EASING },
                ],
                [
                    selectBoost,
                    { current: isSelected ? SELECT_SPEED_BOOST : 1 },
                    { duration: focusDuration * 0.3, ease: "linear", at: 0 },
                ],
            ])
            return () => controls.stop()
        }

        return ringFadeAnimation()
    }, [isSelected, ringScale, focusDuration])

    useFrame((_, delta) => {
        const group = groupRef.current
        if (!group) return

        const boost = selectBoost.current + revealBoost.current
        const direction = Math.sign(speed)
        const rmp = (speed + direction * boost) * speedFactor.current
        group.rotation.z += (rmp * TAU * delta) / 60
    })

    return (
        <group ref={groupRef}>
            {tiles.map((tile, index) => (
                <Tile
                    key={index}
                    texture={tile.texture}
                    angle={tile.angle}
                    radius={radius}
                    tileHeight={tileHeight}
                    cornerRadius={cornerRadius}
                    isSelected={isSelected}
                    ready={ready}
                    revealDuration={revealDuration}
                    focusDuration={focusDuration}
                    onSelect={() => onSelect(tile.textureIndex)}
                />
            ))}
        </group>
    )
}

/*
 * Enlarged tile shown when an image is selected.
 * Handles the zoom, distortion and fade transitions.
 */
function FocusTile({ texture, cornerRadius, focusDuration, onDismiss }: FocusTileProps) {
    const [displayed, setDisplayed] = useState<THREE.Texture | null>(null)
    const meshRef = useRef<PlaneMesh<InstanceType<typeof OrbitTileMaterial>>>(null)

    useEffect(() => {
        if (texture) setDisplayed(texture)
    }, [texture])

    useEffect(() => {
        function focusTileFadeAnimation() {
            const mesh = meshRef.current
            if (!mesh) return
            const scale = texture ? 1 : FOCUS_TILE_HIDDEN_SCALE
            const controls = animate([
                [
                    mesh.material,
                    { uOpacity: texture ? 1 : 0 },
                    { duration: focusDuration * 0.8, ease: ANIMATION_EASING },
                ],
                [
                    mesh.material,
                    { uDistortion: texture ? 0 : DISTORTION_AMOUNT },
                    { duration: focusDuration * 0.8, ease: ANIMATION_EASING, at: 0 },
                ],
                [
                    mesh.material,
                    { uDispersion: texture ? 0 : DISPERSION_AMOUNT },
                    { duration: focusDuration * 0.8, ease: ANIMATION_EASING, at: 0 },
                ],
                [
                    mesh.scale,
                    { x: scale, y: scale },
                    { duration: focusDuration * 0.7, ease: ANIMATION_EASING, at: 0 },
                ],
            ])
            if (!texture) controls.then(() => setDisplayed(null))
            return () => controls.stop()
        }

        return focusTileFadeAnimation()
    }, [texture, displayed, focusDuration])

    if (!displayed) return null

    const image = displayed.image as HTMLImageElement
    const width = FOCUS_TILE_SIZE * (image.width / image.height)

    return (
        <mesh
            ref={meshRef}
            position-z={1}
            scale={[FOCUS_TILE_HIDDEN_SCALE, FOCUS_TILE_HIDDEN_SCALE, 1]}
            raycast={texture ? THREE.Mesh.prototype.raycast : () => null}
            onPointerOver={(event) => event.stopPropagation()}
            onClick={(event) => {
                event.stopPropagation()
                onDismiss()
            }}
        >
            <planeGeometry args={[width, FOCUS_TILE_SIZE]} />
            <orbitTileMaterial
                key={OrbitTileMaterial.key}
                uMap={displayed}
                uTileSize={new THREE.Vector2(width, FOCUS_TILE_SIZE)}
                uRadius={cornerRadius}
                uOpacity={0}
                uDistortion={DISTORTION_AMOUNT}
                uDispersion={DISPERSION_AMOUNT}
                transparent
                depthWrite={false}
            />
        </mesh>
    )
}

/*
 * Builds the ring configs and loads the textures.
 * Tracks the selected tile and handles dismissal.
 */
function OrbitScene({
    sources,
    surface,
    activeIndex,
    onSelect,
    onDismiss,
    radius,
    rings,
    ringGap,
    tileHeight,
    cornerRadius,
    spinSpeed,
    spinStagger,
    wheel,
    wheelMultiplier,
    revealDuration,
    focusDuration,
    onReady,
}: OrbitSceneProps) {
    const textures = useTexture(sources)
    const speedFactor = useRef(1)
    const revealBoost = useRef(REVEAL_SPEED_BOOST)
    const ready = useWebglReady({ onReady })
    const selected = activeIndex !== null ? textures[activeIndex] : null

    const select = useCallback(
        (index: number) => {
            onSelect(index)
            surface.current?.style.removeProperty("cursor")
        },
        [onSelect, surface],
    )

    useEffect(() => {
        if (!ready) return
        function revealSpinAnimation() {
            const controls = animate(
                revealBoost,
                { current: 0 },
                { duration: revealDuration, ease: ANIMATION_EASING },
            )
            return () => controls.stop()
        }

        return revealSpinAnimation()
    }, [ready, revealDuration])

    useEffect(() => {
        const target = surface.current
        if (!target || !wheel) return

        const onWheel = (event: WheelEvent) => {
            event.preventDefault()
            speedFactor.current += event.deltaY * 0.01 * wheelMultiplier
        }
        target.addEventListener("wheel", onWheel)
        return () => target.removeEventListener("wheel", onWheel)
    }, [surface, wheel, wheelMultiplier])

    useEffect(() => {
        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") onDismiss()
        }
        window.addEventListener("keydown", onKeyDown)
        return () => window.removeEventListener("keydown", onKeyDown)
    }, [onDismiss])

    useFrame((_, delta) => {
        speedFactor.current = THREE.MathUtils.damp(
            speedFactor.current,
            Math.sign(speedFactor.current) || 1,
            8,
            delta,
        )
    })

    const ringConfigs = useMemo(
        () =>
            Array.from({ length: rings }, (_, ring) => {
                const ringRadius = radius + ring * ringGap

                return {
                    radius: ringRadius,
                    count: Math.max(3, Math.round(sources.length * (ringRadius / radius))),
                    offset: Math.round((ring * sources.length) / rings),
                    speed: spinSpeed * spinStagger ** ring,
                    scale: 1 - RING_DOWNSCALE / (ring + 1),
                }
            }),
        [radius, rings, ringGap, sources.length, spinSpeed, spinStagger],
    )

    return (
        <group
            onPointerMissed={onDismiss}
            onPointerOver={() => surface.current?.style.setProperty("cursor", "pointer")}
            onPointerOut={() => surface.current?.style.removeProperty("cursor")}
        >
            {ringConfigs.map((config, index) => (
                <Ring
                    key={index}
                    textures={textures}
                    radius={config.radius}
                    count={config.count}
                    offset={config.offset}
                    speed={config.speed}
                    scale={config.scale}
                    tileHeight={tileHeight}
                    cornerRadius={cornerRadius}
                    isSelected={selected !== null}
                    ready={ready}
                    revealDuration={revealDuration}
                    focusDuration={focusDuration}
                    onSelect={select}
                    speedFactor={speedFactor}
                    revealBoost={revealBoost}
                />
            ))}

            <FocusTile
                texture={selected}
                cornerRadius={cornerRadius}
                focusDuration={focusDuration}
                onDismiss={onDismiss}
            />
        </group>
    )
}

/*
 * Public component for the gallery.
 * Takes the images and renders the WebGL scene.
 */
export function OrbitGallery({
    items,
    className,
    onActiveChange,
    mode,
    priority,
    zIndex,
    transparent,
    ...rest
}: OrbitGalleryProps) {
    const surface = useRef<ComponentRef<"div">>(null)
    const sceneProps = { ...DEFAULT_PROPS, ...rest }
    const [activeIndex, setActiveIndex] = useState<number | null>(null)

    const dismiss = useCallback(() => {
        setActiveIndex(null)
    }, [])

    useEffect(() => {
        onActiveChange?.(activeIndex)
    }, [activeIndex, onActiveChange])

    return (
        <div ref={surface} className={`touch-none select-none ${className ?? ""}`}>
            {/* Basic SEO/accessibility layer */}
            <ul className="sr-only">
                {items.map((image, index) => (
                    <li key={image.src}>
                        <button
                            type="button"
                            aria-current={activeIndex === index}
                            onClick={() => setActiveIndex(index)}
                        >
                            <img src={image.src} alt={image.alt} />
                        </button>
                    </li>
                ))}
            </ul>

            {items.length > 0 && (
                <WebglScene
                    track={surface}
                    mode={mode}
                    priority={priority}
                    zIndex={zIndex}
                    transparent={transparent}
                >
                    <OrbitScene
                        {...sceneProps}
                        surface={surface}
                        sources={items.map((image) => image.src)}
                        activeIndex={activeIndex}
                        onSelect={setActiveIndex}
                        onDismiss={dismiss}
                    />
                </WebglScene>
            )}
        </div>
    )
}
```

### `lib/webgl-portal.tsx`

```tsx
"use client"

import {
    type ReactNode,
    Suspense,
    useEffect,
    useId,
    useLayoutEffect,
    useSyncExternalStore,
} from "react"

const useIsoLayoutEffect = typeof window !== "undefined" ? useLayoutEffect : useEffect

// Minimal teleport: <In> registers children in an external store,
// <Out> renders them — bridges across the Canvas React root the same
function WebglTeleport() {
    const items = new Map<string, ReactNode>()
    const listeners = new Set<() => void>()
    let snapshot: [string, ReactNode][] = []

    const emit = () => {
        snapshot = Array.from(items.entries())
        for (const listener of listeners) {
            listener()
        }
    }

    const subscribe = (listener: () => void) => {
        listeners.add(listener)
        return () => {
            listeners.delete(listener)
        }
    }
    const getSnapshot = () => snapshot

    function useItems() {
        return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
    }

    return {
        In({ children }: { children: ReactNode }) {
            const id = useId()

            useIsoLayoutEffect(() => {
                items.set(id, children)
                emit()
                return () => {
                    items.delete(id)
                    emit()
                }
            }, [id, children])
            return null
        },
        useItems,
        Out() {
            const list = useItems()
            return (
                <>
                    {list.map(([id, node]) => (
                        <Suspense key={id} fallback={null}>
                            {node}
                        </Suspense>
                    ))}
                </>
            )
        },
    }
}

const webglTeleport = WebglTeleport()
const effectTeleport = WebglTeleport()

export function WebglPortal() {
    return <webglTeleport.Out />
}

export { effectTeleport, webglTeleport }
```

### `lib/webgl-provider.tsx`

```tsx
"use client"

import { advance, Canvas, type CanvasProps, useStore, useThree } from "@react-three/fiber"
import { EffectComposer } from "@react-three/postprocessing"
import { cancelFrame, type FrameData, frame } from "motion"
import { type ComponentRef, type ReactNode, useEffect, useRef, useState } from "react"
import type { Camera, Scene } from "three"
import { effectTeleport, WebglPortal } from "@/lib/webgl-portal"

type WebglProviderProps = Omit<CanvasProps, "children" | "eventSource"> & {
    children: ReactNode
    className?: string
    contained?: boolean
}

type WebglReadyOptions = {
    scene?: Scene
    camera?: Camera
    enabled?: boolean
    onReady?: () => void
}

export function useWebglReady({ scene, camera, enabled = true, onReady }: WebglReadyOptions = {}) {
    const [ready, setReady] = useState(false)
    const gl = useThree((state) => state.gl)
    const defaultScene = useThree((state) => state.scene)
    const defaultCamera = useThree((state) => state.camera)
    const onReadyRef = useRef(onReady)
    onReadyRef.current = onReady

    const targetScene = scene ?? defaultScene
    const targetCamera = camera ?? defaultCamera

    useEffect(() => {
        if (!enabled) return
        let active = true

        gl.compileAsync(targetScene, targetCamera).then(() => {
            if (!active) return
            requestAnimationFrame(() => {
                if (!active) return
                setReady(true)
                onReadyRef.current?.()
            })
        })

        return () => {
            active = false
        }
    }, [gl, targetScene, targetCamera, enabled])

    return ready
}

// Renders in Motion's `postRender` phase, after Lenis and Motion have
// updated. One shared driver serves every mounted provider.
type CanvasStore = ReturnType<typeof useStore>
const canvasStores = new Set<CanvasStore>()
let clockStart: number | null = null

function tick(data: FrameData) {
    if (clockStart === null) clockStart = data.timestamp

    // frameloop="never" expects the elapsed clock time in seconds.
    const elapsed = (data.timestamp - clockStart) / 1000

    let runGlobalEffects = true
    for (const store of canvasStores) {
        const state = store.getState()
        if (state.internal.active) {
            advance(elapsed, runGlobalEffects, state)
            runGlobalEffects = false
        }
    }
}

function MotionFrameloop() {
    const store = useStore()

    useEffect(() => {
        canvasStores.add(store)
        if (canvasStores.size === 1) frame.postRender(tick, true)
        return () => {
            canvasStores.delete(store)
            if (canvasStores.size === 0) cancelFrame(tick)
        }
    }, [store])

    return null
}

function Effects() {
    const effects = effectTeleport.useItems()
    const gl = useThree((state) => state.gl)
    const mounted = effects.length > 0

    // EffectComposer sets `renderer.autoClear = false` and never restores it;
    // without this the canvas keeps its last frame once the composer unmounts.
    useEffect(() => {
        if (!mounted) return
        return () => {
            gl.autoClear = true
        }
    }, [mounted, gl])

    if (!mounted) return null

    return (
        <EffectComposer key={effects.length}>
            <effectTeleport.Out />
        </EffectComposer>
    )
}

export function WebglProvider({
    children,
    className,
    style,
    contained = false,
    ...canvasProps
}: WebglProviderProps) {
    const [eventSource, setEventSource] = useState<ComponentRef<"div"> | null>(null)

    return (
        <div
            ref={setEventSource}
            data-atelier-webgl=""
            className={className}
            style={contained ? { position: "relative" } : { display: "contents" }}
        >
            <Canvas
                eventPrefix="client"
                dpr={[1, 2]}
                {...canvasProps}
                frameloop="never"
                eventSource={eventSource ?? undefined}
                style={{
                    position: contained ? "absolute" : "fixed",
                    inset: 0,
                    pointerEvents: "none",
                    ...style,
                }}
            >
                <MotionFrameloop />
                <WebglPortal />
                <Effects />
            </Canvas>

            {children}
        </div>
    )
}
```

### `lib/webgl-scene.tsx`

```tsx
"use client"

import { shaderMaterial, useFBO } from "@react-three/drei"
import { createPortal, extend, type ThreeElement, useFrame, useThree } from "@react-three/fiber"
import { type ReactNode, type RefObject, useLayoutEffect, useMemo, useRef } from "react"
import { type Mesh, PerspectiveCamera, Scene, Texture } from "three"
import { webglTeleport } from "@/lib/webgl-portal"

const DisplayMaterial = shaderMaterial(
    { uMap: new Texture() },
    /* glsl */ `
        varying vec2 vUv;
        void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
    `,
    /* glsl */ `
        uniform sampler2D uMap;
        varying vec2 vUv;
        void main() {
            gl_FragColor = texture2D(uMap, vUv);
        }
    `,
)

extend({ DisplayMaterial })

declare module "@react-three/fiber" {
    interface ThreeElements {
        displayMaterial: ThreeElement<typeof DisplayMaterial>
    }
}

export type WebglSceneProps = {
    track: RefObject<HTMLElement | null>
    children: ReactNode
    camera?: PerspectiveCamera
    /**
     * - texture: children render into an FBO each frame: Global post-processing will work on it.
     * - scissor: a scissored pass painted on top of the composed frame. lighter, but excluded from global post-processing.
     */
    mode?: "texture" | "scissor"
    priority?: number
    zIndex?: number
    transparent?: boolean
    /**
     * Re-measures the DOM rect every frame so the plane follows animated parents (motion, parallax).
     * Costs one layout read per frame, so only enable it when needed.
     */
    autoReflow?: boolean
}

function WebglScenePortal({
    track,
    children,
    camera: propCamera,
    mode = "scissor",
    priority,
    zIndex = 0,
    transparent = true,
    autoReflow = false,
}: WebglSceneProps) {
    const defaultCamera = useMemo(() => {
        const cam = new PerspectiveCamera(75, 1, 0.1, 1000)
        cam.position.z = 5
        return cam
    }, [])

    const scene = useMemo(() => new Scene(), [])
    const camera = propCamera ?? defaultCamera
    const bounds = useRef({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    })

    const gl = useThree((s) => s.gl)
    const size = useThree((s) => s.size)
    const viewport = useThree((s) => s.viewport)
    const displayMesh = useRef<Mesh>(null)
    const fbo = useFBO(1, 1, { samples: 4 })

    useLayoutEffect(() => {
        fbo.texture.colorSpace = gl.outputColorSpace
    }, [fbo, gl])

    useLayoutEffect(() => {
        const target = track.current
        if (!target) return

        const measure = () => {
            const rect = target.getBoundingClientRect()
            bounds.current.x = rect.left + window.scrollX
            bounds.current.y = rect.top + window.scrollY
            bounds.current.width = rect.width
            bounds.current.height = rect.height
        }

        measure()
        const resizeObserver = new ResizeObserver(measure)
        resizeObserver.observe(target)
        resizeObserver.observe(document.body)
        return () => resizeObserver.disconnect()
    }, [track])

    const renderPriority = priority ?? (mode === "texture" ? 0 : 2)

    useFrame(() => {
        const transitioning = document.documentElement.hasAttribute("data-atelier-transitioning")

        let left: number
        let top: number
        let width: number
        let height: number

        if ((autoReflow || transitioning) && track.current) {
            const rect = track.current.getBoundingClientRect()
            left = rect.left
            top = rect.top
            width = rect.width
            height = rect.height
        } else {
            const b = bounds.current
            left = b.x - window.scrollX
            top = b.y - window.scrollY
            width = b.width
            height = b.height
        }

        if (width === 0 || height === 0) return

        const aspect = width / height
        if (camera.aspect !== aspect) {
            camera.aspect = aspect
            camera.updateProjectionMatrix()
        }

        if (mode === "scissor") {
            const canvasHeight = gl.domElement.clientHeight
            const canvasWidth = gl.domElement.clientWidth

            const previousAutoClear = gl.autoClear
            gl.autoClear = false
            gl.setViewport(left, canvasHeight - (top + height), width, height)
            gl.setScissor(left, canvasHeight - (top + height), width, height)
            gl.setScissorTest(true)
            gl.clear()
            gl.render(scene, camera)
            gl.setScissorTest(false)
            gl.setViewport(0, 0, canvasWidth, canvasHeight)
            gl.setScissor(0, 0, canvasWidth, canvasHeight)
            gl.autoClear = previousAutoClear
            return
        }

        const pixelRatio = gl.getPixelRatio()
        const fboWidth = Math.max(1, Math.ceil(width * pixelRatio))
        const fboHeight = Math.max(1, Math.ceil(height * pixelRatio))

        if (fbo.width !== fboWidth || fbo.height !== fboHeight) {
            fbo.setSize(fboWidth, fboHeight)
        }

        const previousClearAlpha = gl.getClearAlpha()
        const previousAutoClear = gl.autoClear

        gl.autoClear = true
        gl.setRenderTarget(fbo)
        gl.setClearAlpha(transparent ? 0 : 1)
        gl.clear()
        gl.render(scene, camera)
        gl.setRenderTarget(null)
        gl.setClearAlpha(previousClearAlpha)
        gl.autoClear = previousAutoClear

        const mesh = displayMesh.current

        if (mesh) {
            const pxToWorld = viewport.height / size.height
            mesh.position.x = (left + width / 2 - size.width / 2) * pxToWorld
            mesh.position.y = -(top + height / 2 - size.height / 2) * pxToWorld
            mesh.scale.x = width * pxToWorld
            mesh.scale.y = height * pxToWorld
        }
    }, renderPriority)

    const portal = createPortal(children, scene, {
        camera,
        events: {
            compute: (event, state) => {
                const rect = track.current?.getBoundingClientRect()
                if (!rect) return
                state.pointer.set(
                    ((event.clientX - rect.left) / rect.width) * 2 - 1,
                    -(((event.clientY - rect.top) / rect.height) * 2 - 1),
                )
                state.raycaster.setFromCamera(state.pointer, camera)
            },
        },
    })

    return (
        <>
            {portal}
            {mode === "texture" && (
                <mesh ref={displayMesh} renderOrder={zIndex}>
                    <planeGeometry args={[1, 1]} />
                    <displayMaterial
                        key={DisplayMaterial.key}
                        uMap={fbo.texture}
                        transparent
                        premultipliedAlpha
                        depthTest={false}
                        depthWrite={false}
                    />
                </mesh>
            )}
        </>
    )
}

export function WebglScene(props: WebglSceneProps) {
    return (
        <webglTeleport.In>
            <WebglScenePortal {...props} />
        </webglTeleport.In>
    )
}
```

## Attribution

Source: Atelier UI · Original: https://www.atelier-ui.com/en/docs/components/background/orbit-gallery

Adapted from the original. Credit the original author when you ship this.
