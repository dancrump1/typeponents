"use client";

import React, { useEffect, useRef, useState } from "react";

// Credit:
// https://pro.lightswind.com/components/fire-shader

const vertexShaderSource = `
  attribute vec2 a_position;
  varying vec2 vUv;
  void main() {
    vUv = a_position * 0.5 + 0.5;
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;
  uniform vec2 iResolution;
  uniform float iTime;
  uniform vec2 iMouse;
  uniform float u_timescale;
  uniform float u_scaleX;
  uniform float u_scaleY;
  
  // Simplex 2D noise
  vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
  vec3 permute(vec3 x) { return mod289(((x*34.0)+1.0)*x); }
  float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod289(i);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 )) + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);
    m = m*m;
    m = m*m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x  * x0.x  + h.x  * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
  }

  // Fractal Brownian Motion
  float fbm(vec2 uv) {
      float f = 0.0;
      float w = 0.5;
      vec2 p = uv;
      for (int i = 0; i < 5; i++) {
          f += w * snoise(p);
          p *= 2.0;
          w *= 0.5;
      }
      return f * 0.5 + 0.5;
  }

  void main() {
      vec3 col = vec3(0.0, 0.0, 0.0);
      vec2 uv = gl_FragCoord.xy / iResolution.xy;
      
      // Interactive mouse offset for fluid effect
      vec2 mouse = iMouse.xy / iResolution.xy;
      
      // Add slight offset so normalize does not fail on distance point 0
      vec2 safeMouse = mouse + vec2(0.0001, 0.0001);
      
      // Calculate distance to mouse for an interactive push/pull effect
      float distToMouse = distance(uv, safeMouse);
      
      // Expand influence radius for much more interactivity
      float mouseInfluence = smoothstep(0.4, 0.0, distToMouse); 
      
      // Create a wave pushing/pulling to the mouse
      vec2 dir = normalize(uv - safeMouse);
      // Instead of pushing, pull it to follow the mouse like a vortex
      vec2 mouseOffset = dir * mouseInfluence * -0.25; 
      
      vec2 st = uv - mouseOffset;

      // Original texture logic replaced with fbm for better seamless look without loading assets
      float dist = fbm(vec2(st.x * u_scaleX - iTime * 1.1 * u_timescale, st.y * u_scaleY - iTime * 1.8 * u_timescale) * 3.0);
      float tex = fbm(vec2(st.x * u_scaleX + dist * 0.2, st.y * u_scaleY - iTime * 1.5 * u_timescale) * 3.0);
      
      tex += st.y * 0.5;
      float fire = pow(1.0 - tex, 2.3);
      fire -= (1.0 - (abs(st.x - 0.5) * 2.0)) * 0.5;
      
      fire = max(0.0, fire); // Prevent negative fire colors
      
      float fireIntensity = fire * 5.0;
      col += fireIntensity * mix(vec3(0.0, 0.2, 1.0), vec3(1.0, 0.21, 0.0), st.x);
      
      // Use max color component as alpha for a clean transparent background
      float alpha = max(col.r, max(col.g, col.b));
      alpha = smoothstep(0.01, 0.5, alpha); // Sharpen transparency cutoff
      
      // Default WebGL requires pre-multiplied alpha
      gl_FragColor = vec4(col * alpha, alpha);
  }
`;

interface FireShaderProps {
    className?: string;
    timescale?: number;
    scaleX?: number;
    scaleY?: number;
}

export default function FireShader({
    className,
    timescale = 0.5,
    scaleX = 1.5,
    scaleY = 0.3
}: FireShaderProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl", { alpha: true, antialias: false });
        if (!gl) {
            console.error("WebGL not supported");
            return;
        }

        const compileShader = (type: number, source: string) => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error("Shader compile err:", gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const vertexShader = compileShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragmentShaderSource);

        if (!vertexShader || !fragmentShader) return;

        const program = gl.createProgram();
        if (!program) return;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error("Program link err:", gl.getProgramInfoLog(program));
            return;
        }

        gl.useProgram(program);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]);
        gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

        const positionLocation = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(positionLocation);
        gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

        const iResolutionLocation = gl.getUniformLocation(program, "iResolution");
        const iTimeLocation = gl.getUniformLocation(program, "iTime");
        const iMouseLocation = gl.getUniformLocation(program, "iMouse");

        // Scale settings
        const timescaleLocation = gl.getUniformLocation(program, "u_timescale");
        const scaleXLocation = gl.getUniformLocation(program, "u_scaleX");
        const scaleYLocation = gl.getUniformLocation(program, "u_scaleY");

        const startTime = performance.now();
        let animationFrameId: number;

        const render = () => {
            // Handle resizing
            const displayWidth = canvas.clientWidth;
            const displayHeight = canvas.clientHeight;
            if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
                canvas.width = displayWidth;
                canvas.height = displayHeight;
                gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            }

            gl.clearColor(0.0, 0.0, 0.0, 0.0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            // Smooth mouse interpolation overlaying direct mouse movements
            mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.1;
            mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.1;

            const currentTime = (performance.now() - startTime) / 1000;

            gl.uniform2f(iResolutionLocation, gl.canvas.width, gl.canvas.height);
            gl.uniform1f(iTimeLocation, currentTime);
            gl.uniform2f(iMouseLocation, mouseRef.current.x, mouseRef.current.y);
            gl.uniform1f(timescaleLocation, timescale);
            gl.uniform1f(scaleXLocation, scaleX);
            gl.uniform1f(scaleYLocation, scaleY);

            gl.drawArrays(gl.TRIANGLES, 0, 6);
            animationFrameId = requestAnimationFrame(render);
        };

        render();

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouseRef.current.targetX = e.clientX - rect.left;
            // WebGL y comes from bottom so we invert
            mouseRef.current.targetY = canvas.height - (e.clientY - rect.top);
        };

        const handleMouseLeave = () => {
            mouseRef.current.targetX = canvas.width / 2;
            mouseRef.current.targetY = canvas.height / 2;
        };

        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationFrameId);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
            gl.deleteProgram(program);
            gl.deleteShader(vertexShader);
            gl.deleteShader(fragmentShader);
            gl.deleteBuffer(positionBuffer);
        };
    }, [timescale, scaleX, scaleY]);

    return (
        <canvas
            ref={canvasRef}
            className={`w-full h-full block ${className || ""}`}
        />
    );
}
