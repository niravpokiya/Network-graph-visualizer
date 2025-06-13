import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

function edgeEndpoint(from, to, r = 20) {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const len = Math.sqrt(dx * dx + dy * dy);
  const ratio = r / len;
  return {
    x: from.x + dx * ratio,
    y: from.y + dy * ratio,
  };
}

const GraphVisualizer = ({ nodesData, linksData, isDirected }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 800;
    const height = 600;

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .classed("w-full h-auto bg-white rounded-2xl shadow-md", true);

    svg.selectAll("*").remove(); // Clear previous renders

    if (isDirected) {
      svg.append("defs")
        .append("marker")
        .attr("id", "arrow")
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 20)
        .attr("refY", 0)
        .attr("markerWidth", 6)
        .attr("markerHeight", 6)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", "#999");
    }

    const simulation = d3.forceSimulation(nodesData)
      .force("link", d3.forceLink(linksData).id(d => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 2).strength(0.05));

    const link = svg.selectAll("line")
      .data(linksData)
      .join("line")
      .attr("stroke", "#999")
      .attr("stroke-width", 2)
      .attr("marker-end", isDirected ? "url(#arrow)" : null);

    const nodeGroup = svg.selectAll("g")
      .data(nodesData)
      .join("g")
      .call(drag(simulation));

    const radius = window.innerWidth < 768 ? 25 : 15;

    nodeGroup.append("circle")
      .attr("r", radius)
      .attr("fill", d => d.color || "#4f46e5");

    const isMobile = window.innerWidth < 768;
    const fontSize = isMobile ? "20px" : "12px";

    nodeGroup.append("text")
      .text(d => d.id)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", "#fff")
      .attr("font-size", fontSize)
      .attr("pointer-events", "none");

   simulation.on("tick", () => {
      link
        .attr("x1", d => {
          const sx = d.source.x ?? 0, sy = d.source.y ?? 0;
          const tx = d.target.x ?? 0, ty = d.target.y ?? 0;
          const dx = tx - sx, dy = ty - sy;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          return sx + dx * (radius / dist);
        })
        .attr("y1", d => {
          const sx = d.source.x ?? 0, sy = d.source.y ?? 0;
          const tx = d.target.x ?? 0, ty = d.target.y ?? 0;
          const dx = tx - sx, dy = ty - sy;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          return sy + dy * (radius / dist);
        })
        .attr("x2", d => {
          const sx = d.source.x ?? 0, sy = d.source.y ?? 0;
          const tx = d.target.x ?? 0, ty = d.target.y ?? 0;
          const dx = sx - tx, dy = sy - ty;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          return tx + dx * (radius / dist);
        })
        .attr("y2", d => {
          const sx = d.source.x ?? 0, sy = d.source.y ?? 0;
          const tx = d.target.x ?? 0, ty = d.target.y ?? 0;
          const dx = sx - tx, dy = sy - ty;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          return ty + dy * (radius / dist);
        });

      nodeGroup.attr("transform", d => {
        d.x = Math.max(radius, Math.min(width - radius, d.x ?? 0));
        d.y = Math.max(radius, Math.min(height - radius, d.y ?? 0));
        return `translate(${d.x},${d.y})`;
      });
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
  }, [nodesData, linksData, isDirected]);

  return <svg ref={svgRef}></svg>;
};

export default GraphVisualizer;
