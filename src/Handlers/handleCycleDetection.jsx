import detectCycle from "../Algorithms/Cycledetection";

const handleCycleDetection = async (src, prevNodes, setNodes, adjList, isDirected, setCycleDetected, speedrun) => {
    // if (nodes.length === 0) return;
    await detectCycle(src, prevNodes, setNodes, adjList, isDirected, setCycleDetected, speedrun);
    speedrun.current = false
  };
export default handleCycleDetection