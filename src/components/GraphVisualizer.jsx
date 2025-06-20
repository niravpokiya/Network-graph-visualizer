import { useEffect, useRef } from "react";
import * as d3 from "d3";

const GraphVisualizer = ({ nodesData, linksData, isDirected, isWeighted }) => {
  const svgRef = useRef();

  useEffect(() => {
    const width = 800;
    const height = 600;
    const radius = window.innerWidth < 768 ? 25 : 15;
    const isMobile = window.innerWidth < 768;
    const fontSize = isMobile ? "20px" : "12px";

    const svg = d3
      .select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet")
      .classed(
        "w-full h-200 bg-white dark:bg-gray-800 rounded-2xl shadow",
        true
      );

    svg.selectAll("*").remove(); // 🧹 Clear before re-render

    // 🏹 Add arrow marker (used conditionally)
    svg
      .append("defs")
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

    const simulation = d3
      .forceSimulation(nodesData)
      .force(
        "link",
        d3
          .forceLink(linksData)
          .id((d) => d.id)
          .distance(100)
      )
      .force("charge", d3.forceManyBody().strength(-200))
      .force("center", d3.forceCenter(width / 2, height / 2))
      .force("x", d3.forceX(width / 2).strength(0.05))
      .force("y", d3.forceY(height / 2).strength(0.05));

    const linkGroup = svg.append("g").attr("stroke-width", 2);

    const link = linkGroup
      .selectAll("line")
      .data(linksData)
      .join("line")
      .attr("stroke", (d) => d.color || "#999")
      .attr("marker-end", (d) =>
        isDirected || d.arrow ? "url(#arrow)" : null
      );

    let weightLabels = null;
    let observer = null;

    if (isWeighted) {
      const labelGroup = svg.append("g");
      weightLabels = labelGroup
        .selectAll("text")
        .data(linksData)
        .join("text")
        .attr("font-size", "12px")
        .attr("text-anchor", "middle")
        .text((d) => d.weight);

      const setWeightLabelColor = () => {
        const isDark = document.documentElement.classList.contains("dark");
        weightLabels.attr("fill", isDark ? "white" : "black");
      };

      setWeightLabelColor();

      observer = new MutationObserver(setWeightLabelColor);
      observer.observe(document.documentElement, {
        attributes: true,
        attributeFilter: ["class"],
      });
    }

    const nodeGroup = svg
      .selectAll("g.node")
      .data(nodesData)
      .join("g")
      .attr("class", "node")
      .call(drag(simulation));

    nodeGroup
      .append("circle")
      .attr("r", radius)
      .attr("fill", (d) => d.color || "#4f46e5");

    nodeGroup
      .append("text")
      .text((d) => d.id)
      .attr("text-anchor", "middle")
      .attr("dy", "0.35em")
      .attr("fill", "#fff")
      .attr("font-size", fontSize)
      .attr("pointer-events", "none");

    simulation.on("tick", () => {
      link
        .attr("x1", (d) => {
          const src = d.setDirection?.source || d.source;
          const tgt = d.setDirection?.target || d.target;
          const dx = tgt.x - src.x;
          const dy = tgt.y - src.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          return src.x + dx * (radius / dist);
        })
        .attr("y1", (d) => {
          const src = d.setDirection?.source || d.source;
          const tgt = d.setDirection?.target || d.target;
          const dx = tgt.x - src.x;
          const dy = tgt.y - src.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          return src.y + dy * (radius / dist);
        })
        .attr("x2", (d) => {
          const src = d.setDirection?.source || d.source;
          const tgt = d.setDirection?.target || d.target;
          const dx = src.x - tgt.x;
          const dy = src.y - tgt.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          return tgt.x + dx * (radius / dist);
        })
        .attr("y2", (d) => {
          const src = d.setDirection?.source || d.source;
          const tgt = d.setDirection?.target || d.target;
          const dx = src.x - tgt.x;
          const dy = src.y - tgt.y;
          const dist = Math.sqrt(dx * dx + dy * dy) || 1;
          return tgt.y + dy * (radius / dist);
        });

      if (weightLabels) {
        weightLabels
          .attr("x", (d) => (d.source.x + d.target.x) / 2)
          .attr("y", (d) => (d.source.y + d.target.y) / 2 - 8);
      }

      nodeGroup.attr("transform", (d) => {
        d.x = Math.max(radius, Math.min(width - radius, d.x ?? 0));
        d.y = Math.max(radius, Math.min(height - radius, d.y ?? 0));
        return `translate(${d.x},${d.y})`;
      });
    });
    
    function drag(simulation) {
      return d3
        .drag()
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

    return () => {
      if (observer) observer.disconnect();
    };
  }, [nodesData, linksData, isDirected, isWeighted]);

  return (
  <>
      <svg ref={svgRef}></svg>
  </>
  );
};

export default GraphVisualizer;