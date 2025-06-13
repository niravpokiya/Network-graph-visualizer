import Dfs from "./Dfs";

const handleDFS = async (nodes, setNodes, adjList) => {
    if (nodes.length === 0) return;
    const src = nodes[0].id;
    await Dfs(src, nodes, setNodes, adjList);
};
export default handleDFS