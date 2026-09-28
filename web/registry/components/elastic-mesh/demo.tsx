import ElasticMesh from "./component";

export default function ElasticMeshUsage() {
    return (
        <>
            <div style={{ width: 480, height: 320 }}>
                <ElasticMesh color1="#4F46E5" color2="#0EA5E9" />
            </div>

            <div style={{ width: 480, height: 320 }}>
                <ElasticMesh
                    image="https://picsum.photos/seed/elastic/900/600"
                    interaction="hover"
                    tilt={14}
                    shading={0.5}
                    color1="#5227FF"
                    color2="#B19EEF"
                    showGrid
                    gridDensity={20}
                    gridOpacity={0.28}
                    gridColor="#ffffff"
                    highlight="#ffffff"
                    borderRadius={25}
                    stiffness={0.05}
                    damping={0.2}
                    grabRadius={0.6}
                    pull={0.4}
                    wobble={5}
                    resolution={25}
                    enabled
                />
            </div>
        </>

    )
}