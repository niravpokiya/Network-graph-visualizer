import EulerCircuit from "../Algorithms/EulerianCircuit";

 
async function handleEulerCircuit(nodes, links, setNodes, setLinks, speedrun, isDirected, setResult) {
    let delay = 500;
    await EulerCircuit(nodes, links,  setNodes, setLinks, 500, speedrun, isDirected, setResult);
    speedrun.current = ""
}

export default handleEulerCircuit