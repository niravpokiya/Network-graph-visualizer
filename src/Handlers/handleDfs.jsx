import Dfs from "../Algorithms/Dfs";

const handleDFS = async (src, nodes, setNodes, adjList) => {
    if (nodes.length === 0) return;
    await Dfs(src, nodes, setNodes, adjList);
};
export default handleDFS