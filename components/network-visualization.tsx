"use client"

import { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Network } from "lucide-react"
import * as d3 from "d3"

type Node = {
  id: string
  group: number
  label: string
  icon?: string
}

type Link = {
  source: string
  target: string
  value: number
}

type NetworkData = {
  nodes: Node[]
  links: Link[]
}

const networkData: NetworkData = {
  nodes: [
    { id: "firewall", group: 1, label: "Firewall", icon: "🛡️" },
    { id: "router", group: 1, label: "Router", icon: "🌐" },
    { id: "switch", group: 1, label: "Switch", icon: "🔄" },
    { id: "server1", group: 2, label: "Web Server", icon: "🖥️" },
    { id: "server2", group: 2, label: "Database", icon: "💾" },
    { id: "server3", group: 2, label: "Email Server", icon: "📧" },
    { id: "client1", group: 3, label: "Workstation 1", icon: "💻" },
    { id: "client2", group: 3, label: "Workstation 2", icon: "💻" },
    { id: "client3", group: 3, label: "Workstation 3", icon: "💻" },
    { id: "mobile1", group: 4, label: "Mobile Device", icon: "📱" },
    { id: "iot1", group: 5, label: "IoT Device", icon: "🔌" },
    { id: "attacker", group: 6, label: "Threat Actor", icon: "⚠️" },
  ],
  links: [
    { source: "router", target: "firewall", value: 5 },
    { source: "firewall", target: "switch", value: 5 },
    { source: "switch", target: "server1", value: 3 },
    { source: "switch", target: "server2", value: 3 },
    { source: "switch", target: "server3", value: 3 },
    { source: "switch", target: "client1", value: 2 },
    { source: "switch", target: "client2", value: 2 },
    { source: "switch", target: "client3", value: 2 },
    { source: "router", target: "mobile1", value: 1 },
    { source: "router", target: "iot1", value: 1 },
    { source: "attacker", target: "firewall", value: 1 },
    { source: "attacker", target: "iot1", value: 1 },
  ],
}

export default function NetworkVisualization() {
  const ref = useRef(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.3 })

  useEffect(() => {
    if (!isInView || !svgRef.current) return

    const svg = d3.select(svgRef.current)
    const width = svgRef.current.clientWidth
    const height = svgRef.current.clientHeight

    // Clear previous visualization
    svg.selectAll("*").remove()

    // Create a force simulation
    const simulation = d3
      .forceSimulation(networkData.nodes as d3.SimulationNodeDatum[])
      .force(
        "link",
        d3
          .forceLink(networkData.links)
          .id((d: any) => d.id)
          .distance((d: any) => 100 / d.value),
      )
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("collision", d3.forceCollide().radius(50))

    // Create a group for links
    const link = svg
      .append("g")
      .attr("stroke", "rgba(var(--primary), 0.3)")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(networkData.links)
      .join("line")
      .attr("stroke-width", (d) => Math.sqrt(d.value))

    // Create a group for nodes
    const node = svg
      .append("g")
      .selectAll(".node")
      .data(networkData.nodes)
      .join("g")
      .attr("class", "node")
      .call(d3.drag<SVGGElement, Node>().on("start", dragstarted).on("drag", dragged).on("end", dragended) as any)

    // Add circles to nodes
    node
      .append("circle")
      .attr("r", 20)
      .attr("fill", (d) => {
        switch (d.group) {
          case 1:
            return "rgba(var(--primary), 0.7)"
          case 2:
            return "rgba(0, 200, 100, 0.7)"
          case 3:
            return "rgba(100, 150, 255, 0.7)"
          case 4:
            return "rgba(255, 150, 50, 0.7)"
          case 5:
            return "rgba(200, 100, 250, 0.7)"
          case 6:
            return "rgba(255, 50, 50, 0.7)"
          default:
            return "rgba(150, 150, 150, 0.7)"
        }
      })
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)

    // Add icons to nodes
    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dominant-baseline", "central")
      .attr("font-size", "16px")
      .text((d) => d.icon || "")

    // Add labels to nodes
    node
      .append("text")
      .attr("text-anchor", "middle")
      .attr("dy", 35)
      .attr("font-size", "10px")
      .attr("fill", "var(--foreground)")
      .text((d) => d.label)

    // Add title for tooltip
    node.append("title").text((d) => d.label)

    // Update positions on simulation tick
    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y)

      node.attr("transform", (d: any) => `translate(${d.x},${d.y})`)
    })

    // Drag functions
    function dragstarted(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart()
      d.fx = d.x
      d.fy = d.y
    }

    function dragged(event: any, d: any) {
      d.fx = event.x
      d.fy = event.y
    }

    function dragended(event: any, d: any) {
      if (!event.active) simulation.alphaTarget(0)
      d.fx = null
      d.fy = null
    }

    // Cleanup
    return () => {
      simulation.stop()
    }
  }, [isInView])

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-muted/10 to-background" />

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="max-w-5xl mx-auto"
        >
          <div className="flex flex-col items-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-primary/10 p-2 rounded-full mb-4"
            >
              <Network className="h-6 w-6 text-primary" />
            </motion.div>
            <h2 className="text-3xl md:text-4xl font-bold text-center">
              Network <span className="text-primary">Topology</span> Visualization
            </h2>
            <div className="w-20 h-1 bg-primary/30 rounded-full mt-4 mb-8" />
          </div>

          <Card className="border-primary/20 shadow-lg overflow-hidden">
            <CardHeader>
              <CardTitle className="text-xl">Interactive Network Diagram</CardTitle>
            </CardHeader>
            <CardContent className="p-0">
              <div className="h-[500px] w-full">
                <svg ref={svgRef} width="100%" height="100%" />
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>
              This interactive network diagram visualizes a typical network infrastructure with potential attack
              vectors. Drag nodes to explore the relationships between different network components.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
