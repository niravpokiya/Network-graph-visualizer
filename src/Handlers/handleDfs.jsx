import Dfs from "../Algorithms/Dfs";

const handleDFS = async (src, nodes, setNodes, adjList, speedrun, prevLinks, onLinksChange) => {
    if (nodes.length === 0) return;
    let delay = 500;

    await Dfs(src, nodes, setNodes, adjList, delay, speedrun, prevLinks, onLinksChange);
    speedrun.current = ""
};
export default handleDFS