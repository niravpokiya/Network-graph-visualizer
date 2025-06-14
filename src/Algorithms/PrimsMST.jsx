export async function runPrimsAlgorithm(nodes, setNodesData, links, setLinksData, adjList, speedrun) {
  const sleep = (ms) => new Promise((res) => setTimeout(res, ms));

  const n = nodes.length;
  if (n === 0) return;

  const visited = new Set();
  const mstEdges = [];
  const mstNodes = new Set();
  const pq = [];

  const start = nodes[0].id;
  visited.add(start);
  mstNodes.add(start);

  const getWeight = (a, b) => {
    const link = links.find(l => {
      const source = typeof l.source === "object" ? l.source.id : l.source;
      const target = typeof l.target === "object" ? l.target.id : l.target;
      return (source === a && target === b) || (source === b && target === a);
    });
    return link?.weight ?? 1;
  };

  for (const neighbor of adjList[start] || []) {
    pq.push({ from: start, to: neighbor, weight: getWeight(start, neighbor) });
  }

  const compare = (a, b) => a.weight - b.weight;

  while (pq.length && mstEdges.length < n - 1) {
    pq.sort(compare);
    const { from, to, weight } = pq.shift();

    if (visited.has(to)) continue;

    visited.add(to);
    mstNodes.add(to);
    mstEdges.push({ source: from, target: to, weight });

    for (const neighbor of adjList[to] || []) {
      if (!visited.has(neighbor)) {
        pq.push({ from: to, to: neighbor, weight: getWeight(to, neighbor) });
      }
    }

    if(!speedrun.current)
    await sleep(500);
    else
    await sleep(100);


    
    setLinksData(links.map(link => {
      const sourceId = typeof link.source === "object" ? link.source.id : link.source;
      const targetId = typeof link.target === "object" ? link.target.id : link.target;

      const isMST = mstEdges.some(e =>
        (e.source === sourceId && e.target === targetId) ||
        (e.source === targetId && e.target === sourceId)
      );

      return {
        ...link,
        stroke: isMST ? "#16a34a" : "#9ca3af",
        inMST: isMST
      };
    }));

    setNodesData(prevNodes => {
      const updated = prevNodes.map(node => {
        node.color = mstNodes.has(node.id) ? "#16a34a" : "#4f46e5";
        node.inMST = mstNodes.has(node.id);
        return node;
      });
      return [...updated];
    });
  }
} 
