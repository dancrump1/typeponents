# Particle Background

- Categories: Backgrounds
- Tags: canvas, autoplay
- Import: `@/components/ui/particle-background`

## Install

```bash
npx shadcn@latest add https://components.drivedev.net/r/particle-background.json
```

This rewrites imports to match the target project's `components.json` aliases, so `cn` and any hooks land in the right place automatically.

## Dependencies

- `framer-motion`
- `lucide-react`

## Usage

```tsx
"use client";
import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import ParticleBackground from "./component";
import { Button } from "@/components/ui/button";

const Usage = () => {
    return (
        <section className="p-6 rounded-2xl relative overflow-hidden min-h-[90vh] flex items-center">
            <ParticleBackground />
            <div className="absolute inset-0 bg-gradient-radial from-gray-800/50 to-transparent opacity-30"></div>
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid gap-12 lg:grid-cols-2 items-center">
                    <motion.div
                        className="space-y-6"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <motion.h1
                            className="text-5xl font-bold tracking-tight sm:text-6xl md:text-7xl"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                        >
                            <motion.span
                                className="text-amber-500 inline-block"
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.7 }}
                            >
                                Chiloane
                            </motion.span>{" "}
                            Holdings
                        </motion.h1>
                        <motion.p
                            className="text-xl md:text-2xl text-gray-300"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.9 }}
                        >
                            Empowering the Digital, Financial & Creative Economy of Africa
                        </motion.p>
                        <motion.div
                            className="flex flex-col sm:flex-row gap-4 pt-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 1.1 }}
                        >
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button className="bg-amber-500 hover:bg-amber-600 text-black relative overflow-hidden group">
                                    <span className="relative z-10">Explore Our Divisions</span>
                                    <span className="absolute inset-0 bg-linear-to-r from-amber-600 to-amber-400 opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110"></span>
                                </Button>
                            </motion.div>
                            <motion.div
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <Button
                                    variant="outline"
                                    className="border-amber-500 text-amber-500 hover:bg-amber-500/10 group"
                                >
                                    <span>Contact Us</span>
                                    <motion.div
                                        initial={{ x: 0 }}
                                        whileHover={{ x: 5 }}
                                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                                    >
                                        <ArrowRight className="ml-2 h-4 w-4 group-hover:text-amber-400" />
                                    </motion.div>
                                </Button>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        className="flex justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, delay: 0.5, type: "spring" }}
                    >
                        <div className="relative h-[350px] w-[350px] md:h-[450px] md:w-[450px]">
                            <div className="absolute inset-0 rounded-full bg-linear-to-br from-amber-500/20 to-amber-700/10 backdrop-blur-xs flex items-center justify-center animate-pulse-slow"></div>
                            <motion.div
                                className="absolute inset-4 rounded-full bg-linear-to-br from-amber-500/10 to-amber-700/5 backdrop-blur-md"
                                animate={{
                                    boxShadow: [
                                        "0 0 20px 0px rgba(245, 158, 11, 0.3)",
                                        "0 0 60px 10px rgba(245, 158, 11, 0.2)",
                                        "0 0 20px 0px rgba(245, 158, 11, 0.3)",
                                    ],
                                }}
                                transition={{
                                    duration: 4,
                                    repeat: Number.POSITIVE_INFINITY,
                                    repeatType: "reverse",
                                }}
                            ></motion.div>
                            <motion.div
                                className="absolute inset-0 flex items-center justify-center"
                                initial={{ opacity: 0, scale: 0.5 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.5, delay: 0.8 }}
                            >
                                <div className="relative w-48 h-48">
                                    {/* Abstract Logo */}
                                    <svg viewBox="0 0 200 200" className="w-full h-full">
                                        <motion.path
                                            d="M100,20 L160,50 L160,150 L100,180 L40,150 L40,50 Z"
                                            fill="none"
                                            stroke="rgba(245, 158, 11, 0.8)"
                                            strokeWidth="2"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 2, delay: 1 }}
                                        />
                                        <motion.path
                                            d="M100,40 L140,60 L140,140 L100,160 L60,140 L60,60 Z"
                                            fill="none"
                                            stroke="rgba(245, 158, 11, 0.6)"
                                            strokeWidth="2"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 2, delay: 1.3 }}
                                        />
                                        <motion.path
                                            d="M100,60 L120,70 L120,130 L100,140 L80,130 L80,70 Z"
                                            fill="rgba(245, 158, 11, 0.3)"
                                            initial={{ scale: 0, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            transition={{ duration: 1, delay: 1.6 }}
                                        />
                                        <motion.circle
                                            cx="100"
                                            cy="100"
                                            r="10"
                                            fill="rgba(245, 158, 11, 1)"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            transition={{ duration: 0.5, delay: 2 }}
                                        />
                                        <motion.path
                                            d="M40,50 L100,100 L160,50"
                                            fill="none"
                                            stroke="rgba(245, 158, 11, 0.4)"
                                            strokeWidth="1"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 1.5, delay: 2.2 }}
                                        />
                                        <motion.path
                                            d="M40,150 L100,100 L160,150"
                                            fill="none"
                                            stroke="rgba(245, 158, 11, 0.4)"
                                            strokeWidth="1"
                                            initial={{ pathLength: 0, opacity: 0 }}
                                            animate={{ pathLength: 1, opacity: 1 }}
                                            transition={{ duration: 1.5, delay: 2.4 }}
                                        />
                                    </svg>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-20 bg-linear-to-t from-[#121212] to-transparent"></div>
        </section>
    );
};

export default Usage;
```

