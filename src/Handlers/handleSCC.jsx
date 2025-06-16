import findSCC from "../Algorithms/SCC";

const handleSCC = async (nodes, setNodes, adjList, isDirected, speedrunRef, links, setLinksData) => {
  if (!isDirected) return;
  
  await findSCC(nodes, setNodes, adjList,500, speedrunRef, links, setLinksData);
  speedrunRef.current = "";
};

export default handleSCC