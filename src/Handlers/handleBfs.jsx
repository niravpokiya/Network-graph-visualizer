import Bfs from "../Algorithms/Bfs";

const handleBFS = async (src, nodes, setNodes, adjList, speedrun, links, onLinksChange) => {
    if (nodes.length === 0) return;
    let delay = 500;

    await Bfs(src, nodes, setNodes, adjList, delay, speedrun, links, onLinksChange);
    speedrun.current = ""
  };
export default handleBFS