## Source

### `components/ui/particle-background.tsx`

```tsx
"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas dimensions
        const setCanvasDimensions = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };

        setCanvasDimensions();
        window.addEventListener("resize", setCanvasDimensions);

        // Particle class
        class Particle {
            x: number;
            y: number;
            size: number;
            speedX: number;
            speedY: number;
            color: string;

            constructor() {
                this.x = Math.random() * (canvas?.width ?? window.innerWidth);
                this.y = Math.random() * (canvas?.height ?? window.innerHeight);
                this.size = Math.random() * 3 + 0.5;
                this.speedX = Math.random() * 0.5 - 0.25;
                this.speedY = Math.random() * 0.5 - 0.25;
                this.color = `rgba(245, 158, 11, ${Math.random() * 0.5})`;
            }

            update() {
                this.x += this.speedX;
                this.y += this.speedY;

                if (canvas) {
                    if (this.x > canvas.width) this.x = 0;
                    else if (this.x < 0) this.x = canvas.width;

                    if (this.y > canvas.height) this.y = 0;
                    else if (this.y < 0) this.y = canvas.height;
                }
            }

            draw() {
                if (!ctx) return;
                ctx.fillStyle = this.color;
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        // Create particles
        const particleCount = Math.min(
            100,
            Math.floor((window.innerWidth * window.innerHeight) / 10000),
        );
        const particles: Particle[] = [];

        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle());
        }

        // Animation loop
        const animate = () => {
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Draw connections
            ctx.strokeStyle = "rgba(245, 158, 11, 0.05)";
            ctx.lineWidth = 0.5;

            for (let i = 0; i < particles.length; i++) {
                for (let j = i; j < particles.length; j++) {
                    const dx = particles[i].x - particles[j].x;
                    const dy = particles[i].y - particles[j].y;
                    const distance = Math.sqrt(dx * dx + dy * dy);

                    if (distance < 100) {
                        ctx.beginPath();
                        ctx.moveTo(particles[i].x, particles[i].y);
                        ctx.lineTo(particles[j].x, particles[j].y);
                        ctx.stroke();
                    }
                }
            }

            // Update and draw particles
            particles.forEach((particle) => {
                particle.update();
                particle.draw();
            });

            requestAnimationFrame(animate);
        };

        animate();

        return () => {
            window.removeEventListener("resize", setCanvasDimensions);
        };
    }, []);

    return (
        <motion.canvas
            ref={canvasRef}
            className="absolute inset-0 z-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
        />
    );
};

export default ParticleBackground;
```
