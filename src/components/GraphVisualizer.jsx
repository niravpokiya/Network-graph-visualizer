import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

const GraphVisualizer = ({ nodesData, linksData, isDirected, isWeighted }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 800;
    const height = 600;
    const radius = window.innerWidth < 768 ? 25 : 15;
    const isMobile = window.innerWidth < 768;
    const fontSize = isMobile ? "20px" : "12px";

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .classed("w-full h-200 bg-white dark:bg-gray-800 rounded-2xl shadow", true);

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

    const linkGroup = svg.append("g").attr("stroke", "#999").attr("stroke-width", 2);

    const link = linkGroup.selectAll("line")
      .data(linksData)
      .join("line")
      .attr("stroke", d => d.inMST ? "#16a34a" : "#999")
      .attr("marker-end", d => isDirected ? "url(#arrow)" : null);

    // Weight labels (if weighted)
    const weightLabels = isWeighted
      ? svg.append("g").selectAll("text")
          .data(linksData)
          .join("text")
          .attr("fill", "#fff")
          .attr("font-size", "12px")
          .attr("text-anchor", "middle")
      : null;

    const nodeGroup = svg.selectAll("g.node")
      .data(nodesData)
      .join("g")
      .attr("class", "node")
      .call(drag(simulation));

    nodeGroup.append("circle")
      .attr("r", radius)
      .attr("fill", d => d.color || "#4f46e5");

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
          const { x: sx, y: sy } = d.source;
          const { x: tx, y: ty } = d.target;
          const dx = tx - sx, dy = ty - sy;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          return sx + dx * (radius / dist);
        })
        .attr("y1", d => {
          const { x: sx, y: sy } = d.source;
          const { x: tx, y: ty } = d.target;
          const dx = tx - sx, dy = ty - sy;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          return sy + dy * (radius / dist);
        })
        .attr("x2", d => {
          const { x: tx, y: ty } = d.target;
          const { x: sx, y: sy } = d.source;
          const dx = sx - tx, dy = sy - ty;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          return tx + dx * (radius / dist);
        })
        .attr("y2", d => {
          const { x: tx, y: ty } = d.target;
          const { x: sx, y: sy } = d.source;
          const dx = sx - tx, dy = sy - ty;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          return ty + dy * (radius / dist);
        });

      // Weight positioning
      if (weightLabels) {
        weightLabels
          .attr("x", d => (d.source.x + d.target.x) / 2)
          .attr("y", d => (d.source.y + d.target.y) / 2)
          .text(d => d.weight);
      }

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
  }, [nodesData, linksData, isDirected, isWeighted]);

  return <svg ref={svgRef}></svg>;
};
 
export default GraphVisualizer;
