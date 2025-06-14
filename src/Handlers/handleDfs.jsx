import Dfs from "../Algorithms/Dfs";

const handleDFS = async (src, nodes, setNodes, adjList, speedrun) => {
    if (nodes.length === 0) return;
    await Dfs(src, nodes, setNodes, adjList, speedrun);
    speedrun.current = false
};
export default handleDFS