import React from "react";
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function Bfs(src, prevNodes, onNodesChange, adjList) {
  const visited = new Set();
  const queue = [src];

  while (queue.length > 0) {
    const nodeId = queue.shift();

    if (visited.has(nodeId)) continue;
    visited.add(nodeId);

    // 🟠 Mark current node as visiting
    const updated = prevNodes.map(n => {
      if (n.id === nodeId) {
        n.color = 'orange';
      }
      return n;
    });
    onNodesChange([...updated]);
    await sleep(500);

    // ➕ Enqueue neighbors
    for (const neighbor of adjList[nodeId] || []) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    }

    // ✅ Mark node as visited
    const final = updated.map(n => {
      if (n.id === nodeId) {
        n.color = '#4f46e5';
      }
      return n;
    });
    onNodesChange([...final]);
    await sleep(500);
  }
}

export default Bfs;
