import Bfs from "../Algorithms/Bfs";

const handleBFS = async (src, nodes, setNodes, adjList) => {
    if (nodes.length === 0) return;
    await Bfs(src, nodes, setNodes, adjList);
  };
export default handleBFS