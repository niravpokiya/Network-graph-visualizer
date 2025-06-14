import Reset from "../components/ResetColors";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function detectCycle(src, prevNodes, onNodesChange, adjList, isDirected, setCycleDetected, speedrun) {

  // resetting nodes color
  const resetNodes = Reset(prevNodes)
  onNodesChange(resetNodes);
  prevNodes = resetNodes

  
  // Continuing algorithm

  const visited = new Set();
  const recStack = new Set(); // for directed
  let foundCycle = false;

  async function markNode(id, color) {
    const updated = prevNodes.map(n => {
      if (n.id === id) n.color = color;
      return n;
    });
    onNodesChange(updated);
   if(!speedrun.current)
    await sleep(500);
    else
    await sleep(100);
  }

  async function dfsDirected(nodeId) {
    if (recStack.has(nodeId)) {
      await markNode(nodeId, "red");
      foundCycle = true;
      return;
    }

    if (visited.has(nodeId)) return;

    visited.add(nodeId);
    recStack.add(nodeId);
    await markNode(nodeId, "orange");

    for (const neighbor of adjList[nodeId] || []) {
      await dfsDirected(neighbor);
      if (foundCycle) return;
    }

    recStack.delete(nodeId);
    await markNode(nodeId, "#4f46e5");
  }

  async function dfsUndirected(nodeId, parent) {
    visited.add(nodeId);
    await markNode(nodeId, "orange");

    for (const neighbor of adjList[nodeId] || []) {
      if (!visited.has(neighbor)) {
        await dfsUndirected(neighbor, nodeId);
        if (foundCycle) return;
      } else if (neighbor !== parent) {
        // Cycle found in undirected graph
        await markNode(nodeId, "red");
        foundCycle = true;
        return;
      }
    }

    await markNode(nodeId, "#4f46e5");
  }

  for (const node of prevNodes) {
    if (!visited.has(node.id)) {
      if (isDirected) {
        await dfsDirected(node.id);
      } else {
        await dfsUndirected(node.id, null);
      }
      setCycleDetected(foundCycle)
      if (foundCycle) return;
    }
  }
}

export default detectCycle;
