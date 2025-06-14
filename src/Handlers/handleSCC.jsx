import findSCC from "../Algorithms/SCC";

const handleSCC = async (nodes, setNodes, adjList, isDirected, speedrunRef) => {
  if (!isDirected) return;
  await findSCC(nodes, setNodes, adjList, speedrunRef);
  speedrunRef.current = false;
};

export default handleSCC