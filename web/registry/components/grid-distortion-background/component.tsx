import { useState, useEffect, useRef } from "react"

const GridDistortion = ({ children }) => {
    const canvasRef = useRef(null)
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
    const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
    const animationRef = useRef(null)

    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current) {
                const canvas = canvasRef.current
                const { width, height } = canvas.getBoundingClientRect()

                const dpr = window.devicePixelRatio || 1
                canvas.width = width * dpr
                canvas.height = height * dpr

                const ctx = canvas.getContext("2d")
                ctx.scale(dpr, dpr)

                setDimensions({ width, height })
            }
        }

        handleResize()
        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [])

    useEffect(() => {
        const handleMouseMove = (e) => {
            if (canvasRef.current) {
                const { left, top } = canvasRef.current.getBoundingClientRect()
                setMousePosition({
                    x: e.clientX - left,
                    y: e.clientY - top,
                })
            }
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    useEffect(() => {
        if (!canvasRef.current || dimensions.width === 0) return

        const canvas = canvasRef.current
        const ctx = canvas.getContext("2d")

        const drawGrid = () => {
            const { width, height } = dimensions

            ctx.clearRect(0, 0, width, height)

            const cellSize = 30
            const rows = Math.ceil(height / cellSize) + 1
            const cols = Math.ceil(width / cellSize) + 1

            const maxDistance = 200
            const maxDisplacement = 20

            ctx.strokeStyle = "rgba(255, 255, 255, 0.2)"
            ctx.lineWidth = 0.5

            const points = []

            for (let y = 0; y < rows; y++) {
                const row = []
                for (let x = 0; x < cols; x++) {
                    const baseX = x * cellSize
                    const baseY = y * cellSize

                    const dx = baseX - mousePosition.x
                    const dy = baseY - mousePosition.y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    let distortionX = 0
                    let distortionY = 0

                    if (distance < maxDistance) {
                        const force = (1 - distance / maxDistance) * maxDisplacement
                        distortionX = (dx / distance) * force || 0
                        distortionY = (dy / distance) * force || 0
                    }

                    row.push({
                        x: baseX + distortionX,
                        y: baseY + distortionY,
                    })
                }
                points.push(row)
            }

            for (let y = 0; y < rows; y++) {
                ctx.beginPath()
                for (let x = 0; x < cols; x++) {
                    const point = points[y][x]
                    if (x === 0) {
                        ctx.moveTo(point.x, point.y)
                    } else {
                        ctx.lineTo(point.x, point.y)
                    }
                }
                ctx.stroke()
            }

            for (let x = 0; x < cols; x++) {
                ctx.beginPath()
                for (let y = 0; y < rows; y++) {
                    const point = points[y][x]
                    if (y === 0) {
                        ctx.moveTo(point.x, point.y)
                    } else {
                        ctx.lineTo(point.x, point.y)
                    }
                }
                ctx.stroke()
            }

            ctx.fillStyle = "rgba(255, 255, 255, 0.4)"
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const point = points[y][x]
                    ctx.beginPath()
                    ctx.arc(point.x, point.y, 1, 0, Math.PI * 2)
                    ctx.fill()
                }
            }

            ctx.beginPath()
            ctx.arc(mousePosition.x, mousePosition.y, 8, 0, Math.PI * 2)

            const gradient = ctx.createRadialGradient(
                mousePosition.x,
                mousePosition.y,
                0,
                mousePosition.x,
                mousePosition.y,
                30,
            )
            gradient.addColorStop(0, "rgba(100, 200, 255, 0.8)")
            gradient.addColorStop(1, "rgba(100, 200, 255, 0)")

            ctx.fillStyle = gradient
            ctx.fill()

            animationRef.current = requestAnimationFrame(drawGrid)
        }

        drawGrid()

        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [dimensions, mousePosition])

    return (
        <div
            className="relative w-full min-h-[500px] flex items-center justify-center flex-col overflow-hidden rounded-high bg-gray-900">

            <canvas ref={canvasRef} className="absolute inset-0 w-full h-full" />

            {children}
        </div>
    )
}

export default GridDistortion;
