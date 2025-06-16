import detectCycle from "../Algorithms/Cycledetection";

const handleCycleDetection = async (src, prevNodes, setNodes, adjList, isDirected, setCycleDetected, speedrun, links, setLinksData) => {
    // if (nodes.length === 0) return;
    let delay = 500;
    
    await detectCycle(src, prevNodes, setNodes, adjList, isDirected, setCycleDetected,delay, speedrun, links, setLinksData);
    speedrun.current = ""
  };
export default handleCycleDetection