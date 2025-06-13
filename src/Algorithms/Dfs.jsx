import Reset from "../components/ResetColors";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function Dfs(src, prevNodes, onNodesChange, adjList) {
   const resetNodes = Reset(prevNodes)
    onNodesChange(resetNodes);
    prevNodes = resetNodes

  const visited = new Set();

  async function dfs(nodeId) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    console.log(nodeId)
    // 🔶 Mark node as visiting (orange)
    const updated = prevNodes.map(n => {
        if (n.id === nodeId) {
            n.color = 'orange'; // mutate in place
        }
        return n;
        });
    onNodesChange(updated);

    await sleep(500);

    // 🔁 Visit neighbors
    for (const neighbor of adjList[nodeId] || []) {
      await dfs(neighbor);
    }

    // ✅ Mark node as visited (green)
    const final = updated.map(n => {
    if (n.id === nodeId) {
        n.color = "green";
    }
    return n;
    });
    onNodesChange(final);
    await sleep(500);
  }

  await dfs(src);
  
}
 
export default Dfs;
