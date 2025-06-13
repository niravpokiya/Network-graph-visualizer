import detectCycle from "../Algorithms/Cycledetection";

const handleCycleDetection = async (src, prevNodes, setNodes, adjList, isDirected, setCycleDetected) => {
    // if (nodes.length === 0) return;
    await detectCycle(src, prevNodes, setNodes, adjList, isDirected, setCycleDetected);
  };
export default handleCycleDetection