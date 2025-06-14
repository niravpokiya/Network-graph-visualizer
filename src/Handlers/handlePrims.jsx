import { runPrimsAlgorithm } from "../Algorithms/PrimsMST";

const handlePrims = async (src, nodes, setNodes, adjList, links, setLinksData, speedrun) => {
    if (nodes.length === 0) return;
    await runPrimsAlgorithm(nodes, setNodes, links, setLinksData,  adjList, speedrun);
    speedrun.current = false
};
export default handlePrims