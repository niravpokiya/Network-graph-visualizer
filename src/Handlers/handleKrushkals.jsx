import Kruskal from "../Algorithms/KrushkalsMST";

const handleKrushkals = async (src, nodes, setNodes, adjList, links, setLinksData, speedrun) => {
    await Kruskal(nodes, links, setNodes, setLinksData, speedrun.current ? 100 : 500);
    speedrun.current = false
};
export default handleKrushkals