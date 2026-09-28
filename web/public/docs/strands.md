# Strands

- Categories: Backgrounds
- Tags: webgl, autoplay
- Import: `@/components/ui/strands`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/strands.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `ogl`

## Props

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `colors` | `string[]` | `['#FF4242', '#7C3AED', '#06B6D4', '#E…` | — |
| `count` | `number` | `3` | — |
| `speed` | `number` | `0.5` | — |
| `amplitude` | `number` | `1` | — |
| `waviness` | `number` | `1` | — |
| `thickness` | `number` | `0.7` | — |
| `glow` | `number` | `2.6` | — |
| `taper` | `number` | `3` | — |
| `spread` | `number` | `1` | — |
| `hueShift` | `number` | `0` | — |
| `intensity` | `number` | `0.6` | — |
| `saturation` | `number` | `1.5` | — |
| `opacity` | `number` | `1` | — |
| `scale` | `number` | `1.5` | — |
| `glass` | `boolean` | `false` | — |
| `refraction` | `number` | `1` | — |
| `dispersion` | `number` | `1` | — |
| `glassSize` | `number` | `1` | — |
| `className` | `string` | `''` | — |
| `style` | `CSSProperties` | — | — |

## Usage

```tsx
"use client";

import { useState } from "react";

import Strands from "./component";

import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export default function Usage() {
	const [color1, setColor1] = useState("#F97316");
	const [color2, setColor2] = useState("#7C3AED");
	const [color3, setColor3] = useState("#06B6D4");
	const [count, setCount] = useState(3);
	const [speed, setSpeed] = useState(0.5);
	const [amplitude, setAmplitude] = useState(1);
	const [waviness, setWaviness] = useState(1);
	const [thickness, setThickness] = useState(0.7);
	const [glow, setGlow] = useState(2.6);
	const [taper, setTaper] = useState(3);
	const [spread, setSpread] = useState(1);
	const [hueShift, setHueShift] = useState(0);
	const [intensity, setIntensity] = useState(0.6);
	const [saturation, setSaturation] = useState(2);
	const [opacity, setOpacity] = useState(1);
	const [scale, setScale] = useState(1.5);
	const [glass, setGlass] = useState(false);
	const [refraction, setRefraction] = useState(1);
	const [dispersion, setDispersion] = useState(1);
	const [glassSize, setGlassSize] = useState(1);

	const colors = [color1, color2, color3];

	return (
		<div className="h-screen w-screen overflow-auto">
			<div className="h-screen w-full">
				<Strands
					colors={colors}
					count={count}
					speed={speed}
					amplitude={amplitude}
					waviness={waviness}
					thickness={thickness}
					glow={glow}
					taper={taper}
					spread={spread}
					hueShift={hueShift}
					intensity={intensity}
					saturation={saturation}
					opacity={opacity}
					scale={scale}
					glass={glass}
					refraction={refraction}
					dispersion={dispersion}
					glassSize={glassSize}
				/>
			</div>
			<div className="h-screen flex flex-col gap-7 p-6">
				<label className="flex items-center gap-3">
					color 1
					<input
						type="color"
						value={color1}
						onChange={(e) => setColor1(e.target.value)}
						className="h-8 w-12 cursor-pointer rounded border bg-transparent"
					/>
				</label>
				<label className="flex items-center gap-3">
					color 2
					<input
						type="color"
						value={color2}
						onChange={(e) => setColor2(e.target.value)}
						className="h-8 w-12 cursor-pointer rounded border bg-transparent"
					/>
				</label>
				<label className="flex items-center gap-3">
					color 3
					<input
						type="color"
						value={color3}
						onChange={(e) => setColor3(e.target.value)}
						className="h-8 w-12 cursor-pointer rounded border bg-transparent"
					/>
				</label>

				<label>count</label>
				<Slider
					min={1}
					max={10}
					step={1}
					value={[count]}
					onValueChange={([value]) => setCount(value)}
				/>

				<label>speed</label>
				<Slider
					min={0}
					max={3}
					step={0.1}
					value={[speed]}
					onValueChange={([value]) => setSpeed(value)}
				/>

				<label>amplitude</label>
				<Slider
					min={0}
					max={3}
					step={0.1}
					value={[amplitude]}
					onValueChange={([value]) => setAmplitude(value)}
				/>

				<label>waviness</label>
				<Slider
					min={0.2}
					max={3}
					step={0.1}
					value={[waviness]}
					onValueChange={([value]) => setWaviness(value)}
				/>

				<label>thickness</label>
				<Slider
					min={0.2}
					max={4}
					step={0.1}
					value={[thickness]}
					onValueChange={([value]) => setThickness(value)}
				/>

				<label>glow</label>
				<Slider
					min={0.3}
					max={3}
					step={0.05}
					value={[glow]}
					onValueChange={([value]) => setGlow(value)}
				/>

				<label>taper</label>
				<Slider
					min={0.5}
					max={6}
					step={0.1}
					value={[taper]}
					onValueChange={([value]) => setTaper(value)}
				/>

				<label>spread</label>
				<Slider
					min={0}
					max={3}
					step={0.1}
					value={[spread]}
					onValueChange={([value]) => setSpread(value)}
				/>

				<label>hue shift</label>
				<Slider
					min={0}
					max={1}
					step={0.01}
					value={[hueShift]}
					onValueChange={([value]) => setHueShift(value)}
				/>

				<label>intensity</label>
				<Slider
					min={0}
					max={1}
					step={0.05}
					value={[intensity]}
					onValueChange={([value]) => setIntensity(value)}
				/>

				<label>saturation</label>
				<Slider
					min={0}
					max={2}
					step={0.05}
					value={[saturation]}
					onValueChange={([value]) => setSaturation(value)}
				/>

				<label>opacity</label>
				<Slider
					min={0}
					max={1}
					step={0.05}
					value={[opacity]}
					onValueChange={([value]) => setOpacity(value)}
				/>

				<label>scale</label>
				<Slider
					min={0.3}
					max={3}
					step={0.1}
					value={[scale]}
					onValueChange={([value]) => setScale(value)}
				/>

				<label>glass ball</label>
				<Switch checked={glass} onCheckedChange={setGlass} />

				<label>refraction</label>
				<Slider
					min={0}
					max={3}
					step={0.05}
					value={[refraction]}
					disabled={!glass}
					onValueChange={([value]) => setRefraction(value)}
				/>

				<label>dispersion</label>
				<Slider
					min={0}
					max={4}
					step={0.05}
					value={[dispersion]}
					disabled={!glass}
					onValueChange={([value]) => setDispersion(value)}
				/>

				<label>glass size</label>
				<Slider
					min={0.3}
					max={1}
					step={0.01}
					value={[glassSize]}
					disabled={!glass}
					onValueChange={([value]) => setGlassSize(value)}
				/>
			</div>
		</div>
	);
}
```

