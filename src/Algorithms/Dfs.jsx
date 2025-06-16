import Reset from "../components/ResetColors";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function Dfs(src, prevNodes, onNodesChange, adjList, delay, speedrun, prevLinks, onLinksChange) {
   const [resetNodes, resetLinks] = Reset(prevNodes, prevLinks)
    onNodesChange(resetNodes);
    onLinksChange(resetLinks);
    prevNodes = resetNodes

  const visited = new Set();

  async function dfs(nodeId) {
    if (visited.has(nodeId)) return;
    visited.add(nodeId);
    // 🔶 Mark node as visiting (orange)
    const updated = prevNodes.map(n => {
        if (n.id === nodeId) {
            n.color = 'orange'; // mutate in place
        }
        return n;
        });
    onNodesChange(updated);

    if (speedrun.current === "fast") {
      delay = 100;
    } else if (speedrun.current === "skip") {
      delay = 0;
    }
    
    await sleep(delay);

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

    
    await sleep(delay);
  }

  await dfs(src);
  
}
 
export default Dfs;
