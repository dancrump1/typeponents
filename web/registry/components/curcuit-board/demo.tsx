import { CircuitBoard } from "./component"
import { Cpu, HardDrive, Database, Cloud, Server, Shield, } from "lucide-react"

export default function Usage() {
    return (
        <div>

            <CircuitBoard
                nodes={[
                    { id: "cpu", x: 100, y: 100, label: "CPU", icon: <Cpu className="w-4 h-4" /> },
                    { id: "ram", x: 250, y: 100, label: "RAM", icon: <HardDrive className="w-4 h-4" /> },
                    { id: "storage", x: 400, y: 100, label: "Storage", icon: <Database className="w-4 h-4" /> },
                ]}
                connections={[
                    { from: "cpu", to: "ram", bidirectional: true },
                    { from: "ram", to: "storage", bidirectional: true },
                ]}
                width={500}
                height={200}
                showGrid={false}
            />
            <CircuitBoard
                nodes={[
                    { id: "start", x: 80, y: 150, label: "Cloud", icon: <Cloud className="w-4 h-4" /> },
                    { id: "process", x: 250, y: 80, label: "Server", icon: <Server className="w-4 h-4" /> },
                    { id: "validate", x: 250, y: 220, label: "Validate", icon: <Shield className="w-4 h-4" /> },
                    { id: "end", x: 420, y: 150, label: "Database", icon: <Database className="w-4 h-4" /> },
                ]}
                connections={[
                    { from: "start", to: "process", animated: true },
                    { from: "start", to: "validate", animated: true },
                    { from: "process", to: "end", animated: true },
                    { from: "validate", to: "end", animated: true },
                ]}
                width={500}
                height={300}
            />
        </div>
    )
}