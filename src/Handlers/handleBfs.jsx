import Bfs from "../Algorithms/Bfs";

const handleBFS = async (src, nodes, setNodes, adjList, speedrun) => {
    if (nodes.length === 0) return;
    await Bfs(src, nodes, setNodes, adjList, speedrun);
    speedrun.current = false
  };
export default handleBFS