import Bfs from "./Bfs";

const handleBFS = async (nodes, setNodes, adjList) => {
    if (nodes.length === 0) return;
    const src = nodes[0].id;
    await Bfs(src, nodes, setNodes, adjList);
  };
export default handleBFS