import Reset from "../components/ResetColors";
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function Bfs(src, prevNodes, onNodesChange, adjList, delay, speedrun, links, onLinksChange) {
   const [resetNodes, resetLinks] = Reset(prevNodes, links)
    onNodesChange(resetNodes);
    onLinksChange(resetLinks);
    prevNodes = resetNodes
    
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

    if (speedrun.current === "fast") {
      delay = 100;
    } else if (speedrun.current === "skip") {
      delay = 0;
    }

    await sleep(delay);

    // ➕ Enqueue neighbors
    for (const neighbor of adjList[nodeId] || []) {
      if (!visited.has(neighbor)) {
        queue.push(neighbor);
      }
    }

    // ✅ Mark node as visited
    const final = updated.map(n => {
      if (n.id === nodeId) {
        n.color = 'green';
      }
      return n;
    });
    onNodesChange([...final]);

    await sleep(delay);
  }
}

export default Bfs;