## Source

### `components/ui/strands.tsx`

```tsx
import { Renderer, Program, Mesh, Color, Triangle, RenderTarget } from 'ogl';
import { useEffect, useRef, CSSProperties } from 'react';

const MAX_STRANDS = 12;
const MAX_COLORS = 8;

const VERT = `#version 300 es
in vec2 position;
void main() {
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAG = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColors[${MAX_COLORS}];
uniform int uColorCount;
uniform int uStrandCount;
uniform float uSpeed;
uniform float uAmplitude;
uniform float uWaviness;
uniform float uThickness;
uniform float uGlow;
uniform float uTaper;
uniform float uSpread;
uniform float uHueShift;
uniform float uIntensity;
uniform float uOpacity;
uniform float uScale;
uniform float uSaturation;

out vec4 fragColor;

const float PI = 3.14159265;

vec3 spectrum(float t) {
  return 0.5 + 0.5 * cos(2.0 * PI * (t + vec3(0.00, 0.33, 0.67)));
}

vec3 samplePalette(float t) {
  t = fract(t);
  float scaled = t * float(uColorCount);
  int idx = int(floor(scaled));
  float blend = fract(scaled);
  int nextIdx = idx + 1;
  if (nextIdx >= uColorCount) nextIdx = 0;
  return mix(uColors[idx], uColors[nextIdx], blend);
}

vec3 strandColor(float t) {
  if (uColorCount > 0) return samplePalette(t);
  return spectrum(t);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  uv /= max(uScale, 0.0001);

  float e = 0.06 + uIntensity * 0.94;
  float env = pow(max(cos(uv.x * PI * 1.3), 0.0), uTaper);

  vec3 col = vec3(0.0);

  for (int i = 0; i < ${MAX_STRANDS}; i++) {
    if (i >= uStrandCount) break;

    float fi = float(i);
    float ph = fi * 1.7 * uSpread;
    float freq = (2.0 + fi * 0.35) * uWaviness;
    float spd = 1.4 + fi * 1.2;

    float tt = uTime * uSpeed;
    float w = sin(uv.x * freq + tt * spd + ph) * 0.60
            + sin(uv.x * freq * 1.1 - tt * spd * 0.7 + ph * 1.7) * 0.40;

    float amp = (0.1 + 0.02 * e) * env * uAmplitude;
    float y = w * amp;

    float d = abs(uv.y - y);
    float thick = (0.001 + 0.05 * e) * (0.35 + env) * uThickness;
    float g = thick / (d + thick * 0.45);
    g = g * g;

    float h = fi / float(uStrandCount) + uv.x * 0.30 + uTime * 0.04 + uHueShift;
    col += strandColor(h) * g * env;
  }

  col *= 0.45 + 0.7 * e;
  col = 1.0 - exp(-col * uGlow);

  float gray = dot(col, vec3(0.2126, 0.7152, 0.0722));
  col = max(mix(vec3(gray), col, uSaturation), 0.0);

  float lum = max(max(col.r, col.g), col.b);
  float alpha = clamp(lum, 0.0, 1.0) * uOpacity;

  fragColor = vec4(col * uOpacity, alpha);
}
`;

const GLASS_FRAG = `#version 300 es
precision highp float;

uniform sampler2D uScene;
uniform vec2 uResolution;
uniform float uRadius;
uniform float uRefraction;
uniform float uDispersion;

out vec4 fragColor;

vec2 toUv(vec2 p) {
  return p * (uResolution.y / uResolution) + 0.5;
}

void main() {
  vec2 p = (gl_FragCoord.xy - 0.5 * uResolution) / uResolution.y;
  float d = length(p);
  float r = uRadius;

  float edge = fwidth(d) * 1.5;
  float mask = 1.0 - smoothstep(r - edge, r + edge, d);
  if (mask <= 0.0) {
    fragColor = vec4(0.0);
    return;
  }

  // sphere height: 0 at the rim, 1 at the center
  float z = sqrt(max(r * r - d * d, 0.0)) / r;
  float nd = d / r; // 0 at the center, 1 at the rim

  // refraction is confined to a narrow band near the rim; the rest stays undistorted
  vec2 dir = d > 0.0 ? p / d : vec2(0.0);
  float lens = smoothstep(0.85, 1.0, nd) * pow(nd, 6.0);
  vec2 offset = -dir * lens * uRefraction * 0.15;
  vec2 disp = -dir * lens * uDispersion * 0.012;

  vec3 light;
  light.r = texture(uScene, toUv(p + offset - disp)).r;
  light.g = texture(uScene, toUv(p + offset)).g;
  light.b = texture(uScene, toUv(p + offset + disp)).b;

  // neutral fresnel rim (no color tint so the glass stays clear)
  float fres = pow(1.0 - z, 3.0);
  vec3 rim = vec3(1.0) * fres * 0.18;

  // specular highlight from the upper-left
  vec2 lightDir = normalize(vec2(-0.55, 0.6));
  float spec = pow(max(dot(p / max(r, 1e-4), lightDir), 0.0), 6.0);
  spec *= smoothstep(r, r * 0.55, d);

  vec3 emissive = light + rim + vec3(spec) * 0.4;
  float emissiveA = clamp(max(max(emissive.r, emissive.g), emissive.b), 0.0, 1.0);

  // almost clear glass body: only a faint neutral darkening, mostly near the rim
  float bodyA = 0.05 + fres * 0.05;

  // composite emissive light over the clear body (premultiplied)
  float outA = emissiveA + bodyA * (1.0 - emissiveA);
  vec3 outRGB = emissive;

  outRGB *= mask;
  outA *= mask;

  fragColor = vec4(outRGB, outA);
}
`;

export interface StrandsProps {
    colors?: string[];
    count?: number;
    speed?: number;
    amplitude?: number;
    waviness?: number;
    thickness?: number;
    glow?: number;
    taper?: number;
    spread?: number;
    hueShift?: number;
    intensity?: number;
    saturation?: number;
    opacity?: number;
    scale?: number;
    glass?: boolean;
    refraction?: number;
    dispersion?: number;
    glassSize?: number;
    className?: string;
    style?: CSSProperties;
}

const buildPalette = (colors: string[]): number[][] => {
    const filled = colors && colors.length ? colors : ['#ffffff'];
    const padded: number[][] = [];
    for (let i = 0; i < MAX_COLORS; i++) {
        const hex = filled[i] ?? filled[filled.length - 1];
        const c = new Color(hex);
        padded.push([c.r, c.g, c.b]);
    }
    return padded;
};

export default function Strands({
    colors = ['#FF4242', '#7C3AED', '#06B6D4', '#EAB308'],
    count = 3,
    speed = 0.5,
    amplitude = 1,
    waviness = 1,
    thickness = 0.7,
    glow = 2.6,
    taper = 3,
    spread = 1,
    hueShift = 0,
    intensity = 0.6,
    saturation = 1.5,
    opacity = 1,
    scale = 1.5,
    glass = false,
    refraction = 1,
    dispersion = 1,
    glassSize = 1,
    className = '',
    style
}: StrandsProps) {
    const propsRef = useRef<Required<Omit<StrandsProps, 'className' | 'style'>>>({
        colors,
        count,
        speed,
        amplitude,
        waviness,
        thickness,
        glow,
        taper,
        spread,
        hueShift,
        intensity,
        saturation,
        opacity,
        scale,
        glass,
        refraction,
        dispersion,
        glassSize
    });
    propsRef.current = {
        colors,
        count,
        speed,
        amplitude,
        waviness,
        thickness,
        glow,
        taper,
        spread,
        hueShift,
        intensity,
        saturation,
        opacity,
        scale,
        glass,
        refraction,
        dispersion,
        glassSize
    };

    const ctnDom = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctn = ctnDom.current;
        if (!ctn) return;

        const renderer = new Renderer({
            alpha: true,
            premultipliedAlpha: true,
            antialias: true
        });
        const gl = renderer.gl;
        gl.clearColor(0, 0, 0, 0);
        gl.enable(gl.BLEND);
        gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
        gl.canvas.style.backgroundColor = 'transparent';

        const geometry = new Triangle(gl);
        if (geometry.attributes.uv) {
            delete geometry.attributes.uv;
        }

        const program = new Program(gl, {
            vertex: VERT,
            fragment: FRAG,
            uniforms: {
                uTime: { value: 0 },
                uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
                uColors: { value: buildPalette(propsRef.current.colors) },
                uColorCount: { value: Math.min(propsRef.current.colors.length, MAX_COLORS) },
                uStrandCount: { value: Math.min(propsRef.current.count, MAX_STRANDS) },
                uSpeed: { value: speed },
                uAmplitude: { value: amplitude },
                uWaviness: { value: waviness },
                uThickness: { value: thickness },
                uGlow: { value: glow },
                uTaper: { value: taper },
                uSpread: { value: spread },
                uHueShift: { value: hueShift },
                uIntensity: { value: intensity },
                uOpacity: { value: opacity },
                uScale: { value: scale },
                uSaturation: { value: saturation }
            }
        });

        const mesh = new Mesh(gl, { geometry, program });

        const renderTarget = new RenderTarget(gl, {
            width: ctn.offsetWidth,
            height: ctn.offsetHeight
        });

        const glassProgram = new Program(gl, {
            vertex: VERT,
            fragment: GLASS_FRAG,
            uniforms: {
                uScene: { value: renderTarget.texture },
                uResolution: { value: [ctn.offsetWidth, ctn.offsetHeight] },
                uRadius: { value: 0.46 * glassSize },
                uRefraction: { value: refraction },
                uDispersion: { value: dispersion }
            }
        });
        const glassMesh = new Mesh(gl, { geometry, program: glassProgram });

        ctn.appendChild(gl.canvas);

        function resize() {
            if (!ctn) return;
            const width = ctn.offsetWidth;
            const height = ctn.offsetHeight;
            renderer.setSize(width, height);
            program.uniforms.uResolution.value = [width, height];
            renderTarget.setSize(width, height);
            glassProgram.uniforms.uResolution.value = [width, height];
        }
        window.addEventListener('resize', resize);
        resize();

        let animateId = 0;
        const update = (t: number) => {
            animateId = requestAnimationFrame(update);
            const current = propsRef.current;
            program.uniforms.uTime.value = t * 0.001;
            program.uniforms.uColors.value = buildPalette(current.colors);
            program.uniforms.uColorCount.value = Math.min(current.colors.length, MAX_COLORS);
            program.uniforms.uStrandCount.value = Math.min(Math.max(Math.round(current.count), 1), MAX_STRANDS);
            program.uniforms.uSpeed.value = current.speed;
            program.uniforms.uAmplitude.value = current.amplitude;
            program.uniforms.uWaviness.value = current.waviness;
            program.uniforms.uThickness.value = current.thickness;
            program.uniforms.uGlow.value = current.glow;
            program.uniforms.uTaper.value = current.taper;
            program.uniforms.uSpread.value = current.spread;
            program.uniforms.uHueShift.value = current.hueShift;
            program.uniforms.uIntensity.value = current.intensity;
            program.uniforms.uOpacity.value = current.opacity;
            program.uniforms.uScale.value = current.scale;
            program.uniforms.uSaturation.value = current.saturation;

            if (current.glass) {
                renderer.render({ scene: mesh, target: renderTarget });
                glassProgram.uniforms.uScene.value = renderTarget.texture;
                glassProgram.uniforms.uRefraction.value = current.refraction;
                glassProgram.uniforms.uDispersion.value = current.dispersion;
                glassProgram.uniforms.uRadius.value = 0.46 * current.glassSize;
                renderer.render({ scene: glassMesh });
            } else {
                renderer.render({ scene: mesh });
            }
        };
        animateId = requestAnimationFrame(update);

        return () => {
            cancelAnimationFrame(animateId);
            window.removeEventListener('resize', resize);
            if (ctn && gl.canvas.parentNode === ctn) {
                ctn.removeChild(gl.canvas);
            }
            gl.getExtension('WEBGL_lose_context')?.loseContext();
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return <div ref={ctnDom} className={`relative w-full h-full bg-transparent ${className}`} style={style} />;
}
```
