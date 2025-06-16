import Kruskal from "../Algorithms/KrushkalsMST";

const handleKrushkals = async (src, nodes, setNodes, adjList, links, setLinksData, speedrun) => {
    await Kruskal(nodes, links, setNodes, setLinksData, 500, speedrun);
    speedrun.current = ""
};
export default handleKrushkals