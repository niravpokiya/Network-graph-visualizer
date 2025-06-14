import Reset from "../components/ResetColors";
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function Bfs(src, prevNodes, onNodesChange, adjList, speedrun) {
   const resetNodes = Reset(prevNodes)
    onNodesChange(resetNodes);
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
    if(!speedrun.current)
    await sleep(500);
    else
    await sleep(100);

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
    if(!speedrun.current)
    await sleep(500);
    else
    await sleep(100);
  }
}

export default Bfs;
