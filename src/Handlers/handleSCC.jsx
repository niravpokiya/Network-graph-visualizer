import findSCC from "../Algorithms/SCC";

const handleSCC = async (nodes, setNodes, adjList) => {
    if (nodes.length === 0) return;
    await findSCC(nodes, setNodes, adjList);
  };
export default handleSCC