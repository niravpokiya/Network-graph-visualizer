import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
function edgeEndpoint(from, to, r = 20) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ratio = r / len;
  return {
    x: from.x + dx * ratio,
    y: from.y + dy * ratio
  };
}
const GraphVisualizer = ({ nodesData, linksData }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .style("width", "100%")
      .style("height", "auto")
      .style("background", "white");

      
    const simulation = d3.forceSimulation(nodesData)
      .force("link", d3.forceLink(linksData).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2));
      
      const link = svg.selectAll("line")
      .data(linksData)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-width", 2);

    const nodeGroup = svg.selectAll("g")
        .data(nodesData)
        .join("g")
        .call(drag(simulation));
        
    const radius = window.innerWidth < 768 ? 25 : 15;
    nodeGroup.append("circle")
      .attr("r", radius)
      .attr("fill", d => d.color || "#4f46e5"); // <-- dynamic color


    const isMobile = window.innerWidth < 768;
    const radii = isMobile ? 24 : 18;
    const fontSize = isMobile ? "20px" : "12px";
    nodeGroup.append("text")
       .text(d => d.id)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em") // vertical alignment fix
      .attr("fill", "#fff")
      .attr("font-size", fontSize)
      .attr("pointer-events", "none");


    simulation.on("tick", () => {
      link
        .attr("x1", d => {
          const dx = d.target.x - d.source.x;
          const dy = d.target.y - d.source.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const ratio = (dist - radius) / dist;
          return d.source.x + dx * (radius / dist);
        })
        .attr("y1", d => {
          const dx = d.target.x - d.source.x;
          const dy = d.target.y - d.source.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          return d.source.y + dy * (radius / dist);
        })
        .attr("x2", d => {
          const dx = d.source.x - d.target.x;
          const dy = d.source.y - d.target.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          return d.target.x + dx * (radius / dist);
        })
        .attr("y2", d => {
          const dx = d.source.x - d.target.x;
          const dy = d.source.y - d.target.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          return d.target.y + dy * (radius / dist);
        });

      nodeGroup
        .attr("transform", d => `translate(${d.x},${d.y})`);
    });



    function drag(simulation) {
      return d3.drag()
        .on("start", (event, d) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on("drag", (event, d) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on("end", (event, d) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        });
    }

  }, [nodesData, linksData]);

  return <svg ref={svgRef}></svg>;
};

export default GraphVisualizer;
